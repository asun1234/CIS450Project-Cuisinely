# Application running instructions
# Oracle DB setup
Download the most updated version of Oracle Client to your local machine
here (https://www.oracle.com/database/technologies/instant-client/downloads.html) and after successfully following instructions and installing, please change the location of your downloaded client in db-config.js from my local directory to your local directory

Once successfully set up, npm install and npm start on the backend (in server folder) will be successful

# Front-end
(if you are in root directory)
npm install
npm start

# Back-end
cd server (from root directory)
npm install
npm start
(although I have increased the poolMin and poolMax to drastically increase timeout time, if the backend does timeout (an error will be printed), then stop and npm start again)
