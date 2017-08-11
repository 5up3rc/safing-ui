# Safing UI

The Safing UI allows you to change settings and monitor applications.

For more information about Safing, please check out [Safing Core](https://github.com/Safing/safing-core).

## Download

We recommend to download a packaged version of all components [here](https://github.com/Safing/safing-installer/releases).  
You can also just [download Safing UI](https://github.com/Safing/safing-ui/releases).

## Developing

    yarn
    yarn develop

## Requirements

- nodejs
- npm
- yarn

## Building

    yarn pack:win
    yarn pack:mac
    yarn pack:linux

If that does not work for you, try to build with a docker image (you need to have docker installed and running for this):

    sudo docker run --rm -ti -v $(pwd):/project electronuserland/electron-builder yarn pack:linux
    # then fix permissions, as the docker image will create files owned by root
    sudo chown -R $(id -u):$(id -g) .

## Uses

- uses [electron-react-redux boilerplate from jschr](https://github.com/jschr/electron-react-redux-boilerplate)
- uses `.travis.yml` from [electron-react boilerplate from chentsulin](https://github.com/chentsulin/electron-react-boilerplate)
