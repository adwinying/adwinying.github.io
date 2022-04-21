---
draft: true
date: 2022-04-15T00:13:27.000+09:00
tags:
- word-processing
- markdown
- html
- tailwindcss
thumbnail: ''
title: Word Processors suck at formatting, use HTML instead
excerpt: Ditch your word processor and use HTML instead for that pixel perfect formatting.
slug: word-processors-suck-at-formatting-use-html-instead

---
After getting burnt for the nth time, I gave up on word processors and created documents in HTML instead.

## Why HTML?

### Word processors cannot guarantee formatting

With Microsoft's introduction of the XML document format (`.docx`, `.xlsx` etc.) formatting issues were largely fixed, but the vendor lock-in still remains. Google Docs and other open source alternatives like LibreOffice have offered Microsoft Office documents still the beginning but they can't seem to perfectly parse Office files.

I mean, if these programs could reproduce it down to the pixel we wouldn't need PDFs am I right?

### HTML is great at reproducing layouts and design

Websites have been able to achieve consistent design throughout different browsers, thanks to common web standards. We can take advantage of this feature by producing consistent looking documents that are independent of software (ie. web browsers) and hardware.

### Get a web version of your document for free

HTML files are well, made for the web so you can optimize your document to be not just readable for printing but also for web browsers too. Imagine a resume document that is readable on the web and looks good when printed out as well!

### Version management is a breeze

If you put the HTML file in a version management system like Git, you can easily track changes made to an HTML file and roll back changes if necessary.

## What about Markdown?

When it comes to documents for the common folk, Markdown seems to be an obvious choice thanks to its easy to understand syntax. However, formatting isn't included in Markdown and different parsers have different styles, making it hard to change parsers if needed.

## Setting up HTML to create documents

HTML without styling looks pretty bad and the base styling is inconsistent between browsers. Hence we need a bit of preparation before we can start:

### Install TailwindCSS

[TailwindCSS](https://tailwindcss.com/), currently my favorite CSS framework does not come with styling for any tags by default, making it easy to style the document the way you want it. However, setting up styles for headings and paragraphs from scratch is a pain in the butt so I added [TailwindCSS's typography plugin](https://tailwindcss.com/docs/typography-plugin), which provides excellent styling for text right out of the box.

As I prefer to have my documents to be self-contained in a single file for portability, I use [TailwindCSS's Play CDN](https://tailwindcss.com/docs/installation/play-cdn) method to install it, just by adding a single line into the `<head>` tag of your HTML file:

```html
<script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
```

### Install Google Fonts

As we can't guarantee that the fonts we use in a document is available on all machines, we use web fonts to ensure the typography remains consistent regardless of machine used. After selecting a font, we import the stylesheet and overwrite TailwindCSS's default font CSS rules like this:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@0;1&display=swap"
  rel="stylesheet">
<script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio,line-clamp"></script>
<script>
  tailwind.config = {
    theme: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      },
    },
  }
</script>
```

### Configuring Base Styles

We then enable TailwindCSS typography plugin by adding the `prose` class to the `<body>` tag:

```html
<body class="prose prose-neutral max-w-3xl mx-auto">
```

I also defined three additional rules; `max-w` and `mx-auto` to recreate the width of a paper document, and `prose-neutral` to define the color tone of the text.

### Optimizing for print

Sometimes the document may look broken on the print preview page. We can fix this by defining additional classes just for print using the `print:` prefix class:

```html
<a class="print:no-underline" href="https://iAdw.in">https://iAdw.in</a>
```

A underlined link looks weird on print so I disabled it like this.

### Preventing page breaks

To prevent page breaks in the middle of a section, you can wrap the section in a `<div>` and add the `break-inside-avoid` class:

```html
<div class="break-inside-avoid">
  <!-- Some long paragraph that you don't want to break -->
</div>
```

### Go wild with styling

With CSS, you can easily recreate any design/layouts easily. Just refer to the [TailwindCSS docs](https://tailwindcss.com/docs/installation).

## Template

Combining everything above, here's a template to get started making documents in HTML.

```html
<!doctype html>
<html lang="en">

<head>
  <title>My Document</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="https://iAdw.in/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Update this with the font of your choice -->
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@0;1&display=swap"
    rel="stylesheet">

  <script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio,line-clamp"></script>

  <!-- Define custom tailwindCSS config here -->
  <script>
    tailwind.config = {
      theme: {
        fontFamily: {
          sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
        },
      },
    }
  </script>
</head>

<body class="max-w-3xl mx-5 sm:mx-auto my-8 prose prose-neutral
  dark:prose-invert dark:bg-neutral-900
  print:my-0">

  <h1>My Document</h1>

  <p>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</p>

</body>

</html>
```
