import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
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
              <span>About Us</span>
            </li>
          </ol>
        </nav>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-[#003366] mb-8">
            About Financial Manager
          </h1>
          
          <div className="prose prose-lg prose-blue max-w-none">
            <p>
              Financial Manager is dedicated to providing authoritative resources, tools, and guidance
              to help financial professionals advance their careers and excel in the field of financial management.
            </p>
            
            <p>
              Our mission is to connect financial management professionals with the most accurate and
              up-to-date information from trusted sources such as the Bureau of Labor Statistics,
              professional associations, and industry experts.
            </p>
            
            <h2>Our Resources</h2>
            <p>
              We offer a comprehensive range of resources designed to support financial managers
              at every stage of their career:
            </p>
            
            <ul>
              <li>Career planning guidance and development pathways</li>
              <li>Professional skills training and educational resources</li>
              <li>Industry data, trends, and salary information</li>
              <li>Regulatory updates and compliance guidelines</li>
              <li>Practical financial tools and calculators</li>
              <li>Networking and professional development opportunities</li>
            </ul>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions or would like more information about our resources,
              please visit our <Link href="/contact" className="text-[#003366] hover:underline">Contact page</Link>.
            </p>
            
            <div className="mt-8">
              <Link href="/" className="inline-flex items-center text-[#003366] hover:underline">
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 