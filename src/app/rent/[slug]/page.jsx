"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { createPaymentIntent } from "../../checkout/action"
import cars from "../../cars"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    createPaymentIntent()
      .then((res) => {
        if (res && res.clientSecret) {
          setClientSecret(res.clientSecret)
          console.log("Client Secret:", res.clientSecret)
        } else {
          setError("Failed to create payment intent")
        }
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err)
        setError("Error creating payment intent")
      })
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!clientSecret) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
      <p className="text-base text-gray-500 mb-6">Please enter your payment method</p>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  )
}

function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.")
    } else {
      console.log("Stripe.js has loaded successfully.")
    }
  }, [stripe, elements])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    if (error) {
      setErrorMessage(error.message || "An error occurred")
      setIsProcessing(false)
    } else {
      setErrorMessage(null)
      alert("Payment Successful")
      setIsProcessing(false)
      router.push("/map")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        className="p-4 px-7 bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 w-full"
        type="submit"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </form>
  )
}

export default function RentForm() {
  const pathname = usePathname()
  const slug = pathname?.split("/").pop()
  const car = cars.find(
    (car) =>
      car.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") === slug,
  )

  if (!car) {
    return <div>Car not found</div>
  }

  return (
    <div className="mx-auto max-w-[1700px] px-4 flex flex-col lg:flex-row lg:my-10 space-y-6 lg:space-y-0 lg:space-x-10">
      <div className="order-2 lg:order-1 w-full lg:w-2/3 flex flex-col space-y-6 lg:space-y-10">
        <CheckoutPage />
      </div>
      
      <div className="order-1 lg:order-2 w-full lg:w-1/3 bg-white h-full p-6 rounded-lg shadow-md" style={{ marginBottom: "2.5rem" }}>
        <div className="flex flex-col h-full">
          <h2 className="text-lg font-semibold text-black">Rental Summary</h2>
          <p className="text-sm text-gray-300 mt-1 leading-6">
            Prices may change depending on the length of the rental and the price of your rental car.
          </p>
          
          <div className="flex items-center mt-6">
            <div className="flex items-center relative w-20 h-20">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/look.svg')" }}
              ></div>
              <Image
                src={car.image || "/placeholder.svg"}
                alt="Car"
                width={80}
                height={80}
                className="object-contain z-10 m-auto"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-semibold text-gray-800">{car.name}</h3>
              <div className="flex items-center justify-center mt-2">
                <Image src="/images/review-stars.svg" alt="Review Stars" width={100} height={20} />
                <p className="text-sm text-gray-600 ml-4">440+ Reviewer</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-8">
            <div className="flex justify-between text-base text-gray-400 mb-4">
              <p>Subtotal</p>
              <p className="text-black">${car.price}.00</p>
            </div>
            <div className="flex justify-between text-base text-gray-400 mb-4">
              <p>Tax</p>
              <p className="text-black">$0</p>
            </div>
          </div>
          
          <div className="mt-6 border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">Total Rental Price</p>
              <p className="text-3xl font-bold text-gray-800">${car.price}.00</p>
            </div>
            <p className="text-sm text-gray-400 mt-1">Overall price and includes rental discount</p>
          </div>
        </div>
      </div>
    </div>
  )
}
