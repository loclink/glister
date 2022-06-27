const helpDescription = {
  version: 'print version number',
  help:'display help for command',
  helpForCmd:'display subcommand help information'
};
const commandDescription = {
  lan: 'switch the language'
}
const switchLanguage = {
  commandDescription: 'switch the language',
  inquirerIssue: 'please select a language:'
}
const en_lang_config = {
  helpDescription,
  commandDescription,
  switchLanguage
}

module.exports = {
  en_lang_config
}
