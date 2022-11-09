export default class CSVHelper {
  static sanitizeProperties<T>(object: T): T {
    const sanitizedObject = {} as T
    for (const [key, value] of Object.entries(object)) {
      sanitizedObject[key.trim()] = value
    }

    return sanitizedObject
  }
}
