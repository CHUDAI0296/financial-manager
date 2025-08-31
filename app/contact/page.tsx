import React from 'react';
import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container-custom py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#003366]">Home</Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li className="text-[#003366] font-medium">
              <span>Contact Us</span>
            </li>
          </ol>
        </nav>
        
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold tracking-tight text-[#003366] mb-8">
                Contact Us
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Have questions about financial management resources or need assistance?
                We're here to help. Fill out the form below and our team will respond as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366] sm:text-sm"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="bg-[#003366] hover:bg-[#1a4480] text-white font-medium py-2 px-4 rounded transition duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-[#f0f4f8] p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-[#003366] mb-4">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-6 w-6 text-[#003366]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">info@financialmanager.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-6 w-6 text-[#003366]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPinIcon className="h-6 w-6 text-[#003366]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Office</p>
                      <p className="text-sm text-gray-600">
                        123 Financial Street<br />
                        Suite 400<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-[#003366] mb-2">Office Hours</h3>
                  <p className="text-sm text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 