import {promises as fs} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rename = async () => {
  const sourceFile = path.join(__dirname, 'files', 'wrongFilename.txt')
  const targetFile = path.join(__dirname, 'files', 'properFilename.md')

  try {
    await fs.access(sourceFile)

    try {
      await fs.access(targetFile)
      throw new Error('FS operation failed')
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error('FS operation failed')
      }
    }

    await fs.rename(sourceFile, targetFile)
    console.log('File renamed successfully')
  } catch (error) {
    if (error.message === 'FS operation failed') {
      throw error
    }
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed')
    }
    throw error
  }
}

await rename()
