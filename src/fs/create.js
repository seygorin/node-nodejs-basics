import {promises as fs} from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const create = async () => {
  const folderPath = path.join(__dirname, 'files')
  const filePath = path.join(folderPath, 'fresh.txt')
  const content = 'I am fresh and young'

  try {
    await fs.access(folderPath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(folderPath, {recursive: true})
    }
  }

  try {
    await fs.access(filePath)
    throw new Error('FS operation failed')
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, content, 'utf8')
      console.log('File created successfully')
    } else {
      throw new Error('FS operation failed')
    }
  }
}

await create()
