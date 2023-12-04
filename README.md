# Tebex Front End Quest

Greetings, adventurer! Embark upon this tech task as a noble quest.

## Overview

We would like you to create a simple front-end for a checkout using the Figma designs provided. In this project there are APIs that will enable you to complete the task.

You may use whatever tools/libraries you need to help you to complete this quest!

### What are we looking for?

- Does the end product look exactly like the designs?
- Does the product work as expected?
- Is the code clean, consistent and extensible?

**Bonus** if you feel like you have time you might consider the following as bonus

- Add unit tests or e2e tests
- Consider responsive design, how does it look on mobile?

Ready to get started?

### Setup

```shell
npm install
```

Launch the APIs this will run on port 3000

```
npm run api
```

This project uses vite to run the dev server execute

```
npm run dev
```

### API endpoints

There are 3 endpoints

The first to `GET` the basket with the selected products and price information. The second is a `POST` endpoint to submit the checkout, more information can be found below. Lastly there is a `POST` coupon endpoint that will apply a discount to the basket and return the updated basket.

Be sure to pass the `Content-Type` header of `application/json` when performing the post requests.

#### Get basket endpoint

```
GET  /api/basket
```

This will return

```json
{
  "id": "1",
  "products": [
    {
      "name": "Medium Booster",
      "price": 9.99,
      "image": "medium_booster.png",
      "quantity": 1
    },
    {
      "name": "Small Coins",
      "price": 4.99,
      "image": "small_coins.png",
      "quantity": 1
    }
  ],
  "couponCode": "25OFF",
  "subTotal": 11.24,
  "salesTax": 2.25,
  "total": 13.48
}
```

#### Apply coupon endpoint

```
POST  /api/basket/:id/coupon
```

This will return the basket along with the applied discount, use code 25OFF for 25% off the total price.

```json
{
  "id": "1",
  "products": [
    {
      "name": "Medium Booster",
      "price": 9.99,
      "image": "medium_booster.png",
      "quantity": 1
    },
    {
      "name": "Small Coins",
      "price": 4.99,
      "image": "small_coins.png",
      "quantity": 1
    }
  ],
  "couponCode": "25OFF",
  "subTotal": 11.24,
  "salesTax": 2.25,
  "total": 13.48
}
```

#### Complete checkout endpoint

```
POST  /api/basket/:id/checkout
Body:
{
    cardCvc: "123",
    cardExpiry: "01/24",
    cardNumber: "1111222233334444",
    email: "john.doe@example.com",
    nameOnCard: "John Doe",
    postalCode: "SW1W 0NY"
}
```

This will return

```json
{ "success": true, "transactionId": "tbx-6a6da59ebfa86d3d106fb68be75c0fd7" }
```
