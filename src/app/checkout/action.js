"use server"

import Stripe from "stripe"

export async function createPaymentIntent() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not set")
    return { error: "Stripe secret key is not configured" }
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15", // Use the latest stable API version
  })

  try {
    const amount = 2000

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return { error: error.message }
  }
}




// "use server";

// import Stripe from 'stripe';

// export async function createPaymentIntent(){
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//         apiVersion:"2024-12-18.acacia",
//     });
//     try {
//          const amount = 2000

//          const paymentIntent = await stripe.paymentIntents.create({
//              amount,
//              currency: "usd",
//              automatic_payment_methods: {
//                 enabled :true,
//              }
//          });
//          return {
//                 clientSecret: paymentIntent.client_secret
//          }
//     } catch (error) {
//         console.error("Error creating payment intent:", error);
//         return null;
//     }
 
// }