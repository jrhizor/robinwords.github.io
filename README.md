# robinwords.com

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fjrhizor%2Frobinwords.github.io%2Fbadge%3Fref%3Dsource&style=flat)](https://actions-badge.atrox.dev/jrhizor/robinwords.github.io/goto?ref=source)

[robinwords.com](https://robinwords.com) is a collaborative story-building and word game website.

The site is powered by Hugo, GitHub Pages, and Cloudflare.

The markdown and Hugo files are on the [`source`](https://github.com/jrhizor/robinwords.github.io/tree/source) branch. When the [`source`](https://github.com/jrhizor/robinwords.github.io/tree/source) branch changes, a [GitHub Action](https://github.com/jrhizor/robinwords.github.io/actions) will automatically push the rendered version of the site to the [`master`](https://github.com/jrhizor/robinwords.github.io/tree/master) branch.

CloudFlare mirrors [robinwords.github.io](http://robinwords.github.io) to [robinwords.com](https://robinwords.com) with caching/SSL and provides analytics.

## Contributing to the Game 

Collaborators are welcome! Pull requests against `master` are fine. I should get back to PRs within a couple days.

Here are some places to look to edit:
* [add a new valid word](https://github.com/jrhizor/robinwords.github.io/blob/source/themes/hud/static/js/wordlist.js)
* [add an offensive word to the filter](https://github.com/jrhizor/robinwords.github.io/blob/source/themes/hud/static/js/game.js#L3)
* [site-wide css](https://github.com/jrhizor/robinwords.github.io/blob/source/themes/hud/static/css/main.css)
* [game html/css](https://github.com/jrhizor/robinwords.github.io/blob/source/themes/hud/layouts/_default/game.html)
* [game js](https://github.com/jrhizor/robinwords.github.io/blob/source/themes/hud/static/js/game.js)
