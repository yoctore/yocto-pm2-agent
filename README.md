[![NPM](https://nodei.co/npm/yocto-pm2-agent.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yocto-pm2-agent/)

![alt text](https://david-dm.org/yoctore/yocto-pm2-agent.svg "Dependencies Status")
[![Code Climate](https://codeclimate.com/github/yoctore/yocto-pm2-agent/badges/gpa.svg)](https://codeclimate.com/github/yoctore/yocto-pm2-agent)
[![Test Coverage](https://codeclimate.com/github/yoctore/yocto-pm2-agent/badges/coverage.svg)](https://codeclimate.com/github/yoctore/yocto-pm2-agent/coverage)
[![Issue Count](https://codeclimate.com/github/yoctore/yocto-pm2-agent/badges/issue_count.svg)](https://codeclimate.com/github/yoctore/yocto-pm2-agent)
[![Build Status](https://travis-ci.org/yoctore/yocto-pm2-agent.svg?branch=master)](https://travis-ci.org/yoctore/yocto-pm2-agent)

## Overview

This module is a part of yocto node tools.

Please see [our NPM repository](https://www.npmjs.com/~yocto) for complete list of available tools (completed day after day).

This module is an custom monitoring agent for yocto project based on pm2 tools

## How it works

1 - Install yocto-pm2-agent

```javascript
curl -sL https://raw.githubusercontent.com/yoctore/yocto-pm2-agent/master/install.sh | bash
```

2 - Install pm2 modules or your custom module based on pm2 api.

Here existing pm2 tools :

Original pm2 modules : 
- pm2-server-monit : `pm2 install pm2-server-monit` => Monitor server CPU / Memory / Process / Zombie Process / Disk size / Security Packages / Network Input / Network Output
- pm2-log-rotate : `pm2 install pm2-log-rotate` => Automatically log rotate all applications logs managed by PM2
- pm2-docker : `pm2 install pm2-docker` => probe for docker
- pm2-mongodb : `pm2 install pm2-mongodb` => probe for mongodb
- pm2-redis : `pm2 install pm2-redis` => probe for redis
- pm2-elasticsearch : `pm2 install pm2 pm2-elasticsearch` => probe for elasticsearch

Yocto pm2 custom modules :
- yocto-pm2-mongodb : `curl -sL https://raw.githubusercontent.com/yoctore/yocto-pm2-mongodb/master/install.sh | bash` => based on `pm2-mongodb` but with ssl, auth support.
- yocto-pm2-iostat : `curl -sL https://raw.githubusercontent.com/yoctore/yocto-pm2-iostat/master/install.sh | bash` => monitor iostat on current system

3 - Show logs on `pm2 logs yocto-pm2-agent`

4 - If your need mode detail on logs, charts, and more representative graphic data create an account on our web plateform *(Comming soon)*

## Changelog

All history is [here](https://gitlab.com/yocto-node-modules/yocto-pm2-agent#CHANGELOG)


