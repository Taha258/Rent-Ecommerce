'use client'

import React, { useState } from "react"
import Image from 'next/image';
import { LayoutDashboard, ImageIcon, MessageSquare, Users, Wallet, Car, CarFront, Settings, LogOut, Search, Bell, ShoppingCart, MoreVertical, Menu } from 'lucide-react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className={`w-[240px] bg-white border-r fixed lg:static top-0 h-full z-50 transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-blue-600 text-xl font-bold">MORENT</span>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 text-sm p-3 rounded-lg bg-blue-600 text-white">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            {[{ icon: ImageIcon, label: "Assets" }, { icon: MessageSquare, label: "Messages" }, { icon: Users, label: "Customers" }, { icon: Wallet, label: "Wallet" }, { icon: Car, label: "Cars" }, { icon: CarFront, label: "Car Rent", active: true }, { icon: Settings, label: "Settings" }].map((item) => (
              <a key={item.label} href="#" className="flex items-center gap-3 text-sm p-3 rounded-lg text-gray-500 hover:bg-gray-50">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="absolute bottom-5 left-5">
            <button className="flex items-center gap-3 text-sm p-3 rounded-lg text-gray-500 hover:bg-gray-50">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative flex-1 max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search something here"
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </div>
        </header>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          {/* Details Rental */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Details Rental</h2>
              <button>
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-1 mb-4">
                  <div className="relative w-full h-72">
                    <Image
                      src="/images/maps.png"
                      alt="Nissan GT-R"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <h3 className="font-semibold">Nissan GT-R</h3>
                <p className="text-gray-500 text-sm">Sport Car</p>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Location</label>
                  <select className="w-full p-3 rounded-lg border border-gray-200 bg-white">
                    <option>Drop - Off</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Date</label>
                    <input type="date" className="w-full p-3 rounded-lg border border-gray-200 bg-white" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Time</label>
                    <input type="time" className="w-full p-3 rounded-lg border border-gray-200 bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-6 border-t">
              <div>
                <p className="text-sm font-medium">Total Rental Price</p>
                <p className="text-xs text-gray-500">Overall price rental</p>
              </div>
              <p className="text-xl font-semibold">$80.00</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top 5 Car Rental */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Top 5 Car Rental</h2>
                <button>
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="relative">
                <div className="flex justify-center items-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="16"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="16"
                        strokeDasharray="552.92"
                        strokeDashoffset="138.23"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <p className="text-3xl font-bold">72,030</p>
                        <p className="text-sm text-gray-500">Total Cars</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                      <span className="text-gray-500">Sport Car</span>
                    </div>
                    <p className="font-medium pl-5">47,450</p>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-300" />
                      <span className="text-gray-500">SUV</span>
                    </div>
                    <p className="font-medium pl-5">24,580</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transaction */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Transaction</h2>
                <button className="text-blue-600 text-sm">View All</button>
              </div>

              <div className="space-y-4">
                {[{ name: "Nissan GT-R", type: "Sport Car", price: "$80.00" }, { name: "Honda Prelude", type: "Sport Car", price: "$74.00" }, { name: "Rolls - Royce", type: "Sport Car", price: "$96.00" }, { name: "CR - V", type: "SUV", price: "$80.00" }].map((car) => (
                  <div key={car.name} className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-gray-100 rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{car.name}</p>
                      <p className="text-sm text-gray-500">{car.type}</p>
                    </div>
                    <p className="font-semibold whitespace-nowrap">{car.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
