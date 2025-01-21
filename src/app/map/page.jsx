"use client"

import React, { useState } from "react"
import {
  LayoutDashboard,
  ImageIcon,
  MessageSquare,
  Users,
  Wallet,
  Car,
  CarFront,
  Settings,
  LogOut,
  Search,
  Bell,
  ShoppingCart,
  MoreVertical,
  Menu,
  X,
} from "lucide-react"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 mx-auto w-[1670px] bg-[pink]">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r fixed lg:static top-0 bottom-0 left-0 z-50 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-blue-600 text-xl font-bold">MORENT</span>
          </div>

          <nav className="space-y-1 flex-grow overflow-y-auto">
            <a href="#" className="flex items-center gap-3 text-sm p-3 rounded-lg bg-blue-600 text-white">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            {[
              { icon: ImageIcon, label: "Assets" },
              { icon: MessageSquare, label: "Messages" },
              { icon: Users, label: "Customers" },
              { icon: Wallet, label: "Wallet" },
              { icon: Car, label: "Cars" },
              { icon: CarFront, label: "Car Rent", active: true },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 text-sm p-3 rounded-lg text-gray-500 hover:bg-gray-50"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <button className="flex items-center gap-3 text-sm p-3 rounded-lg text-gray-500 hover:bg-gray-50 mt-auto">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-grow">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="relative flex-1 max-w-md">
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

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Details Rental */}
            <div className="bg-white rounded-xl shadow-sm p-6 w-[90%] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Details Rental</h2>
                <button>
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 ">
                <div className="flex-1">
                  <div className="mb-4 rounded-xl overflow-hidden ">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.3806572335707!2d67.02340577544162!3d24.85084544564204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e75a28531d1%3A0x412558657f5ff4a8!2sGovernor%20House%20Karachi!5e0!3m2!1sen!2s!4v1737391330887!5m2!1sen!2s"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <h3 className="font-semibold">Nissan GT-R</h3>
                  <p className="text-gray-500 text-sm">Sport Car</p>
                </div>

                {/* <div className="bg-[pink] flex-1 space-y-4">
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
                </div> */}
              </div>

              <div className="mt-6 flex items-center justify-between pt-6 border-t ">
                <div>
                  <p className="text-sm font-medium">Total Rental Price</p>
                  <p className="text-xs text-gray-500">Overall price rental</p>
                </div>
                <p className="text-xl font-semibold">$80.00</p>
              </div>
            </div>

            {/* Top 5 Car Rental */}
            <div className="bg-white rounded-xl shadow-sm p-6 w-[90%] mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Top 5 Car Rental</h2>
                <button>
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#eee" strokeWidth="10%" />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="10%"
                      strokeDasharray="282.74"
                      strokeDashoffset="70.69"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <p className="text-3xl font-bold">72,030</p>
                      <p className="text-sm text-gray-500">Total Cars</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-8">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                      <span className="text-gray-500">Sport Car</span>
                    </div>
                    <p className="font-medium text-lg mt-2">47,450</p>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-300" />
                      <span className="text-gray-500">SUV</span>
                    </div>
                    <p className="font-medium text-lg mt-2">24,580</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

