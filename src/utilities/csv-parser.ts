import * as fs from 'fs'
import * as csv from 'csv-parser'
import CSVHelper from './csv-helper'
import { Axios, AxiosResponse } from 'axios'
import { Logger } from '@nestjs/common'

export default class CSVParser {
  static async parse<T>(
    url: string,
    onDataCallback: (data: T) => void,
  ): Promise<void> {
    const parseStream = async (response: AxiosResponse): Promise<void> =>
      new Promise<void>((resolve, reject) =>
        response.data
          .pipe(csv())
          .on('error', (error) => reject(error))
          .on('data', (rawData) =>
            onDataCallback(CSVHelper.sanitizeProperties(rawData)),
          )
          .on('end', () => resolve()),
      )

    return await new Axios({ responseType: 'stream' })
      .get(url)
      .then((response) => parseStream(response))
      .catch((error) => Logger.warn(error))
  }
}
