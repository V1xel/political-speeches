import * as stream from 'stream'
import { Axios } from 'axios'
import { promisify } from 'util'
import { createWriteStream, existsSync, rmdir, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from '@nestjs/common'

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
      Logger.warn('starting download')
      await this.downloadFile(url, path)
      Logger.warn('starting finished')
      files.push(path)
    }

    return files
  }

  static async clear(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      rmdir(CSVLoader.DefaultOutputLocation, { recursive: true }, (err) => {
        if (err) {
          Logger.warn(err)
          reject(err)
        }

        resolve()
      })
    })
  }

  static async downloadFile(
    fileUrl: string,
    outputLocationPath: string,
  ): Promise<void> {
    const writer = createWriteStream(outputLocationPath)
    return new Axios({
      responseType: 'stream',
    })
      .get(fileUrl)
      .then((response) => {
        response.data.pipe(writer)
        return finished(writer)
      })
      .catch((err) => Logger.warn(err))
  }
}
