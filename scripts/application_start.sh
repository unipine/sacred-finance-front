#!/bin/bash

#give permission for everything in the sacred-client-eth directory
sudo chmod -R 777 /home/ec2-user/sacred-client-eth

#navigate into our working directory where we have all our github files
cd /home/ec2-user/sacred-client-eth

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
npm install

nvm install --lts

#build
npm run build