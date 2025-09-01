"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface CashFlowItem {
  id: number;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  frequency: 'monthly' | 'quarterly' | 'annually';
  startMonth: number;
}

export default function CashFlowForecaster() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [items, setItems] = useState<CashFlowItem[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
  const [startMonth, setStartMonth] = useState('1');
  const [forecastMonths, setForecastMonths] = useState('12');
  const [initialBalance, setInitialBalance] = useState('0');

  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/tools/cash-flow-forecaster');
    }
  }, [status, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: CashFlowItem = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      type,
      frequency,
      startMonth: parseInt(startMonth),
    };
    
    setItems([...items, newItem]);
    
    // 重置表单
    setName('');
    setAmount('');
    setType('income');
    setFrequency('monthly');
    setStartMonth('1');
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateMonthlyAmount = (item: CashFlowItem, month: number) => {
    if (month < item.startMonth) return 0;
    
    const monthsSinceStart = month - item.startMonth;
    
    switch (item.frequency) {
      case 'monthly':
        return item.amount;
      case 'quarterly':
        return monthsSinceStart % 3 === 0 ? item.amount : 0;
      case 'annually':
        return monthsSinceStart % 12 === 0 ? item.amount : 0;
      default:
        return 0;
    }
  };

  const generateForecast = () => {
    const months = parseInt(forecastMonths);
    const forecast = [];
    let balance = parseFloat(initialBalance);
    
    for (let month = 1; month <= months; month++) {
      let monthlyIncome = 0;
      let monthlyExpense = 0;
      
      items.forEach(item => {
        const amount = calculateMonthlyAmount(item, month);
        if (item.type === 'income') {
          monthlyIncome += amount;
        } else {
          monthlyExpense += amount;
        }
      });
      
      const monthlyNetCashFlow = monthlyIncome - monthlyExpense;
      balance += monthlyNetCashFlow;
      
      forecast.push({
        month,
        income: monthlyIncome,
        expense: monthlyExpense,
        netCashFlow: monthlyNetCashFlow,
        balance,
      });
    }
    
    return forecast;
  };

  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth((monthNumber - 1) % 12);
    return date.toLocaleString('default', { month: 'short' });
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

  const forecast = generateForecast();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cash Flow Forecaster</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Predict future cash flows based on recurring income and expenses.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            {/* Cash Flow Item Form */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Add Income/Expense</h3>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Item Name
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
                  <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    Amount ($)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium leading-6 text-gray-900">
                    Frequency
                  </label>
                  <div className="mt-2">
                    <select
                      id="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as 'monthly' | 'quarterly' | 'annually')}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="startMonth" className="block text-sm font-medium leading-6 text-gray-900">
                    Start Month
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="startMonth"
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      min="1"
                      max="12"
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Item
                  </button>
                </div>
              </form>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Forecast Settings</h3>
                
                <div>
                  <label htmlFor="initialBalance" className="block text-sm font-medium leading-6 text-gray-900">
                    Initial Balance ($)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="initialBalance"
                      value={initialBalance}
                      onChange={(e) => setInitialBalance(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="forecastMonths" className="block text-sm font-medium leading-6 text-gray-900">
                    Forecast Months
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="forecastMonths"
                      value={forecastMonths}
                      onChange={(e) => setForecastMonths(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      min="1"
                      max="60"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cash Flow Items List */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Cash Flow Items</h3>
              {items.length === 0 ? (
                <p className="mt-4 text-sm text-gray-600">No items added yet. Add income and expense items to generate a forecast.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className={`rounded-md border px-4 py-3 ${
                        item.type === 'income' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        ${item.amount.toLocaleString()} | {item.frequency} | Starting: Month {item.startMonth}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Cash Flow Forecast */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">Cash Flow Forecast</h3>
              {items.length === 0 ? (
                <p className="mt-4 text-sm text-gray-600">Add income and expense items to generate a forecast.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Month</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Income</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expense</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Net</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {forecast.map((month) => (
                        <tr key={month.month}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {getMonthName(month.month)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">
                            ${month.income.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-red-600">
                            ${month.expense.toLocaleString()}
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm ${month.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${month.netCashFlow.toLocaleString()}
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${month.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                            ${month.balance.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 