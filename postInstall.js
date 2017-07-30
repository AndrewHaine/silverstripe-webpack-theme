const path = require('path');
const fs = require('fs');
const readline = require('readline');
const currPath = path.join(__dirname, '../');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const bootstrap = {
  init() {
    new Promise(res => {
      this.requestThemeName(res);
    }).then(() => fs.unlinkSync('./postInstall.js'))
  },
  requestThemeName(resolve) {
    rl.question('Please enter your theme name:\ ', themeName => {
      try {
        fs.renameSync(currPath + path.basename(__dirname), currPath + themeName);
        rl.close();
        resolve();
      } catch (e) {
        console.error('Looks like there was a problem with your theme name:\n' + e);
        this.requestThemeName(resolve);
      }
    });
  }
}.init();
