import React from 'react';
import Layout from '../components/common/Layout';
import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      name: 'Budget Calculator',
      description: 'Create and manage budgets for your organization with this comprehensive calculator.',
      href: '/tools/budget-calculator',
      available: true,
    },
    {
      name: 'ROI Analyzer',
      description: 'Calculate and analyze return on investment for various projects and investments.',
      href: '/tools/roi-analyzer',
      available: true,
    },
    {
      name: 'Cash Flow Forecaster',
      description: 'Predict future cash flows based on historical data and current trends.',
      href: '/tools/cash-flow-forecaster',
      available: true,
    },
    {
      name: 'Financial Statement Generator',
      description: 'Create professional financial statements including balance sheets, income statements, and cash flow statements.',
      href: '/tools/financial-statements',
      available: false,
    },
    {
      name: 'Risk Assessment Tool',
      description: 'Identify and quantify financial risks in your operations or investments.',
      href: '/tools/risk-assessment',
      available: false,
    },
  ];

  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Financial Tools</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access powerful financial tools designed specifically for financial managers. These tools will help you analyze data, make informed decisions, and improve your organization's financial performance.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900">
                    {tool.name}
                    {!tool.available && (
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        Coming Soon
                      </span>
                    )}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{tool.description}</p>
                    <p className="mt-6">
                      {tool.available ? (
                        <Link
                          href={tool.href}
                          className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                        >
                          Use Tool <span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold leading-6 text-gray-400">
                          Available in Phase 2
                        </span>
                      )}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
} 