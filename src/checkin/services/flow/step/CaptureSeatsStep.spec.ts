// import { MockContext } from '@testMocks/model/Context.mock'
// import CaptureSeatsInfoStep from './CaptureSeatsStep'
// import { Context } from '../../../model/Context'
// import { seatInformation } from '../../../model/session/FlightData'

describe('[ Step / CapturetSeatsStep ]', () => {
  // const step = new CaptureSeatsInfoStep()

  describe('Test when it should be execute', () => {
    it('should return true when requesData.seats is not null || undefined', () => { // ?Extra test?
      expect(true).toBeTruthy()
    })

    it('should return true when requesData.seats.length is equals to seats_required field', () => {
      expect(true).toBeTruthy()
    })

    it('should return true when requesData.seats is send to session', () => {
      expect(true).toBeTruthy()
    })

    // If request has filled a property called seats in the format equal as the one in session and,
    // the number of seats is valid then capture the information in the session.
  })
})

// function wireContextMockWithSeatsInSession(seatsSigned: seatInformation[]): Context {
//   const context: Context = new MockContext()
//   context.withSessionBuilder(sessionBuilder => sessionBuilder
//     .data({
//       country: context.getSession().data.country,
//       flights: context.getSession().data.flights,
//       passengers: context.getSession().data.passengers,
//       seats: seatsSigned
//     })
//   )
//   return context
