import * as stream from 'stream'
import Axios from 'axios'
import { promisify } from 'util'
import { createWriteStream } from 'fs'
import { v4 as uuidv4 } from 'uuid'

const finished = promisify(stream.finished)

export default class CSVLoader {
  static readonly DefaultOutputLocation = './temp/'
  static async load(urls: string[]): Promise<string[]> {
    const files = []
    for (const url of urls) {
      const path = CSVLoader.DefaultOutputLocation + uuidv4()
      await this.downloadFile(url, path)
      files.push(path)
    }

    return files
  }

  static downloadFile(
    fileUrl: string,
    outputLocationPath: string,
  ): Promise<void> {
    const writer = createWriteStream(outputLocationPath)
    return Axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    }).then((response) => {
      response.data.pipe(writer)
      return finished(writer)
    })
  }
}
