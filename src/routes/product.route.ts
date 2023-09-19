import { Router } from 'express'
import {
  CreateProductController,
  DeleteProductController,
  GetAllProductController,
  GetProductController,
  UpdateProductController
} from '../controllers/product.controller'
import { AuthClient } from '../middleware/auth'

export const ProductRouter: Router = Router()

ProductRouter.get('/', AuthClient, GetAllProductController)
ProductRouter.get('/:id', AuthClient, GetProductController)
ProductRouter.post('/', AuthClient, CreateProductController)
ProductRouter.put('/:id', AuthClient, UpdateProductController)
ProductRouter.delete('/:id', AuthClient, DeleteProductController)
