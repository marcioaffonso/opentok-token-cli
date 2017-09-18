#!/usr/bin/env node

const args = require('args'),
  jwt = require('jsonwebtoken'),
  options = args.Options.parse([{
    name: 'apikey',
    shortName: 'a',
    help: 'An OpenTok API Key'
  }, {
    name: 'secret',
    shortName: 's',
    help: 'An OpenTok API Secret'
  }, {
    name: 'issuerType',
    shortName: 'i',
    help: 'Optional issuer type, one of project or account',
    defaultValue: 'project'
  }, {
    name: 'expires',
    shortName: 'e',
    type: 'int',
    help: 'Optional expire time for the token in milliseconds (30 days from now by default)'
  }, {
    name: 'env',
    shortName: 'v',
    defaultValue: 'prod',
    help: 'Optional environment parameter "prod", "dev", "rel" or API URL'
  }]),
  opts = args.parser(process.argv).parse(options),
  OpenTok = require('opentok'),
  apiKey = opts.apikey,
  secret = opts.secret,
  issuerType = opts.issuerType;

if (!apiKey || !secret) {
  errorMessage();
  return;
}

let opentok;
if (opts.env !== 'prod') {
  let apiUrl;
  switch (opts.env) {
    case 'dev':
      apiUrl = 'https://anvil-tbdev.opentok.com';
    break;
    case 'rel':
      apiUrl = 'https://anvil-tbrel.opentok.com';
    break;
    default:
      apiUrl = opts.env;
    break;
  }
  opentok = new OpenTok(apiKey, secret, apiUrl);
} else {
  opentok = new OpenTok(apiKey, secret);
}

const token = generateToken(apiKey, secret, issuerType);
outputResults(token);

function generateToken(apiKey, secret, issuerType) {
  const currentTime = Math.floor(new Date() / 1000);
  return jwt.sign({
    iss: apiKey,
    ist: issuerType,
    iat: currentTime,
    exp: opts.expires || currentTime + (30 * 24 * 60 * 60), // in 30 days
  }, secret);
}

function outputResults(token) {
  console.info('token: ', token);
}

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
