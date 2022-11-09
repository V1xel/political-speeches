import * as fs from 'fs'
import * as csv from 'csv-parser'
import CSVHelper from './csv-helper'

export default class CSVParser {
  static async parse<T>(
    path: string,
    onDataCallback: (data: T) => void,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('error', (error) => reject(error))
        .on('data', (rawData) => {
          const sanitizedData = CSVHelper.sanitizeProperties(rawData)
          onDataCallback(sanitizedData)
        })
        .on('end', () => resolve())
    })
  }
}
