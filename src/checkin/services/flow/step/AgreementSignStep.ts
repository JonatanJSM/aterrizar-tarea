import { Builder } from 'builder-pattern'
import { Context } from '../../../model/Context'
import { SessionData } from '../../../model/session/SessionData'
import { Session } from '../../../model/session'
import StepTemplate from '../StepTemplate'

export default class AgreementSignStep extends StepTemplate {

  // Describe por cada uno de estos / para que sea más bonito
  when(context: Context): boolean {
              //Si no es nulo devuelve su valor, sino false

    return !(context.getSession().data.agreementSigned ?? false)
  }

   // Se va a ejecutar solo cuando esté firmado el agreememt
  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()

    // revisa si la lo firmó, si no está lleno lo solicita
    // si lo tiene que pedir
    if (!this.isAgreementFieldFilled(context)) {
      this.setRequestForAgreementField(context)
      return Promise.resolve(false)
    }

    // Guardadlo en la sesión
    // o si lo tiene que guardar
    this.setAgreementInfoInSession(context, session)
    return Promise.resolve(true)
  }

  private setRequestForAgreementField(context: Context): void {
    context.withResponseBuilder((responseBuilder) => responseBuilder
      .status('user_information_required')
      .requiredFiles({ agreement_required: null })
    )
  }

  private setAgreementInfoInSession(context: Context, session: Session): void {
    context.withSessionBuilder((sessionBuilder) => sessionBuilder
      .data(
        Builder<SessionData>(session.data)
          .agreementSigned(true)
          .build()
      )
    )
  }

  private isAgreementFieldFilled(context: Context): boolean {
    return !!(context.getRequest().fields?.agreement_required)
  }
}
