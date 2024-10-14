import {createWriteStream} from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt')
  const writeStream = createWriteStream(filePath, {encoding: 'utf8'})

  console.log('Enter text to write to the file. Press Ctrl+C to finish:')

  process.stdin.setEncoding('utf8')

  process.stdin.on('data', (chunk) => {
    writeStream.write(chunk)
  })

  return new Promise((resolve) => {
    const handleExit = () => {
      writeStream.end()
      console.log('\nFinished writing to file.')
      resolve()
      process.exit()
    }

    process.on('SIGINT', handleExit)
  })
}

await write()
