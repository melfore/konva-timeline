# @melfore/konva-timeline

[![Konva Timeline - Release](https://github.com/melfore/konva-timeline/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/melfore/konva-timeline/actions/workflows/release.yml) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

`@melfore/konva-timeline` is a TypeScript ReactJS library that uses `konva` and `react-konva` to render a timeline component using canvas.

There can be from none to many items per each row and tasks can be moved across rows. The component allows tasks moving, resize and hovering. This allows usage for gantt charts, schedulers and planners.

![sample](./assets/sample.gif)

Its style is fully customizable:

![column width](./assets/column-width.png)

![row height](./assets/row-height.png)

And offers ways to customize tasks appearance:

![completed percentage](./assets/completed-percentage.png)

Plus all static texts and dates can be easily localized:

![localized](./assets/localized.png)

## Install

To install the library run:

```
npm i @melfore/konva-timeline
```

This library has the following required peerDependencies:

```
"konva": ">= 9.2.0 < 10",
"luxon": ">= 3.3.0 < 4",
"react": ">= 18.2.0 < 19",
"react-dom": ">= 18.2.0 < 19",
"react-konva": ">= 18.2.9 < 19",
"react-konva-utils": ">= 1.0.5 < 2"
```

### ⚠️ Installing with npm < 7

If installing with versions of npm < 7, you have to manually install them.

```
npm i konva luxon react react-dom react-konva
```

Beware to check the versions installed, they must match peerDependencies ranges.

## Documentation and examples

Browse <a href="https://melfore.github.io/konva-timeline">official StoryBook</a>
