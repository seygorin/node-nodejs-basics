import {promises as fs} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const copy = async () => {
  const sourceDir = path.join(__dirname, 'files')
  const targetDir = path.join(__dirname, 'files_copy')

  try {
    await fs.access(sourceDir)
    try {
      await fs.access(targetDir)
      throw new Error('FS operation failed')
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error('FS operation failed')
      }
    }

    const copyRecursive = async (src, dest) => {
      const stats = await fs.stat(src)
      if (stats.isDirectory()) {
        await fs.mkdir(dest, {recursive: true})
        const entries = await fs.readdir(src)
        for (const entry of entries) {
          await copyRecursive(path.join(src, entry), path.join(dest, entry))
        }
      } else {
        await fs.copyFile(src, dest)
      }
    }

    await copyRecursive(sourceDir, targetDir)
    console.log('Folder copied successfully')
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

await copy()
