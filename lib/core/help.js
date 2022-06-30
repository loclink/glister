const { program } = require('commander');
const config = require('../config');
const { output } = require('../utils/output');
const helpOptions = () => {
  program.name('gt').usage('<command> [options]');
  program.on('--help', () => {
    output();
    output('Other:');
    output('  ' + config.languageConfig.helpDescription.substituteTip);
    output();
  });
};

module.exports = {
  helpOptions
};
