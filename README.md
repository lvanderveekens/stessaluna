# Stessaluna

A social platform for community-driven language learning exercises. 🇳🇱🇮🇹🇺🇸

<img width="1313" alt="Screenshot 2024-08-24 at 09 40 32" src="https://github.com/user-attachments/assets/586d84ab-725a-4282-8f77-067985aed2d7">
<img width="1313" alt="Screenshot 2024-08-24 at 09 41 53" src="https://github.com/user-attachments/assets/b734cd05-95d7-4c70-8b15-6c1807f035db">
<img width="1313" alt="Screenshot 2024-08-24 at 09 40 28" src="https://github.com/user-attachments/assets/66267464-22b7-4140-a4c3-eeea8c2fde3d">
<img width="1313" alt="Screenshot 2024-08-24 at 09 41 29" src="https://github.com/user-attachments/assets/055e83b9-13d8-4166-ad65-7dc48519f995">


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
