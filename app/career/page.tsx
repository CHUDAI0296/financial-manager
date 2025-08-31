import React from 'react';
import Layout from '../components/common/Layout';

export default function CareerGuidePage() {
  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Financial Manager Career Guide</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Financial managers are responsible for the financial health of an organization. They produce financial reports, direct investment activities, and develop strategies for the long-term financial goals of their organization.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
              <div>
                <h3 className="font-semibold text-gray-900">Career Paths</h3>
                <p className="mt-4">
                  Financial managers can take various career paths including:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Chief Financial Officer (CFO):</span> The highest financial position, responsible for the overall financial strategy of an organization.
                  </li>
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Finance Director:</span> Oversees financial planning, financial risk management, and financial reporting.
                  </li>
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Controller:</span> Responsible for preparing financial reports that summarize and forecast the organization's financial position.
                  </li>
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Treasurer:</span> Manages the organization's financial assets and liabilities, plans for future financial needs.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Skills & Qualifications</h3>
                <p className="mt-4">
                  To excel as a financial manager, you need:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Education:</span> A bachelor's degree in finance, accounting, economics, or related field. Many positions require a master's degree or MBA.
                  </li>
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Certifications:</span> CPA, CFA, or other financial certifications enhance career prospects.
                  </li>
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Technical Skills:</span> Financial analysis, risk management, investment analysis, familiarity with financial software.
                  </li>
                  <li className="flex gap-x-3">
                    <span className="font-semibold">Soft Skills:</span> Leadership, strategic thinking, communication, problem-solving, attention to detail.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16">
              <h3 className="font-semibold text-gray-900">Salary & Job Outlook</h3>
              <p className="mt-4 text-base leading-7 text-gray-700">
                According to the Bureau of Labor Statistics, financial managers earn a median annual salary of $134,180 (as of 2021). 
                The job outlook is very positive, with employment projected to grow 15% from 2019 to 2029, much faster than the average for all occupations.
                This growth is driven by the need for financial expertise in an increasingly complex global financial environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 