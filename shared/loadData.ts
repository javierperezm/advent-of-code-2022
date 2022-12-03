const fs = require('fs')

import { InputBlockE } from './types'

export default (directory: string, block: InputBlockE) =>
  fs.readFileSync(`${directory}/${block}`, 'utf8')
