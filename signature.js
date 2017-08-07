import Moment from 'moment';
import v from './variables';

// Build comment
const signature = `
  Theme Name: ${v.themeName}
  Theme Description: ${v.themeDescription}
  Author: ${v.authorLine} // ${v.authorURI}
  ${v.includeTimestamp ? 'Last Edited: ' + Moment().format('ll') : ''}\n`;

export default signature;
