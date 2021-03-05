### Installation 

1. run `npm run install`
2. generate github token - https://github.com/settings/tokens - make sure to give it repo access when creating the github token
3. pip install https://{TOKEN}@github.com/1Password/connect-sdk-python/archive/v0.0.1.zip
4. grab the access token from the shared 1password vault
5. set is as an environment variable `export OP_CONNECT_TOKEN=<TOKEN>`
