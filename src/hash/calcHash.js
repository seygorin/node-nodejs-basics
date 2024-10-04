import {createHash} from 'crypto'
import {createReadStream} from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt')
  const hash = createHash('sha256')

  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath)

    stream.on('data', (chunk) => {
      hash.update(chunk)
    })

    stream.on('end', () => {
      const fileHash = hash.digest('hex')
      console.log(fileHash)
      resolve(fileHash)
    })

    stream.on('error', (error) => {
      reject(error)
    })
  })
}

await calculateHash()
