const fs = require('fs')

import { BlockT } from './types'

export default (directory: string, block: BlockT) =>
  fs.readFileSync(
    `${directory}/${
      {
        test: 'test.txt',
        real: 'input.txt',
      }[block]
    }`,
    'utf8'
  )
