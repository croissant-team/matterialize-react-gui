# Matterialize

Matterialize is a unified development framework to create, test, and deploy background matting techniques on Linux,
packaged with a modern and comprehensive graphical user interface. It has an open architecture for integration with
third-party applications and we have already integrated three different examples of matting strategies to showcase the
capabilities of the platform, one of which performs sufficiently well to merit real-world usage.

## Prerequisites

You will need an installation of [npm](https://www.npmjs.com/) (tested with version 6.14.4) as well as sudo privileges.

## Installation

To install the Matterialize GUI, first clone the repo and then run the following

```
make install
```
**Note: This is will only install the frontend for Matterialize**

## Running the application

To run the application, simply run 

```
matterialize
```

**Note: You will need a working installation of the matterialize backend to use this application**

## Development

Matterialize GUI is a [React](https://reactjs.org/) based application written in [TypeScript](https://www.typescriptlang.org/) using [Material-UI](https://material-ui.com/) components. The application uses [Electron](https://www.electronjs.org/) to build the desktop application.

### Useful commands

### `npm run dev`

Runs the app in the development mode within an Electron window.\
The window will reload if you make edits.\
You will also see any lint errors in the console.
