---
draft: false
date: 2022-08-14T00:29:25.000+09:00
tags:
- git
- gitlab
- simple-and-clean
- kiss
thumbnail:
title: A Simple and Clean Git Workflow
excerpt: If you're like me, this is probably the git workflow for you.
slug: a-simple-and-clean-git-workflow

---
Even with years of experience in this industry, I can never seems to get my head around deciphering these huge and complicated git history trees. One time I had a chance to work on a brand new project with a great degree of freedom in determining our team's development process, and so I set out to find a git workflow that can satisfy me.

I started out by looking at Git flow and Gitlab flow respectively, but none of these workflows are just not simple enough to satisfy the neat freak in me. After months of experimenting, I came up with this workflow that has worked so well that it has been the de-facto default git workflow for all of my projects from then onwards.

![](https://mermaid.ink/img/pako:eNqNksFuwjAMhl8l8hmExm49b9oD7JqLSUwTQRpkEjGEeHccRreuTcVukb8__v_EvoCJlqCB1qcPxoPTnVImhuCT8rZRGgL6bvmioYANY2ec2hKmzLQyLAdapmjj5NqA9bdn-foJf31wR2YXc1IlUikE4pbm0oyykvWpnvSHVHP-0vW_Uvzx6TP4r9XRxdN3n01uJy6iqLqX-hPfWu_R2zGn6VxLsep5B3Omo86W9jS3AQNW9RlysYMFyIvEx8o2XopaQ3IUSMNdjbwrTa6iywcrk36Xn44MzRb3R1qU2PHz3BloEmfqRW8eW8bwUF1vZJkBBg)
Figure: Your git repo can look as clean as this

## This workflow is for you if
- you like your git history to be simple and clean
- you want to onboard your new dev members fast
- you don't care about when commits are actually made in relation to other commits

## This workflow is not for you if
- your dev team is allergic to rebasing 😢
- you're a monster and like messy git histories the way it is 🤮
- other people might add commits to your branch

## Key points

### Rewriting git history is fair game, as long as it's not the main branch

This workflow makes heavy use of rebase. Rebasing in git, is not as scary as they seem to tell you. Rebasing may change the branch commit history, but to me, a branch is just a series of draft commits so I think it's okay to change history (even if it's pushed to a remote repository) as long as it has not been merged. Once you get the hang of it, rebasing branches are a walk in the park.

However, changing commit history means that other people cannot add commits to your branches freely as there is no guarantee that the commits before will still exist. I think that commits should only be done by the branch author themselves, and hence rebasing would not pose such a problem.

### Support for multiple environments (staging, production etc.)

Eventually when you put your project into production you probably want to have different environments to try out new features before it gets shipped into production. This workflow easily supports multiple environments while maintaining a simple and clean git commit history. You don't even need to match the order you push for different environments!

### Only see commits that you've made in your branches

When you merge another branch into your branch, your branch would inevitably be "polluted" with commits from other branches. With this workflow, you can ensure only commits from your branch are visible.

### CI/CD friendly

This workflow works really well if you have a CI/CD environment. Branches must be up to date (ie. branched off the latest commit of the main branch) before it can be merged. This guarantees your branch will pass CI/CD after merging as it is tested on your latest working state.

## Setting it up

Setting it up is very easy. In fact, you can even set it up for existing repositories.

### Step 0: Get your teammates onboard

As git is a team sport, it is important to get your teammates onboard. Or at the very least, least show them this page. Technically you can implement this by yourself but your teammates may become very lost when they realize that they need to start rebasing...

### Step 1: Enforce linear/semi-linear merging

You'll need to enable linear merging or semi-linear merging on whichever git service that you're using.

What are the difference between linear and semi-linear merging? Linear merging does not create a merge commit, but instead fast forwards the main branch to the latest commit of the branch. It'll look something like this:

![](https://mermaid.ink/img/pako:eNqFkMEKwjAMQH-l5OwQ9daz4gd47SW22VZc1xFTUMb-3U4mDpx67Xt5pOnBRkegofJyZOxq0yplYwhelHdaGbBMKFRIdLHYGPjJt3_4boGT8_K9_qZL7dLfFqfG98k_M7a2VmVeIjGtHTU0bfMxNWOL1TnPdVhBIA7oXT5fP9oGpKZABp428mWMDNlLncs3OOS_RAZdYnOlFWCSeLq3FrRwope091gxhskaHvYviqw)
Figure: Before linear merge

![](https://mermaid.ink/img/pako:eNqFkDEOwjAMRa8SeW4HYMsM4gCsWazYbS2apgquBKp6d1IEgiHA6vf-l-0ZfCQGC63oMeHYucEYH0MQNULWOPCJUbnWSLHeOPjJt3_4rsCZRL-3v2mpu5FrMbXOSz5xz79u-eQ5DxUETgGF8oPm1XagHQd28LAxndeSJXvTSPnKQ942JrAN9heuACeNp9vgwWqa-CXtBduE4Wktd8Omf6M)
Figure: After performing a linear merge. Git history will become a single straight line

On the other hand, a semi-linear merge will make a merge commit every time you merge a branch:

![](https://mermaid.ink/img/pako:eNqNksFuAiEQhl-FzFljam97rukD9MoFYVyIsphxSNsY393BurqubOyN8P3M_wU4gk0OoYE28CeZvdedUjbFGFgF1ygN0YRu_qahgDWZznq1QcOZcGFJFjjn5NLTsQHrT0_y5Qv-fuUe7TZlVkWpbESkFqdsRq7oAtdNb6TqeafLf1k89PQO4Wdx8On7b846t08tkqi2l_0XvdXZ4-zoMhzucOrhBqyqNOSiBjMQEelx8omOJa2BPUbUcEkb2pYhJ8nlvZMHWskFJYJmY3YHnIHJnL5-OwsNU8Y-9BFMSyZeU6czG_PoxQ)
Figure: Before semi-linear merge

![](https://mermaid.ink/img/pako:eNqNkkFuAjEMRa8SeQ1CpbtZg3qAbrMxiZlEkAkyjmiFuHuTloHpkBHsIr_v7y87ZzDREjTQevlgPDjdKWViCF6Ut43SENB38zcNBWwYO-PUllAS08JwftBcoo0PbQPWd0_y5RP-fuWOzC4mUSVSKQTilqbSjLKS9VJPeiPVnHe6fCnFvzl9Bv-1OLp4-vPZpPZhSlZUp5f6k7lV77F2tAxLe5o63IBVIw35aysZdMAMMssym7_cuUg1iKNAGn69kXfF8pJ16WDzOdd5nZGh2eL-SDPAJPHzuzPQCCfqRSuPLWO4qi4_34b5lQ)
Figure: After semi-linear merge

I personally prefer a semi-linear merge as you can see where a branch starts and end easily.

If you're using Gitlab, you can easily enforce either one in your repository settings under Merge Requests:

![](../../assets/gitlab-merge-request-settings.png)
Figure: Gitlab's merge request settings. "Merge commit with semi-linear history" for well, semi-linear merging and "Fast-forward merge" for linear merging

In Github, linear merging can be enforced by only allowing rebase merging:

![](../../assets/github-pull-request-settings.png)
Figure: Only check "Allow rebase merging" if you want linear merging

As for semi-linear merging in Github, unfortunately there's no setting to enforce semi-linear merging. There is a [workaround](https://github.com/community/community/discussions/8940#discussioncomment-2845065) to emulate semi-linear merging but it does not prevent users from merging to update a branch.

### Step 2: Done

There's no step 2! Let it run for a couple of branch merges and let your eyes feast on that beautiful git commit history.

## Workflow scenarios

Here are some common workflow scenarios that I've encountered which may give you a general sense on how the git history may look like with this workflow.

### Scenario #1: A typical feature/bugfix workflow

First you would checkout a new branch from the latest main branch and commit some changes:

![](https://mermaid.ink/img/pako:eNqFkDEOwjAMRa8SeaZCwNYZxAFYs5jEbaOSpjLOgKrenURqAUErNivvf_spA5hgCUqonZwZ-0Z3SpngvRPlbKk0eHRdsdOQwZWxM42qCCUybQ2ngQoJNvzUPtjcXuX7P_ww8YZMG6KorJQfPHFNazZfrmSdLJu-yKLnmyZL2EC6mc7b9GNDzmqQhjxpyFmL3OYVY8rF3iabU2oHhrLC2502gFHC5dEZKIUjzaGjw5rRT6nxCSELiYc)

While committing new changes there may be new commits added to the main branch:

![](https://mermaid.ink/img/pako:eNqFkTEOwjAMRa8SeQYhytYZxAFYs5jENBGkQcYRIMTdSQQFBC1skd_397dzARMtQQ2NlyXj3ulWKRND8KK8rZWGgL4dTzUUsGZsjVMbQklME8P5QWOJNn61vbGue5BXf_jswR2ZbUyiSqRSCMQNDaX5yErWS3_SJ-nN-aLVQIpukD9NDi4e7-J1ar6ssqJ3RKlXv1f89IYRZJJFNn_dpQg1iKNAGoqjRd4Ww2vWpb3NZ1nkNSJDvcHdgUaASeLq3BqohRN1ornHhjE8VNcbhqS4pA)

When you want to reflect the new changes from the main branch we would rebase the working branch against the latest commit from the main branch (while you're at it, feel free to do an interactive rebase if you want to reorganize your commits):

![](https://mermaid.ink/img/pako:eNqFkdEOQTEMhl9l6TUR3J1r4gHc7qa2OlvYmVQXRLy7LRyE4a7p9__tn_YMJlqCBlovC8ad051SJobgRXnbKA0BfTccayhgxdgZp9aEkphGhnNBQ4k2ftheWO_-yid_-PTOHZlNTKJKpNIIxC19S9Nn9cfR3sXDbdIqtR-bsqKasPQnvzfXZr_diKyX-oUepLr9SWsZYAA5Qq5sft25YA3iKJCGYrbIm-K6ZF3a2XyWeR4XGZo1bvc0AEwSl6fOQCOcqBfNPLaM4a66XAGFPLik)

Then just push the branch to the remote repository when you're ready to create a pull/merge request. It does not necessarily need to be up to date, but I would at least resolve any conflicts before requesting a code review.

When you need to add commits (fixes etc.) you can just add new commits, or just add the changes into the existing commits ([lazygit](https://github.com/jesseduffield/lazygit)'s "Amend commit with staged changes" allows you to easily do just that). Personally I would make changes to existing commits when its a minor bug that got caught in CI or linting errors.

And when you're ready to merge you will be prompted to rebase if it's out of date; or else just merge away!

![](https://mermaid.ink/img/pako:eNqNkc0OAiEMhF-F9Kwxrrc9a3wAr1wq1IUoi6klaozvLkRXja4_N9JvOp0MJzDREtTQeJkzbp1ulTIxBC_K21ppCOjb4VhDAUvG1ji1IpTENDKcHzSUaOPb2hPrtj_y6gef3Lgjs45JVIlUBoG4oU9puqz-MNq5uL86LVPzdikrehOWefX9cp_3S0dkvfQ3dCe91x-0-kr_6-auhwFkkkU2__mpCDWIo0Aaiq9FXhfDc9alrc19zvJmZKhXuNnRADBJXBxbA7Vwok409dgwhpvqfAHDLMxB)
Figure: End result looks something like this

### Scenario #2: Working on top of an unmerged branch

Another common scenario is when you need to use the changes you made on another branch when building another feature. For example, if you need to build on top of `edit-todo`, you would first checkout a new branch (in this case `delete-todo`) off the latest commit `edit-todo` instead of the main branch and add commits to `delete-todo`:

![](https://mermaid.ink/img/pako:eNqFkcsOwiAQRX-FzFpjtLuuNX6AWzYjjC2pFDMOC9P03wXjo6mt7gjnwhwuHZhgCUqonOwZL7VulTLBeyfK2VJp8Oja5VpDBkfG1tTqRCiRaWU4LWgpwYavYwP2Oj3LN3948eQ1mSZEUVkpb3jiimZtxumRPFkn0-pvMin-oZuftJiszNKZ5iobsMnJQ55mwwJSAel1Nn1fl9MapCZPGh5p5CZf0qdcvNhUzS65BYbyhOcrLQCjhMOtNVAKR3qFtg4rRv9M9Xdn8LmJ)

When you diff with the main branch you'll probably notice that the commits from `edit-todo` would appear, and that is okay. Eventually the commits from `edit-todo` will disappear after it has merged. When `edit-todo` gets merged into main, you would just rebase `delete-todo` against the latest commit from the main branch:

![](https://mermaid.ink/img/pako:eNqNkUsOwiAQQK9CZm1j1F3XGg_gls0I05YoxYzDwhjvLhg_tbbqjvAe8DKcwQRLUELtZM14aHSrlAneO1HOlkqDR9cWMw0ZbBlb06iKUCLT1HBaUCHBho9jHfY4PcrnP_jizhsyuxBF5aS84YlrGq3p2714sk6G059kMPxF51_pf9FvFb1CS3saG2-HDVZ2eeqECaR3U4JNX33OtgZpyJOGm428y5dckhcPNo1xlboCQ1nh_kgTwChhc2oNlMKRHtLSYc3o79blCmndyYw)

Git is smart enough to know that the same commits are already in the main branch and would remove them for you. How neat!

#### Changes on unmerged branch

What if changes were made to the unmerged branch while working on the new branch? If you need to reflect the new changes from the unmerged branch you could try to rebase against the latest commit of the unmerged branch. However, most likely you'll encounter conflicts. In that case, I recommend creating a new branch off the latest commit and **cherry-picking** the commits from the new branch instead.

![](https://mermaid.ink/img/pako:eNqVkb0OwjAMhF8l8gxCtEydQTwAaxaTmDaCNMg4A0K8OwnipyotiM3ydydfLhcwwRJUUDtZMx4b3SplgvdOlLOV0uDRtdO5hgy2jK1p1I5QItPMcBpoKsGGD1uHPd2jvPjBywdvyOxDFJUj5YUnrmk0TV_dC0_WyXD0FxkM_qbFV1oOVmbpQGOVddjg5S4vepX886pF9sIEUn2pG5s-_5LVGqQhTxrut5D3WXZNuni0qdhV8geGaoeHE00Ao4TNuTVQCUd6ipYOa0b_UF1vQ97PNw)
Figure: If only new commits are added, you can easily rebase against the latest commit

![](https://mermaid.ink/img/pako:eNqVksGOwiAQhl-FzNnGbN1Tz2v2AfbKBWFsSQs04xBjjO--YKzbtNVmb4Tv_8MHwxV0MAgV1Ja_SfWN9ELo4JxlYU0lJDhlffEhIYMDKa8bcUTFkXCrKS2w4GDCrDZiQ_slL1f47sEb1G2ILLJS3nBINb60maYn8mgsL6s_yaL4Hy3f0t3ikxnscLhW6MysP-ZLp495OXmW_9zsc9XO4_m9XZEOJroUvdUtmjXXeRo2kAaYpmPS97vmtgRu0KGEe1tRm2O3lIu9SaPdJ_tAUB1Vd8INqMjh5-I1VEwRh9CXVTUp90jdfgG8j_zm)
Figure: If commits were modified and you can't rebase easily, cherry-pick the commits into a new branch instead. Be sure to confirm the branch contents before deleting the old branch

### Scenario #3: Working with multiple environments

Let's say I have two environments, production and staging, and I would like to push a new feature to staging so I could preview it before pushing to production. If the production environment is in sync with the main branch, how do I preview features in staging?

Let's assume that I have a branch that is ready to be pushed into the staging environment (`edit-todo`):

![](https://mermaid.ink/img/pako:eNqFkL0OAiEQBl-FbO3FqB21xgewpVlh7yDKYdalMMZ3F4x_OU_tyM58yYQz2OQINHRB1owHb3qlbIoxiApOKwMRQ9_MDFSwZeytVy2hZKap5fKgRpJLH7M39lh_5fM_fHHnnuwuZVE1qR4icUdfa4b2IJ5ckPH0JxkNf9H5T3qLhgmUyFLgyhefq21APEUyUG2HvKvapXj54Er-quwTg25xf6QJYJa0OfUWtHCmh7QM2DHGu3W5Aji8mjU)

I would have a dedicated branch for the staging environment, aptly named `staging` branch, and cherry-pick commits from `edit-todo` to `staging`. You would then configure your staging environment to be in sync with the `staging` branch.

![](https://mermaid.ink/img/pako:eNqVksGOwiAQhl-FzNlms_bWsxsfYK9cRhgpqUAzDgdjfPeFpK6m2m72Rvj-f_gy4QomWYIOnJc949jrqJRJIXhR3nZKQ0Afm08NFRwYo-nVkVAy04fhcqBGkk0vtSd2by_y7R-8nXhPZkhZVFWqF4HY0aLNPD2TJ-vlvfoveSv-oNtVuiQ9aZwFnY9u7fGmdJkvzejNQHZd5R_Zdp6FDZRNFj9b_sG1NjVIT4E01KZFHurAW8nl0ZYdf5VZiaE74ulMG8As6fsSDXTCme6hnUfHGKbU7Qd4JdNU)

Most likely you would have more that one branch that you would like to preview in the staging environment. In that case, you would just cherry-pick the commits from all the branches you want to preview in staging:

![](https://mermaid.ink/img/pako:eNqVkkFuwjAQRa9izZqoathl3aoH6DabqT04VrAdDeMFQty9NgKahiSIXeT3v_PGmhPoaAgasE6-GIeuDUrp6L0T5UyjWvDoQvXeQgE_jEF3akcoielNc_6gSqKJD7URu7UXef2Eb6-8I93HJKoolQNPbGnRZpqeyJNxMq9-J7Pif7RepUvSEw1De1p6wxGbVRnzev13B0Hrgl2btcpd5mM1ON2TWZ_8hez2afbfmC-lHzxgA3kp8uwmr_SpdFuQjjy1cOki9-XKc86lweR1-cyekaHZ4f5AG8Ak8fsYNDTCiW6hD4eW0V9T518ydRlp)

Let's say features added in `edit-todo` was approved and ready to be pushed to production, so you would merge `edit-todo` as usual:

![](https://mermaid.ink/img/pako:eNqVksFuwyAMhl8F-dxoWnrLudMeYFcuHrgEpUDkwqGq-u6Dqu2yLKHqDfH9xp-Rz6CCJujA2PjJOPbSC6GCczYKqzshwaH1zbuEAr4ZverFnjAmpjfF-UBNDDr8K5uwe_Uqb5_w7Y33pIaQoihK5cIRG1q1madn8qRtXFZ_kEXxX9pW6Zr0TEPTgdb-cMIWVaa8rbc7RjTWm9qsTa5lPjWjVQPp-uQvZLdPs3_GfCm97FFfk4cZbCCTHNJ5_c8lKCH25EjCtQ_yUB685FwadV6tj1wZGLo9Ho60AUwxfJ28gi5yontoZ9Ewulvq8gNRTCls)

After that, you'll need to **rebase the staging branch against the latest commit from the main branch**. Ideally, you would have a CI job that would rebase the staging branch for you whenever you push new commits to the main branch. After rebasing the staging branch, you'll  notice that the commits from the merged branch would disappear from the staging branch, again due to fact that the commits are already in the main branch and will be removed automatically:

![](https://mermaid.ink/img/pako:eNqNksFuwyAMhl8F-dxoWnbLedMeYFcuLrgEpUDkmkNV9d0HU7plWdLuZvH9hg_DBUyyBB04L--MY6-jUiaF4EV52ykNAX1snjVUsGeMplcHQslMT4ZLQY0km_60zdite5O3D_jLxHsyQ8qiqlJdCMSONm2W6YU8WS_r6t9kVfyHtnfplvRCw9KRtmY4Y6sqc97-a0a_Lj2ZnASdj-7-6U3ZmPncjN4MZB-5rKbnZrCDIlYqW77epWIN0lMgDV-bIQ-161pyebTlWd-KeGLoDng80Q4wS_o4RwOdcKZb6NWjYwxT6voJYOb8Hg)

#### The branch order you push to staging does not need to match the order that you push to production!

What if instead of `edit-todo`, `delete-todo` got approved first? Just merge the `delete-todo` branch and rebase the staging branch! The commits from `delete-todo` will disappear from the staging branch instead of the `edit-todo` branch:

![](https://mermaid.ink/img/pako:eNqVkkFuwyAQRa-CZh2rqrPzOlUP0K03E5hg5ADWZFhEUe5eqJzUcm233SHeH3h8cQMdDUED1sk749C1QSkdvXeinGlUCx5dqF5bKODIGHSnToSSmF405wVVEk38MTZhj-lVXv_C9yPvSPcxiSpKZcMTW1q1madn8mScLKs_yaL4N6036Zr0TMPQmdY6nLBFlSmv_9TR7LbR5SJoXbBbRVT5YOZrNTjdk9mu5R_Z_WJ2-gbYQX5CXpn8SW8FtyAdeWrhqwLkvkzdcy4NJn-At3x4ZGhOeL7QDjBJ_LgGDY1wokfo4NAy-jF1_wTVRgp2)

And once all the changes have been pushed to production, your main branch and staging branch would be in sync and will share the same latest commit.

#### Even more environments

If you have other environments, you would also create a dedicated branch for that environment and cherry-pick commits to the environments that you'll like to preview the changes. Similar to the staging branch, you would need to make sure the environment branch is always off the latest commit from the main branch.

### Scenario #4: Reviewing rebased branches

When reviewing a branch, you may notice that the commit history changed due to rebasing of these branches. If you need to re-review a branch I recommend deleting the branch and pull a new version of the branch.

## Try it out!

Convinced? Give it a try and [tell me](https://twitter.com/adw1n) how it works for you!
