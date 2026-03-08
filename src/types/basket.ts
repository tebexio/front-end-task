export interface Product {
  name: string
  price: number
  image: string
  quantity: number
}

export interface Basket {
  id: string
  products: Product[]
  couponCode: string | null
  subTotal: number
  salesTax: number
  total: number
}