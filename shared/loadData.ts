const fs = require('fs')

import { InputBlockE } from './types'

export default (directory: string, block: InputBlockE): string =>
  fs.readFileSync(`${directory}/${block}`, 'utf8')
