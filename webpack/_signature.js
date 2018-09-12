import { format } from 'date-fns';
import v from '../variables';

// Build comment
const signature = `
  Theme Name: ${v.themeName}
  Theme Description: ${v.themeDescription}
  Author: ${v.authorLine} // ${v.authorURI}
  ${v.includeTimestamp ? 'Last Edited: ' + format(new Date(), 'LLL do, y') : ''}\n`;

export default signature;
