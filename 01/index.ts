const fs = require('fs')

const input = {
  test: 'test.txt',
  real: 'input.txt',
}

const day1a = (filename) => {
  const data = fs.readFileSync(`${__dirname}/${filename}`, 'utf8')

  return data
    .split('\n\n')
    .map((elf) =>
      elf
        .split('\n')
        .map((n) => parseInt(n))
        .reduce((acc, current) => acc + current)
    )
    .sort((a, b) => b - a)[0]
}

const day1b = (filename) => {
  const data = fs.readFileSync(`${__dirname}/${filename}`, 'utf8')

  return data
    .split('\n\n')
    .map((elf) =>
      elf
        .split('\n')
        .map((n) => parseInt(n))
        .reduce((acc, current) => acc + current)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b)
}

console.log({
  testA: day1a(input.test),
  realA: day1a(input.real),
  testB: day1b(input.test),
  realB: day1b(input.real),
})
