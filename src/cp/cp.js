import {spawn} from 'child_process'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const spawnChildProcess = async (args) => {
  const scriptPath = path.join(__dirname, 'files', 'script.js')

  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  })

  process.stdin.pipe(child.stdin)

  child.stdout.pipe(process.stdout)

  child.on('error', (error) => {
    console.error('Failed to start child process:', error)
  })

  return new Promise((resolve, reject) => {
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Child process exited with code ${code}`))
      }
    })
  })
}

const args = process.argv.slice(2)
await spawnChildProcess(args)
