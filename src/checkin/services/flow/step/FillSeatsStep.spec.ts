import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import FillSeatsStep from './FillSeatsStep'

describe('[ Step / FillSeatsStep ]', () => {
    const step = new FillSeatsStep()
  
    describe('Testing on execute', () => {

        it('should filled seats', async () => {
          const context = new MockContext()
          const response = step.onExecute(context)
    
          expect(response).toBeTruthy()
        })
    
      


    })
  })