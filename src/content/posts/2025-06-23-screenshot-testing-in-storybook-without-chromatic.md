---
draft: false
date: 2025-06-23T16:11:18.000+09:00
tags:
- testing
- storybook
- screenshot
- chromatic
- automation
- visual-regression
thumbnail:
title: Screenshot Testing in Storybook without Chromatic
excerpt: A practical guide to implementing visual regression testing in Storybook using open-source alternatives to Chromatic.
---

Storybook has become an essential part of the frontend testing toolkit. It's perfect for developing UI components in isolation and easily browsing different UI states. But once you have all these stories set up, how do you actually test for visual regressions?

## The Problem with Visual Testing

The obvious choice is [Chromatic](https://www.chromatic.com/), Storybook's official visual testing solution. It's polished, well-integrated, and just works. The catch? It's not free for anything beyond basic usage.

I tried [Loki](https://loki.js.org/) as an open-source alternative, but it turned out to be incredibly flaky. In CI environments, it would fail 8 out of 10 times with seemingly random errors. Not exactly confidence-inspiring for a testing tool.

## My Solution: Test Runner + Jest Image Snapshot

After some experimentation, I settled on combining Storybook's [Test Runner](https://storybook.js.org/docs/8/writing-tests/test-runner) with [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot). It's a more barebones solution, but gives you complete control over the testing process.

The test-runner uses Playwright under the hood to visit each story and run tests against them. `jest-image-snapshot` handles the actual screenshot comparison and diff generation. Together, they provide a solid foundation for visual regression testing.

Since this solution runs in your existing CI pipeline, there are no additional costs beyond your current CI minutes.

## Overcoming the Challenges

### Timeout Issues

One of the first issues I ran into was stories getting stuck at `waitForPageReady()`. This is a [known issue](https://github.com/storybookjs/test-runner/issues/444) with the test runner, caused by the test runner's use of `page.waitForLoadState('networkidle')`. The solution is to override the default wait function with a custom implementation that doesn't wait on network idle:

```ts
const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('load')
  await page.waitForFunction(() => document.readyState === 'complete')
  await page.waitForFunction(() => document.fonts.ready)
  await page.waitForFunction(() => new Promise((resolve) => window.requestIdleCallback(resolve)))
}
```
Code: test-runner.ts

### Reducing Flakiness

Visual tests are notoriously flaky, but there are several strategies to make them more stable:

#### Use assertions in play functions

Ensure elements are fully rendered before taking screenshots. Don't just wait for DOM content - wait for your actual components to be ready.

```ts
import { expect, within } from '@storybook/test'

export const MyStory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      await canvas.findByText('Lazy loaded string')
    ).toBeInTheDocument()
  },
};
```
Code: MyComponent.stories.tsx

#### Mask external images

External images like user avatars from APIs can load inconsistently and cause unnecessary test failures. Here's how I handle this in my setup:

```ts
const config: TestRunnerConfig = {
  async postVisit(page, context) {
    const image = await page.screenshot({
      mask: [
        page.locator('css=img[src^="https://picsum.photos"]'),
        page.locator('css=img[src^="https://source.unsplash.com"]'),
      ],
    })
  },
}
```
Code: test-runner.ts

#### Ensure all images are loaded

A partially loaded image will cause your test to fail even if nothing actually changed. Based on the solutions provided in [Playwright's issue on GitHub](https://github.com/microsoft/playwright/issues/6046), I added image checking logic to `waitForPageReady()`:

```ts
const waitForPageReady = async (page: Page) => {
  const images = await page.locator('img').all()
  for (const image of images) {
    const isVisible = await image.isVisible()
    if (!isVisible) continue
    await image.scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() => Array.from(document.images)
    .filter((img) => img.checkVisibility())
    .every((i) => i.complete))
  await page.waitForFunction(() => Array.from(document.images)
    .filter((img) => img.checkVisibility())
    .every((i) => !!i.naturalWidth))
  await page.evaluate(() => window.scrollTo(0, 0))
}
```
Code: test-runner.ts

#### Allow retries

The most important step for reducing flakiness is allowing retries. I use `jest.retryTimes` to let each test retry 3 times before failing:

```ts
import { TestRunnerConfig } from '@storybook/test-runner'

const config: TestRunnerConfig = {
  setup() {
    jest.retryTimes(3)
  },
}
```
Code: test-runner.ts

### Standardizing the Environment

Different environments (local vs CI) can produce different screenshots due to font rendering differences. To solve this, I run snapshot tests using Playwright's Docker image, which provides a consistent rendering environment.

```Dockerfile
FROM mcr.microsoft.com/playwright:v1.53.1-noble

# Remove all fonts except Noto CJK
RUN apt update && \
    apt install -y fontconfig fonts-noto-cjk && \
    apt purge -y '?and(?name(^fonts-),?not(?name(^fonts-noto)))' && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* && \
    fc-cache -fv

WORKDIR /app
```
Code: Dockerfile

```bash
docker build -t snapshot-env . && \
docker run --rm -it \
  -v .:/app \
  -v node-modules:/app/node_modules \
  -v pnpm-store:/app/.pnpm-store \
  snapshot-env bash -c " \
    cd /app && \
    corepack install && \
    corepack enable && \
    export BROWSER=/bin/true && \
    pnpm i --force && \
    pnpm exec start-server-and-test 'storybook dev' http://localhost:6006 'test-storybook --url http://localhost:6006' \
  "
```
Code: snapshot.sh

```ts
module.exports = {
  testEnvironmentOptions: {
    'jest-playwright': {
      devices: ['Desktop Chrome', 'iPhone 7'],
    },
  },
}
```
Code: test-runner-jest.config.js

This runs your visual tests on both desktop and mobile viewports automatically.

## Putting It All Together

After combining the pieces from the previous sections, my test runner config looks like this:

```ts
import { TestRunnerConfig } from '@storybook/test-runner'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { Page } from 'playwright'

const customSnapshotsDir = `${process.cwd()}/.snapshots`
const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('load')
  await page.waitForFunction(() => document.readyState === 'complete')
  await page.waitForFunction(() => document.fonts.ready)

  const images = await page.locator('img').all()
  for (const image of images) {
    const isVisible = await image.isVisible()
    if (!isVisible) continue
    await image.scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() => Array.from(document.images)
    .filter((img) => img.checkVisibility())
    .every((i) => i.complete))
  await page.waitForFunction(() => Array.from(document.images)
    .filter((img) => img.checkVisibility())
    .every((i) => !!i.naturalWidth))
  await page.evaluate(() => window.scrollTo(0, 0))

  await page.waitForFunction(() => new Promise((resolve) => window.requestIdleCallback(resolve)))
}

const config: TestRunnerConfig = {
  setup() {
    jest.retryTimes(3)
    expect.extend({ toMatchImageSnapshot })
  },
  async postVisit(page, context) {
    await waitForPageReady(page)

    const snapshotId = {
      'Desktop Chrome': context.id,
      'iPhone 7': `sp-${context.id}`,
    // @ts-ignore-next-line deviceName is a global string provided by jest-playwright
    }[deviceName]

    const image = await page.screenshot({
      animations: 'disabled',
      caret: 'hide',
      fullPage: true,
      mask: [
        page.locator('css=img[src^="https://picsum.photos"]'),
        page.locator('css=img[src^="https://source.unsplash.com"]'),
      ],
    })

    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: snapshotId,
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    })
  },
}
export default config
```
Code: test-runner.ts

## Conclusion

This creates a robust visual testing setup that runs consistently across different environments and tests multiple screen sizes automatically. It handles flaky network conditions gracefully and gives you full control over the testing process. Best of all, there are no recurring costs beyond your CI minutes.

It's not as polished as Chromatic's one-click solution, but for teams that need visual regression testing without subscription fees, this approach provides a solid foundation. The initial setup takes some effort, but once configured, it integrates seamlessly into your existing CI workflow.

## References

- [Storybook Test Runner Screenshots](https://tigeroakes.com/posts/storybook-test-runner-screenshots/) by Tiger Oakes
- [Ultimate Guide to Visual Testing with Playwright](https://www.browsercat.com/post/ultimate-guide-visual-testing-playwright) by BrowserCat
- [Storybook Migration Guide: Image Snapshot Tests with Test Runner](https://storybook.js.org/docs/8/writing-tests/snapshot-testing/storyshots-migration-guide#run-image-snapshot-tests-with-the-test-runner)
