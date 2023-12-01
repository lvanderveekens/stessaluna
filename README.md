# Stessaluna

A social platform for community-driven language learning exercises. 🇳🇱🇮🇹🇺🇸

![image](https://github.com/lvanderveekens/stessaluna/assets/6907423/73035127-d15e-4bf3-ad9f-4e09694a1017)
![image](https://github.com/lvanderveekens/stessaluna/assets/6907423/72fa70f2-a1fd-4e46-8b4c-0986c0bcdac0)

## Installation

The following dependencies are needed otherwise uploaded images won't be optimized.

    $ brew install jpegoptim optipng pngquant

## Development

First run:

    $ yarn dev-server
    $ symfony server:start

Then open https://localhost:8000

## Deploy

    $ yarn build
    $ gcloud app deploy
