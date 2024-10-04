import {Transform} from 'stream'

const reverseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString().trim()
    if (text) {
      const reversed = text.split('').reverse().join('')
      this.push(reversed + '\n')
    }
    callback()
  },
})

const transform = async () => {
  console.log('Enter text to reverse. Press Ctrl+C to exit:')

  process.stdin.setEncoding('utf8')

  process.stdin.pipe(reverseTransform).pipe(process.stdout)

  return new Promise((resolve) => {
    process.on('SIGINT', () => {
      console.log('\nTransform stream closed')
      resolve()
      process.exit()
    })
  })
}

await transform()
