import * as fs from 'fs'
import * as csv from 'csv-parser'

export default class CSVParser {
  static async parse<T>(
    path: string,
    onDataCallback: (data: T) => void,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('error', (error) => reject(error))
        .on('data', (data) => onDataCallback(data))
        .on('end', () => resolve())
    })
  }
}
