# Stessaluna

A social platform for community-driven language learning exercises. 🇳🇱🇮🇹🇺🇸

<img width="1840" alt="Screenshot 2024-08-24 at 09 21 24" src="https://github.com/user-attachments/assets/99776a82-ba00-4141-afe7-fde82abe65b3">
<img width="1840" alt="Screenshot 2024-08-24 at 09 31 12" src="https://github.com/user-attachments/assets/a10367b4-24c6-4672-aa25-e06144d767bc">
<img width="1840" alt="Screenshot 2024-08-24 at 09 31 32" src="https://github.com/user-attachments/assets/32259ef7-05f0-4c98-a5fb-2a89279df0c8">
<img width="1840" alt="Screenshot 2024-08-24 at 09 31 59" src="https://github.com/user-attachments/assets/84e5e0ba-bf42-4cf4-b035-e01844e2f8e1">

## Installation

PHP 7.3
Composer 1.10.10

The following dependencies are needed otherwise uploaded images won't be optimized.

    $ brew install jpegoptim optipng pngquant

Database setup:

    $ php bin/console doctrine:database:create
    $ php bin/console doctrine:migrations:migrate


JWT key generation:

https://github.com/lexik/LexikJWTAuthenticationBundle/blob/1.x/Resources/doc/index.md

## Development

First run:

    $ yarn dev-server
    $ symfony server:start

Then open https://localhost:8000

## Deploy

    $ yarn build
    $ gcloud app deploy
