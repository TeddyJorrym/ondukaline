const base =
  process.env.PAYPAL_API_URL ||
  'https://api-m.sandbox.paypal.com'

// Convert KES to USD in real time-ish
// You can adjust this rate anytime
const USD_TO_KES_RATE = 129

function convertKesToUsd(amountInKes: number) {
  return (amountInKes / USD_TO_KES_RATE).toFixed(2)
}

export const paypal = {
  createOrder: async function createOrder(
    priceInKes: number
  ) {
    const accessToken =
      await generateAccessToken()

    const url = `${base}/v2/checkout/orders`

    // Convert KES to USD for PayPal
    const priceInUsd =
      convertKesToUsd(priceInKes)

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: priceInUsd,
            },
          },
        ],
      }),
    })

    return handleResponse(response)
  },

  capturePayment:
    async function capturePayment(
      orderId: string
    ) {
      const accessToken =
        await generateAccessToken()

      const url = `${base}/v2/checkout/orders/${orderId}/capture`

      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type':
            'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return handleResponse(response)
    },
}

async function generateAccessToken() {
  const {
    PAYPAL_CLIENT_ID,
    PAYPAL_APP_SECRET,
  } = process.env

  if (
    !PAYPAL_CLIENT_ID ||
    !PAYPAL_APP_SECRET
  ) {
    throw new Error(
      'Missing PayPal environment variables'
    )
  }

  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`
  ).toString('base64')

  const response = await fetch(
    `${base}/v1/oauth2/token`,
    {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type':
          'application/x-www-form-urlencoded',
      },
    }
  )

  const jsonData =
    await handleResponse(response)

  return jsonData.access_token
}

async function handleResponse(
  response: Response
) {
  const data = await response.json()

  if (
    response.status === 200 ||
    response.status === 201
  ) {
    return data
  }

  throw new Error(JSON.stringify(data))
}




// const base =
//   process.env.PAYPAL_API_URL ||
//   'https://api-m.sandbox.paypal.com'

// export const paypal = {
//   createOrder: async function createOrder(
//     price: number
//   ) {
//     const accessToken =
//       await generateAccessToken()

//     const url = `${base}/v2/checkout/orders`

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({
//         intent: 'CAPTURE',
//         purchase_units: [
//           {
//             amount: {
//               currency_code: 'KES',
//               value: price.toFixed(2),
//             },
//           },
//         ],
//       }),
//     })

//     return handleResponse(response)
//   },

//   capturePayment:
//     async function capturePayment(
//       orderId: string
//     ) {
//       const accessToken =
//         await generateAccessToken()

//       const url = `${base}/v2/checkout/orders/${orderId}/capture`

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type':
//             'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })

//       return handleResponse(response)
//     },
// }

// async function generateAccessToken() {
//   const {
//     PAYPAL_CLIENT_ID,
//     PAYPAL_APP_SECRET,
//   } = process.env

//   if (
//     !PAYPAL_CLIENT_ID ||
//     !PAYPAL_APP_SECRET
//   ) {
//     throw new Error(
//       'Missing PayPal API credentials'
//     )
//   }

//   const auth = Buffer.from(
//     `${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`
//   ).toString('base64')

//   const response = await fetch(
//     `${base}/v1/oauth2/token`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${auth}`,
//         'Content-Type':
//           'application/x-www-form-urlencoded',
//       },
//       body: 'grant_type=client_credentials',
//     }
//   )

//   const jsonData =
//     await handleResponse(response)

//   return jsonData.access_token
// }

// async function handleResponse(
//   response: Response
// ) {
//   if (
//     response.status === 200 ||
//     response.status === 201
//   ) {
//     return response.json()
//   }

//   const errorMessage =
//     await response.text()

//   console.error(
//     'PayPal API Error:',
//     errorMessage
//   )

//   throw new Error(errorMessage)
// }












// const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

// export const paypal = {
//   createOrder: async function createOrder(price: number) {
//     const accessToken = await generateAccessToken()
//     const url = `${base}/v2/checkout/orders`
//     const response = await fetch(url, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({
//         intent: 'CAPTURE',
//         purchase_units: [
//           {
//             amount: {
//               currency_code: 'USD',
//               value: price,
//             },
//           },
//         ],
//       }),
//     })
//     return handleResponse(response)
//   },
//   capturePayment: async function capturePayment(orderId: string) {
//     const accessToken = await generateAccessToken()
//     const url = `${base}/v2/checkout/orders/${orderId}/capture`
//     const response = await fetch(url, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })

//     return handleResponse(response)
//   },
// }

// async function generateAccessToken() {
//   const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env
//   const auth = Buffer.from(
//     PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET
//   ).toString('base64')
//   const response = await fetch(`${base}/v1/oauth2/token`, {
//     method: 'post',
//     body: 'grant_type=client_credentials',
//     headers: {
//       Authorization: `Basic ${auth}`,
//     },
//   })

//   const jsonData = await handleResponse(response)
//   return jsonData.access_token
// }

// async function handleResponse(response: any) {
//   if (response.status === 200 || response.status === 201) {
//     return response.json()
//   }

//   const errorMessage = await response.text()
//   throw new Error(errorMessage)
// }