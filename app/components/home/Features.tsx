"use client";

import Link from 'next/link';
import { ArrowRightIcon, ArrowPathIcon, ChartBarIcon, AcademicCapIcon, ScaleIcon, ClipboardDocumentIcon, UsersIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Career Path Planning',
    description: 'Detailed career pathways from entry-level to executive positions in financial management.',
    icon: ArrowPathIcon,
    href: '/career',
  },
  {
    name: 'Professional Skills Training',
    description: 'Build essential competencies in financial analysis, risk management, and investment decision-making.',
    icon: AcademicCapIcon,
    href: '/education',
  },
  {
    name: 'Industry Data Insights',
    description: 'Access authoritative salary information, job market analysis, and industry outlook data.',
    icon: ChartBarIcon,
    href: '/news',
  },
  {
    name: 'Regulatory Guidelines',
    description: 'Stay current on financial regulations, industry standards, and compliance requirements.',
    icon: ScaleIcon,
    href: '/news/regulations',
  },
  {
    name: 'Financial Tools Library',
    description: 'Professional templates, calculators, and analysis tools to enhance productivity and accuracy.',
    icon: ClipboardDocumentIcon,
    href: '/tools',
  },
  {
    name: 'Professional Development',
    description: 'Certification information, continuing education resources, and networking opportunities.',
    icon: UsersIcon,
    href: '/education/development',
  },
];

export default function Features() {
  return (
    <div className="bg-white">
      <div className="container-custom py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#003366] sm:text-4xl">
            Financial Management Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive information and tools to support financial managers at every career stage.
          </p>
        </div>
        
        <div className="mt-16 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
            {features.map((feature) => (
              <Link
                key={feature.name}
                href={feature.href}
                className="card hover:shadow-md border-gray-200 transition-shadow relative flex flex-col p-6"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f0f4f8]">
                    <feature.icon className="h-6 w-6 text-[#003366]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
                <div className="mt-4 flex items-center text-[#003366] text-sm font-medium">
                  Learn more <ArrowRightIcon className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-16 lg:mt-20 border-t border-gray-200 pt-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-bold tracking-tight text-[#003366] sm:text-3xl">
                Data-Driven Career Guidance
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Our information is sourced from the Bureau of Labor Statistics and industry reports to provide the most accurate career guidance.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-span-7">
              <dl className="grid gap-8 sm:grid-cols-2">
                <div className="card flex flex-col p-5 border-l-4 border-l-[#003366]">
                  <dt className="text-lg font-semibold text-gray-900">Education & Training</dt>
                  <dd className="mt-1 text-sm text-gray-600">
                    Typically requires a bachelor's degree in finance, accounting, or economics, plus 5+ years of experience. Many senior positions require MBA degrees.
                  </dd>
                  <div className="mt-4 flex-grow"></div>
                  <Link href="/career/education" className="mt-4 text-sm font-medium text-[#003366] flex items-center">
                    Education requirements <ArrowRightIcon className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
                
                <div className="card flex flex-col p-5 border-l-4 border-l-[#003366]">
                  <dt className="text-lg font-semibold text-gray-900">Job Outlook</dt>
                  <dd className="mt-1 text-sm text-gray-600">
                    Employment of financial managers is projected to grow 17% from 2021 to 2031, much faster than the average for all occupations.
                  </dd>
                  <div className="mt-4 flex-grow"></div>
                  <Link href="/career/outlook" className="mt-4 text-sm font-medium text-[#003366] flex items-center">
                    Job outlook details <ArrowRightIcon className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 