const { program } = require('commander');
const { output } = require('../utils/output');

const helpOptions = () => {
  program.name('gt').usage('<command> [options]');
  program.on('--help', () => {
    output();
    output('Other:');
    output('  ' + program.messageInfo.helpDescription.substituteTip);
    output();
  });
};

module.exports = {
  helpOptions
};
