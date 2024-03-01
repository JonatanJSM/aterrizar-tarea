import { Context } from '../../../model/Context'
import StepTemplate from '../StepTemplate'

export default class RequestSeatsStep extends StepTemplate {
  when(context: Context): boolean {
    const session = context.getSession()
    return session.data.seats && session.data.seats.length === 0
  }

  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()
    const requestData = context.getRequest()
    const amountSeats = requestData.fields?.seats_required as number

    if (amountSeats !== requestData.seat.length) {
      context = context.withResponseBuilder((responseBuilder) => responseBuilder
        .status('seats_assignation_required')
        .requiredFiles({ seats_required: null })
      )
      return Promise.resolve(false)
    }

    context = context.withSessionBuilder((sessionBuilder) => sessionBuilder
      .data({
        ...session.data,
        seats: [
          ...session.data.seats,
          ...requestData.seat?.map(seat => ({
            seatNumber: seat.seatNumber,
            flight: seat.flight
          }))
        ]
      })
    )

    return Promise.resolve(true)
  }

}
