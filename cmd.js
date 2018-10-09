#!/usr/bin/env node

const args = require('args');
const { generateToken } = require('opentok-jwt');

const options = args.Options.parse([{
  name: 'apikey',
  shortName: 'a',
  help: 'An OpenTok API Key',
}, {
  name: 'secret',
  shortName: 's',
  help: 'An OpenTok API Secret',
}, {
  name: 'issuerType',
  shortName: 'i',
  help: 'Optional issuer type, one of project or account',
  defaultValue: 'project',
}, {
  name: 'expires',
  shortName: 'e',
  type: 'int',
  help: 'Optional expire time for the token in milliseconds (30 days from now by default)',
}, {
  name: 'env',
  shortName: 'v',
  defaultValue: 'prod',
  help: 'Optional environment parameter "prod", "dev", "rel" or API URL',
}]);
const opts = args.parser(process.argv).parse(options);
const { apiKey, secret, issuerType } = opts;

function errorMessage(err) {
  if (err) {
    if (err.stack) {
      console.error(err.stack);
    } else {
      console.error(String(err));
    }
  }
  console.error(options.getHelp());
  process.exit(1);
}

function outputResults(token) {
  console.info('token: ', token);
}

if (!apiKey || !secret) {
  errorMessage();
} else {
  const token = generateToken(apiKey, secret, issuerType, opts.expires);
  outputResults(token);
}
