import {promises as fs} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const remove = async () => {
  const fileToRemove = path.join(__dirname, 'files', 'fileToRemove.txt')

  try {
    await fs.access(fileToRemove)

    await fs.unlink(fileToRemove)
    console.log('File removed successfully')
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed')
    }
    throw error
  }
}

await remove()
