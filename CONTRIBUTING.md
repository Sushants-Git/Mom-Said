# Contributing to Mom Said

First off, thank you for considering contributing to Mom Said! It's people like you that make Mom Said such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/Sushants-Git/Mom-Said/issues) page to see if someone else in the community has already created a ticket. If not, go ahead and [make one](https://github.com/Sushants-Git/Mom-Said/issues/new)!

## Fork & create a branch

If this is something you think you can fix, then [fork Mom Said](https://help.github.com/articles/fork-a-repo) and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-add-japanese-localization
```

## Set up the development environment

Make sure you're using the latest version of Bun and Expo CLI. To set up the project:

```sh
bun install
bunx expo start
```

## Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first.

## Get the style right

Your patch should follow the same conventions & pass the same code quality checks as the rest of the project. We recommend using ESLint and Prettier for code formatting.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with Mom Said's master branch:

```sh
git remote add upstream git@github.com:Sushants-Git/Mom-Said.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```sh
git checkout 325-add-japanese-localization
git rebase master
git push --set-upstream origin 325-add-japanese-localization
```

Finally, go to GitHub and [make a Pull Request](https://help.github.com/articles/creating-a-pull-request).

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

To learn more about rebasing in Git, there are a lot of [good](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) [resources](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase) but here's the suggested workflow:

```sh
git checkout 325-add-japanese-localization
git pull --rebase upstream master
git push --force-with-lease 325-add-japanese-localization
```

## Code review

A team member will review your PR and provide feedback. Address any comments or requested changes. Once approved, your PR will be merged into the main branch.

## That's it!

Thank you for your contribution!
