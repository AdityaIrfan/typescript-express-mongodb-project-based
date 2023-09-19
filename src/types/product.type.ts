export interface IProductType {
  Id: string
  Name: string
  Price: number
  Description?: string
}

export const ProductListResponse = async (products: any): Promise<IProductType[]> => {
  const productResponses: IProductType[] = []

  for (const product of products) {
    const productResponse: IProductType = {
      Id: product._id,
      Name: product.name,
      Price: product.price
    }

    productResponses.push(productResponse)
  }

  return productResponses
}

export const ProductResponse = async (product: any): Promise<IProductType> => {
  return {
    Id: product._id,
    Name: product.name,
    Price: product.price,
    Description: product.description || ''
  }
}

export const ToWriteProduct = (product: IProductType): any => {
  return {
    name: product.Name,
    price: product.Price,
    description: product.Description
  }
}
