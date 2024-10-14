import {createReadStream, createWriteStream, promises as fsPromises} from 'fs'
import {createGunzip} from 'zlib'
import {pipeline} from 'stream/promises'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const decompress = async () => {
  const sourceFile = path.join(__dirname, 'files', 'archive.gz')
  const destinationFile = path.join(__dirname, 'files', 'fileToCompress1.txt')

  try {
    await fsPromises.access(sourceFile)

    await pipeline(
      createReadStream(sourceFile),
      createGunzip(),
      createWriteStream(destinationFile)
    )
    console.log('File decompressed successfully')
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Decompression failed: Archive file does not exist')
    } else {
      console.error('Decompression failed:', error)
    }
    throw new Error('FS operation failed')
  }
}

await decompress()
