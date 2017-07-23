import Moment from 'moment';

const sigVars = {
  'useSignature': true,
  'themeName': 'Silverstripe Webpack Theme',
  'themeDescription': 'My custom theme',
  'authorLine': 'YOUR NAME',
  'authorURI': 'your-website.com',
  'includeTimestamp': true
};

const signature = `
  Theme Name: ${sigVars.themeName}
  Theme Description: ${sigVars.themeDescription}
  Author: ${sigVars.authorLine} // ${sigVars.authorURI}
  ${sigVars.includeTimestamp ? 'Last Edited: ' + Moment().format('ll') : ''}\n`;

export {sigVars, signature};
