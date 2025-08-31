"use client";

import Link from 'next/link';
import { ArrowRightIcon, DocumentTextIcon, AcademicCapIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-[#f0f4f8] to-white">
      <div className="container-custom pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
        <div className="relative">
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
                <span>Financial Management</span>
              </li>
            </ol>
          </nav>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="mb-8 inline-flex items-center rounded-md bg-[#003366]/10 px-3 py-1">
                <span className="text-sm font-medium text-[#003366]">Professional Career Guide</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-[#003366] sm:text-5xl">
                Financial Manager <br />
                <span className="text-[#1a4480]">Career Resources & Professional Tools</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl">
                Access authoritative resources, industry insights, and master essential skills to
                advance your financial management career. Whether you're building your career or
                advancing to leadership positions, we provide the guidance needed for success.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/career"
                  className="btn-primary inline-flex items-center"
                >
                  Career Guide
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/tools" 
                  className="btn-secondary inline-flex items-center"
                >
                  Explore Tools
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:col-span-5">
              <div className="card shadow-md border-t-4 border-t-[#003366]">
                <h3 className="text-xl font-bold text-[#003366] mb-4">
                  Financial Manager Overview
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <DocumentTextIcon className="h-6 w-6 text-[#003366] mt-1" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Education Required</h4>
                      <p className="mt-1 text-sm text-gray-600">Bachelor's degree (finance, accounting, economics), MBA often preferred</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AcademicCapIcon className="h-6 w-6 text-[#003366] mt-1" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Experience</h4>
                      <p className="mt-1 text-sm text-gray-600">5+ years of related experience in finance, accounting or business</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChartBarSquareIcon className="h-6 w-6 text-[#003366] mt-1" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Median Annual Salary</h4>
                      <p className="mt-1 text-sm text-gray-600">$131,710 (2021, Bureau of Labor Statistics)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link href="/career" className="text-[#003366] font-medium hover:text-[#1a4480] inline-flex items-center text-sm">
                    View detailed career information
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#003366]">
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f9c74f]">17%</div>
              <div className="mt-1 text-sm">Projected growth rate (2021-2031)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f9c74f]">$131,710</div>
              <div className="mt-1 text-sm">Median annual wage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f9c74f]">697,900</div>
              <div className="mt-1 text-sm">Employment in the field</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 