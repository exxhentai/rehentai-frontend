import preval from 'preval.macro';

export default preval`
  const fs = require('fs');
  module.exports = JSON.parse(fs.readFileSync('./config.json'));
`;

export const packageJSON = preval`
const fs = require('fs');
module.exports = JSON.parse(fs.readFileSync('./package.json'));
`;
