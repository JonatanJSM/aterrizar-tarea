
import { Context } from '../../../model/Context'
import StepTemplate from '../StepTemplate'

export default class RequestSeatsStep extends StepTemplate {
  when(context: Context): boolean {
    const session = context.getSession()
    return session.data.seats.length === 0
  }

  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()
    if (session.data.seats.length === 0) {
      context = context.withResponseBuilder((responseBuilder) => responseBuilder
        .status('seats_assignation_required')
        .requiredFiles({ seats_required: null }))
      return Promise.resolve(false)
    }

    if (session.data.seats.length !== (session.data.passengers * session.data.flights.length)) {
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
