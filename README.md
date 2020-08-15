# Stessaluna

A social platform for community-driven language learning exercises. 🇳🇱🇮🇹🇺🇸

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
