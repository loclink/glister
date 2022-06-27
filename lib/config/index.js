const { gtrcData, gitconfigData, gtrcIsExist, gtrcPath } = require('./config');
const { en_lang_config } = require('./en_lang');
const { zh_lang_config } = require('./zh_lang');
const langConfig = !gtrcData.lang || gtrcData.lang === 'en' ? en_lang_config : zh_lang_config;
module.exports = {
  gtrcData,
  gitconfigData,
  langConfig,
  gtrcIsExist,
  gtrcPath
};
