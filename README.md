# opentok-token-cli

Command line interface to generate a JWT token given an apiKey and secret. This is useful when you're trying to quickly test Anvil requests and you want to generate a JWT token.

## Install

```
npm install -g opentok-token-cli
```

## Usage

Options:
```
--apikey, -a	An OpenTok API Key
--secret, -s	An OpenTok API Secret
--issuerType, -i	The issuer type (project or account) (project by default)
--expires, -e	Optional expire time for the token in milliseconds (30 days from now by default) (integer)
--env, -v	Optional environment parameter "prod", "dev", "rel" or API URL (prod by default)
```

Example: `opentok-token-cli -a <APIKEY> -s <API_SECRET>`

If you don't want to remember your apiKey and secret every time you can add an alias to your `.bash_profile` so you can easily generate sessionIds and tokens whenever you want without any arguments. Although, you should consider the security of your secret, it's probably not the best idea to store it in plain text on your computer.
