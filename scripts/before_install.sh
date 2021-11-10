#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
. ~/.nvm/nvm.sh

nvm install --lts

#create our working directory if it doesnt exist
DIR="/home/ec2-user/sacred-client-eth"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi

#install pm2
npm install -g serve
npm install -g pm2