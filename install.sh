#!/bin/bash

# utility function
bldred='\033[1;31m'
bldgrn='\033[1;32m'
bldblu='\033[1;34m'
bldylw='\033[1;33m'
txtrst='\033[0m'

info () {
  printf "%b\n" "${bldblu}[INFO]${txtrst} $1"
}

pass () {
  printf "%b\n" "${bldgrn}[PASS]${txtrst} $1"
}

warn () {
  printf "%b\n" "${bldred}[WARN]${txtrst} $1"
}

info "Installing pm2 globaly first ..."
# install pm2 first
#sudo npm install pm2@latest -g

info "Global installation will processed on [ $HOME ]"
# process installation
cd ./temp
info "Downloading sources ..."
wget https://github.com/yoctore/yocto-pm2-agent/archive/master.zip
unzip master.zip -d ./
mv yocto-pm2-agent-master yocto-pm2-agent
rm master.zip
cd yocto-pm2-agent
info "Building yocto-pm2-agent ..."
npm install --production
info "Unistalling previous version of yocto-pm2-agent ..."
pm2 uninstall yocto-pm2-agent
info "Installing new version of yocto-pm2-agent ..."
pm2 install .
pass "Agent is installed ..."
info "To interract with remote interface follow instructions below : 
- pm2 set yocto-pm2-agent:publicKey <YOUR_PUBLIC_KEY>
- pm2 set yocto-pm2-agent:bucketKey <YOUR_BUCKET_KEY>
- pm2 set yocto-pm2-agent:host <YOUR_SOCKET_HOST_URL>"
