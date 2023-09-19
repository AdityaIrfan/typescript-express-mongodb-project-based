import Joi from 'joi'

export function JoiErrorMessage(error: Joi.ValidationError): string {
  return error.details[0].message.replace(`"`, '').replace(`"`, '')
}
