export interface CheckoutPayload {
  email: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  postalCode: string
  nameOnCard: string
}