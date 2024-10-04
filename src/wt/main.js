import {Worker} from 'worker_threads'
import os from 'os'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const numCores = os.cpus().length
console.log(`Number of CPU cores: ${numCores}`)

const workerPath = path.join(__dirname, 'worker.js')

const createWorker = (data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath)
    worker.on('message', (result) => {
      resolve({status: 'resolved', data: result})
    })
    worker.on('error', (error) => {
      resolve({status: 'error', data: null})
    })
    worker.postMessage(data)
  })
}

const performCalculations = async () => {
  const workers = []
  for (let i = 0; i < numCores; i++) {
    workers.push(createWorker(10 + i))
  }

  try {
    const results = await Promise.all(workers)
    console.log(results)
  } catch (error) {
    console.error('Error in calculations:', error)
  }
}

await performCalculations()
