const fs = require('fs')
const ini = require('ini')
const { gtrcData,gtrcPath } = require('../config')

const writeGtrc = (gtrcInfo, callback) => {
  fs.writeFileSync(gtrcPath, ini.encode(gtrcInfo), callback)
}
// const writeGtrc

module.exports = {
  writeGtrc
}
