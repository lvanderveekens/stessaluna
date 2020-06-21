#!/bin/bash

# Build all assets using webpack
yarn build

# Load the production secrets
# You should create app-secrets.env yourself.
export $(cat app-secrets.env | xargs)
envsubst < app-template.yaml > app.yaml

# Deploy to App Engine
gcloud app deploy
