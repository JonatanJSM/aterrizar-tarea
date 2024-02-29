import { Context } from '../../../model/Context'
import StepTemplate from '../StepTemplate'

export default class ValidateSessionStep extends StepTemplate {

  // solo declara este porque siempre se va a ejecutar
  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()
    const requestData = context.getRequest()

    // Lo que el cliente mandó en el UI concida con el back
    if (session.sessionId !== requestData.sessionId) {
      this.rejectRequest(context)
      return Promise.resolve(false)
    }

    if (session.userId !== requestData.userId) {
      this.rejectRequest(context)
      return Promise.resolve(false)
    }

    return Promise.resolve(true)
  }

  private rejectRequest(context: Context): Context {
    return context.withResponseBuilder(
      (responseBulder) => responseBulder
        .status('rejected')
    )
  }
}
