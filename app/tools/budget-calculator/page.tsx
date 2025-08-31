"use client";

import React, { useState } from 'react';
import Layout from '../../components/common/Layout';

type BudgetItem = {
  id: number;
  name: string;
  amount: number;
  type: 'income' | 'expense';
};

export default function BudgetCalculator() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const newItem: BudgetItem = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      type,
    };

    setItems([...items, newItem]);
    setName('');
    setAmount('');
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <Layout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Budget Calculator</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create and manage your organization's budget with this simple calculator. Add income and expenses to see your total balance.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Item Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    Amount ($)
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="type"
                      name="type"
                      value={type}
                      onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Add Item
                </button>
              </div>
            </form>

            <div className="mt-12 space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <div className="rounded-lg bg-green-50 p-6">
                  <h3 className="text-base font-semibold leading-6 text-green-800">Total Income</h3>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-green-900">${totalIncome.toFixed(2)}</p>
                </div>
                <div className="rounded-lg bg-red-50 p-6">
                  <h3 className="text-base font-semibold leading-6 text-red-800">Total Expenses</h3>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-red-900">${totalExpense.toFixed(2)}</p>
                </div>
                <div className={`rounded-lg p-6 ${balance >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
                  <h3 className={`text-base font-semibold leading-6 ${balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Balance</h3>
                  <p className={`mt-2 text-3xl font-bold tracking-tight ${balance >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
                    ${balance.toFixed(2)}
                  </p>
                </div>
              </div>

              {items.length > 0 && (
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                              <span className="sr-only">Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{item.name}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className={`inline-flex items-center rounded-md ${item.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} px-2 py-1 text-xs font-medium`}>
                                  {item.type === 'income' ? 'Income' : 'Expense'}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${item.amount.toFixed(2)}</td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete<span className="sr-only">, {item.name}</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 