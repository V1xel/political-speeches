//Used internally, need to be rethrown for user http errors
export default class DomainError extends Error {
  constructor(message: string, obj: unknown) {
    const generatedMessage = JSON.stringify({
      message,
      obj,
    })
    super(generatedMessage)
  }
}
