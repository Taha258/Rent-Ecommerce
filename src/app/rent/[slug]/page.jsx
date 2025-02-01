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
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Checkout</h1>
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
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="p-4 px-7 bg-blue-500 mt-5 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
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
        <div className="w-full bg-white h-full p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
            <p className="text-sm text-gray-400">Step 3 of 4</p>
          </div>
          <p className="text-base text-gray-300 -mt-4 mb-6">Please enter your payment method</p>
          <CheckoutPage />
        </div>

        <div className="w-full bg-white h-full p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Confirmation</h2>
            <p className="text-sm text-gray-400">Step 4 of 4</p>
          </div>
          <p className="text-base text-gray-300 -mt-4 mb-6">
            We are getting to the end. Just a few clicks and your rental is ready!
          </p>

          <form>
            <div className="space-y-4 mb-6">
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <input
                  type="checkbox"
                  id="marketingConsent"
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="marketingConsent" className="ml-3 text-base text-gray-800">
                  I agree with sending Marketing and newsletter emails. No spam, promised!
                </label>
              </div>
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <input
                  type="checkbox"
                  id="termsConsent"
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="termsConsent" className="ml-3 text-base text-gray-800">
                  I agree with our terms and conditions and privacy policy.
                </label>
              </div>
            </div>
            {/* <Link href={"/map"}>
              <button className="p-4 px-7 bg-blue-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-600">
                Rent Now
              </button>
            </Link> */}
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex flex-col items-start space-y-5">
              <Image src="/images/shieldtick.svg" alt="Shield Tick" width={24} height={24} />
              <div>
                <p className="text-base font-semibold text-gray-800 mb-2">All your data are safe</p>
                <p className="text-sm text-gray-400">
                  We are using the most advanced security to provide you the best experience ever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="order-1 lg:order-2 w-full lg:w-1/3 bg-white h-full p-6 rounded-lg shadow-md"
        style={{ marginBottom: "2.5rem" }}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-lg font-semibold text-black">Rental Summary</h2>
          <p className="text-sm text-gray-300 mt-1 leading-6">
            Prices may change depending on the length of the rental and the price of your rental car.
          </p>

          <div className="flex items-center mt-6">
            <div className="flex items-center relative w-20 h-20">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: "url('/images/look.svg')",
                }}
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
            <div className="relative flex items-center space-x-4 mt-8">
              <input
                type="text"
                placeholder="Apply promo code"
                className="flex-1 bg-gray-100 rounded-lg px-5 py-3 text-lg sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-0 bg-transparent text-black px-4 py-2 rounded-lg text-lg sm:text-sm">
                Apply now
              </button>
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

