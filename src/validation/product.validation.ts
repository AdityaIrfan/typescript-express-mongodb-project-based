import Joi from 'joi'
import { IProductType } from '../types/product.type'

export const ProductCreateValidation = (payload: IProductType): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Price: Joi.number().required().min(1),
    Description: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const ProductUpdateValidation = (payload: IProductType): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    Name: Joi.string().allow('', null),
    Price: Joi.number().allow(0, null).min(1),
    Description: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
