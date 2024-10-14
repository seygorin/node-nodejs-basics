import {createReadStream, createWriteStream, promises as fsPromises} from 'fs'
import {createGzip} from 'zlib'
import {pipeline} from 'stream/promises'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compress = async () => {
  const sourceFile = path.join(__dirname, 'files', 'fileToCompress.txt')
  const destinationFile = path.join(__dirname, 'files', 'archive.gz')

  try {
    await fsPromises.access(sourceFile)

    await pipeline(
      createReadStream(sourceFile),
      createGzip(),
      createWriteStream(destinationFile)
    )
    console.log('File compressed successfully')
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Compression failed: Source file does not exist')
    } else {
      console.error('Compression failed:', error)
    }
    throw new Error('FS operation failed')
  }
}

await compress()
