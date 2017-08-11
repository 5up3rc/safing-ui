# Safing UI

The Safing UI is the user interface to the [Safing Core](https://github.com/Safing/safing-core).

## Current Status

Safing is now in a tech preview phase (v0.0.x), where the first features are completed and we want to open them up to the community to get feedback on the system. It is not yet ready for day to day use and should only be used to play around with the new concept.

## Download

For a packaged download of all components, check the [Safing Installer](https://github.com/Safing/safing-installer) repo, else check the [releases](https://github.com/Safing/safing-ui/releases).

## Running

    yarn
    yarn run develop

## Requirements

- nodejs
- npm
- yarn

## Building

    yarn run pack:win
    yarn run pack:mac
    yarn run pack:linux

If that does not work for you, try to build with a docker image (you need to have docker installed and running for this):

    sudo docker run --rm -ti -v $(pwd):/project electronuserland/electron-builder yarn pack:linux
    # then fix permissions, as the docker image will create files owned by root
    sudo chown -R $(id -u):$(id -g) .

## Uses

- uses [electron-react-redux boilerplate from jschr](https://github.com/jschr/electron-react-redux-boilerplate)
- uses `.travis.yml` from [electron-react boilerplate from chentsulin](https://github.com/chentsulin/electron-react-boilerplate)
