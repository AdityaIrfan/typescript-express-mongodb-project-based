import ProductModel from '../models/product.model'
import { logger } from '../utils/logger'
import { IProductType, ToWriteProduct } from '../types/product.type'

export const GetAllProductService = async (): Promise<any> => {
  return await ProductModel.find()
    .then((products) => {
      return products
    })
    .catch((e) => {
      logger.error('FAILED TO GET ALL PRODUCTS : ', e)
    })
}

export const GetProductByIdService = async (id: string): Promise<any> => {
  return await ProductModel.findById(id)
    .then((product) => {
      return product
    })
    .catch((e) => {
      logger.error('FAILED TO GET PRODUCTS BY ID : ', e)
    })
}

export const CreateProductService = async (product: IProductType): Promise<any> => {
  return await ProductModel.create(ToWriteProduct(product))
    .then((product) => {
      return product
    })
    .catch((e) => {
      logger.error('FAILED TO CREATE PRODUCT : ', e)
    })
}

export const UpdateProductService = async (product: IProductType): Promise<any> => {
  return await ProductModel.findOneAndUpdate({ _id: product.Id }, { $set: ToWriteProduct(product) })
    .then((productResult) => {
      return productResult
    })
    .catch((e) => {
      logger.error('FAILED TO UPDATE PRODUCT : ', e)
    })
}

export const DeleteProductService = async (id: string): Promise<any> => {
  return await ProductModel.findOneAndDelete({ _id: id })
    .then((product) => {
      return product
    })
    .catch((e) => {
      logger.error('FAILED TO DELETE PRODUCT : ', e)
    })
}
