import preval from 'preval.macro';

export default preval`
  const fs = require('fs');
  module.exports = JSON.parse(fs.readFileSync('./config.json'));
`;
