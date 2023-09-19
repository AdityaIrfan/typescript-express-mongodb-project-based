import mongoose from 'mongoose'

export interface ProductResponse {
  Id: string
  Name: string
  Description: string
}

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const ProductModel = mongoose.model('product', productSchema)

export default ProductModel
