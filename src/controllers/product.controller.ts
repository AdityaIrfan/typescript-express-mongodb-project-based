import { Request, Response } from 'express'
import { ProductCreateValidation, ProductUpdateValidation } from '../validation/product.validation'
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessListResponse,
  SuccessResponse
} from '../core/apiResponse'
import { JoiErrorMessage } from '../core/errMessage.helper'
import {
  CreateProductService,
  DeleteProductService,
  GetAllProductService,
  GetProductByIdService,
  UpdateProductService
} from '../services/product.service'
import { ProductListResponse, ProductResponse } from '../types/product.type'

export const GetAllProductController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await GetAllProductService()
    const productResponse = await ProductListResponse(products)
    return new SuccessListResponse('Success get product data', productResponse).send(res)
  } catch (e) {
    return new InternalErrorResponse('Failed to get all products').send(res)
  }
}

export const CreateProductController = async (req: Request, res: Response): Promise<Response> => {
  const { error, value } = ProductCreateValidation(req.body)
  if (error) {
    return new BadRequestResponse(JoiErrorMessage(error)).send(res)
  }

  try {
    const product = await CreateProductService(value)
    if (!product) {
      return new InternalErrorResponse('Failed to create new product').send(res)
    }

    const productResponse = await ProductResponse(product)

    return new SuccessResponse('Success create new product', productResponse).send(res)
  } catch (e) {
    return new InternalErrorResponse('Failed to create new product').send(res)
  }
}

export const GetProductController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    const product = await GetProductByIdService(id)

    if (!product) {
      return new NotFoundResponse('Product not found').send(res)
    }

    const productResponse = await ProductResponse(product)
    return new SuccessResponse('Success get product', productResponse).send(res)
  } catch (e) {
    return new InternalErrorResponse('Failed to get products').send(res)
  }
}

export const UpdateProductController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  const { error, value } = ProductUpdateValidation(req.body)
  if (error) {
    return new BadRequestResponse(JoiErrorMessage(error)).send(res)
  }

  if (
    (value.Name === null || value.Name === undefined || value.Name === '') &&
    (value.Description === null || value.Description === undefined || value.Description === '') &&
    (value.Price === null || value.Price === undefined || value.Price === 0)
  ) {
    return new BadRequestResponse('at least one attribute that will be updated').send(res)
  }

  try {
    value.Id = id
    let product = await UpdateProductService(value)
    if (!product) {
      return new NotFoundResponse('Product not found').send(res)
    }

    product = await GetProductByIdService(id)
    const productResponse = await ProductResponse(product)

    return new SuccessResponse('Success update product', productResponse).send(res)
  } catch (e) {
    return new InternalErrorResponse('Failed to update product').send(res)
  }
}

export const DeleteProductController = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  try {
    const product = await DeleteProductService(id)
    if (!product) {
      return new NotFoundResponse('Product not found').send(res)
    }

    return new SuccessResponse('Success delete product').send(res)
  } catch (error) {
    return new InternalErrorResponse('Failed to delete product').send(res)
  }
}
