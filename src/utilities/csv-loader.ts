import * as stream from 'stream'
import { Axios } from 'axios'
import { promisify } from 'util'
import { createWriteStream, existsSync, readdir, unlink, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from '@nestjs/common'
import { join } from 'path'

const finished = promisify(stream.finished)

export default class CSVLoader {
  static readonly DefaultOutputLocation = './tmp/'
  static async load(urls: string[]): Promise<string[]> {
    if (!existsSync(CSVLoader.DefaultOutputLocation)) {
      mkdirSync(CSVLoader.DefaultOutputLocation)
    }

    const files = []
    for (const url of urls) {
      const path = CSVLoader.DefaultOutputLocation + uuidv4()
      if (await this.tryDownloadFile(url, path)) {
        files.push(path)
      }
    }

    return files
  }

  static async clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      readdir(CSVLoader.DefaultOutputLocation, (err, files) => {
        if (err) reject(err)

        for (const file of files) {
          unlink(join(CSVLoader.DefaultOutputLocation, file), (err) => {
            if (err) reject(err)
          })
        }

        resolve()
      })
    })
  }

  static async tryDownloadFile(
    fileUrl: string,
    outputLocationPath: string,
  ): Promise<boolean> {
    const writer = createWriteStream(outputLocationPath)
    let success = true
    await new Axios({
      responseType: 'stream',
    })
      .get(fileUrl)
      .then((response) => {
        response.data.pipe(writer)
        return finished(writer)
      })
      .catch((err) => {
        Logger.warn(err)
        success = false
      })

    return success
  }
}
