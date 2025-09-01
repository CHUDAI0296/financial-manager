"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Investment {
  id: number;
  name: string;
  initialCost: number;
  annualRevenue: number;
  annualCost: number;
  years: number;
}

export default function ROIAnalyzer() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [name, setName] = useState('');
  const [initialCost, setInitialCost] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [annualCost, setAnnualCost] = useState('');
  const [years, setYears] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/tools/roi-analyzer');
    }
  }, [status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInvestment: Investment = {
      id: Date.now(),
      name,
      initialCost: parseFloat(initialCost),
      annualRevenue: parseFloat(annualRevenue),
      annualCost: parseFloat(annualCost),
      years: parseInt(years),
    };
    
    setInvestments([...investments, newInvestment]);
    setSelectedInvestment(newInvestment);
    
    // 重置表单
    setName('');
    setInitialCost('');
    setAnnualRevenue('');
    setAnnualCost('');
    setYears('');
  };

  const calculateROI = (investment: Investment) => {
    const totalRevenue = investment.annualRevenue * investment.years;
    const totalCost = investment.initialCost + (investment.annualCost * investment.years);
    const profit = totalRevenue - totalCost;
    const roi = (profit / totalCost) * 100;
    
    return {
      totalRevenue,
      totalCost,
      profit,
      roi,
      paybackPeriod: investment.initialCost / (investment.annualRevenue - investment.annualCost),
    };
  };

  const handleSelectInvestment = (investment: Investment) => {
    setSelectedInvestment(investment);
  };

  const handleDeleteInvestment = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
    if (selectedInvestment?.id === id) {
      setSelectedInvestment(null);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-900">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ROI Analyzer</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Calculate and analyze the return on investment (ROI) for your projects and investments.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            {/* Investment Form */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Add New Investment</h3>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Investment Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="initialCost" className="block text-sm font-medium leading-6 text-gray-900">
                    Initial Cost ($)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="initialCost"
                      value={initialCost}
                      onChange={(e) => setInitialCost(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="annualRevenue" className="block text-sm font-medium leading-6 text-gray-900">
                    Annual Revenue ($)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="annualRevenue"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="annualCost" className="block text-sm font-medium leading-6 text-gray-900">
                    Annual Cost ($)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="annualCost"
                      value={annualCost}
                      onChange={(e) => setAnnualCost(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="years" className="block text-sm font-medium leading-6 text-gray-900">
                    Time Period (Years)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="years"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      min="1"
                      max="50"
                      step="1"
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Calculate ROI
                  </button>
                </div>
              </form>
            </div>
            
            {/* Investments List */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Your Investments</h3>
              {investments.length === 0 ? (
                <p className="mt-4 text-sm text-gray-600">No investments added yet. Add your first investment to see ROI analysis.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {investments.map((investment) => (
                    <li
                      key={investment.id}
                      className={`rounded-md border px-4 py-3 cursor-pointer ${
                        selectedInvestment?.id === investment.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleSelectInvestment(investment)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{investment.name}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteInvestment(investment.id);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Initial: ${investment.initialCost.toLocaleString()} | {investment.years} years
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* ROI Analysis */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">ROI Analysis</h3>
              {selectedInvestment ? (
                <div className="mt-4 rounded-lg bg-gray-50 p-6">
                  <h4 className="font-medium text-gray-900">{selectedInvestment.name}</h4>
                  
                  {(() => {
                    const { totalRevenue, totalCost, profit, roi, paybackPeriod } = calculateROI(selectedInvestment);
                    
                    return (
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Initial Investment</p>
                            <p className="text-lg font-medium text-gray-900">${selectedInvestment.initialCost.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time Period</p>
                            <p className="text-lg font-medium text-gray-900">{selectedInvestment.years} years</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-lg font-medium text-green-600">${totalRevenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Cost</p>
                            <p className="text-lg font-medium text-red-600">${totalCost.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Net Profit</p>
                              <p className={`text-lg font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${profit.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">ROI</p>
                              <p className={`text-lg font-medium ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {roi.toFixed(2)}%
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Payback Period</p>
                            <p className="text-lg font-medium text-gray-900">
                              {paybackPeriod <= 0 ? 'Never' : `${paybackPeriod.toFixed(2)} years`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-600">Select an investment from the list to view detailed ROI analysis.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 