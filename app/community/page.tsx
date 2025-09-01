"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 模拟数据
const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: 'Best practices for financial reporting in 2023',
    author: 'Sarah Johnson',
    date: '2023-08-15',
    replies: 24,
    views: 342,
    tags: ['reporting', 'best-practices', 'standards'],
  },
  {
    id: 2,
    title: 'How are you handling the new tax regulations?',
    author: 'Michael Chen',
    date: '2023-08-10',
    replies: 18,
    views: 256,
    tags: ['tax', 'regulations', 'compliance'],
  },
  {
    id: 3,
    title: 'Software recommendations for small business financial management',
    author: 'David Wilson',
    date: '2023-08-05',
    replies: 32,
    views: 410,
    tags: ['software', 'small-business', 'tools'],
  },
  {
    id: 4,
    title: 'Career transition from accounting to financial management',
    author: 'Emily Rodriguez',
    date: '2023-07-28',
    replies: 15,
    views: 189,
    tags: ['career', 'professional-development', 'accounting'],
  },
  {
    id: 5,
    title: 'ESG reporting challenges and solutions',
    author: 'James Taylor',
    date: '2023-07-22',
    replies: 27,
    views: 301,
    tags: ['ESG', 'sustainability', 'reporting'],
  },
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Annual Financial Leadership Summit',
    date: '2023-10-15',
    location: 'New York, NY',
    type: 'Conference',
  },
  {
    id: 2,
    title: 'Digital Transformation in Finance Webinar',
    date: '2023-09-22',
    location: 'Online',
    type: 'Webinar',
  },
  {
    id: 3,
    title: 'Financial Risk Management Workshop',
    date: '2023-11-05',
    location: 'Chicago, IL',
    type: 'Workshop',
  },
];

export default function CommunityPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'discussions' | 'events' | 'members'>('discussions');
  
  // 如果用户未登录，重定向到登录页面
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/community');
    }
  }, [status, router]);

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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Financial Managers Community</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect with other financial management professionals, share knowledge, and stay updated on industry events.
          </p>
        </div>

        <div className="mt-16 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'discussions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('discussions')}
            >
              Discussions
            </button>
            <button
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'members'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('members')}
            >
              Members
            </button>
          </div>
        </div>

        <div className="mt-8">
          {activeTab === 'discussions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Recent Discussions</h3>
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  New Discussion
                </button>
              </div>
              
              <div className="overflow-hidden rounded-md border border-gray-300">
                <ul className="divide-y divide-gray-300">
                  {MOCK_DISCUSSIONS.map((discussion) => (
                    <li key={discussion.id} className="hover:bg-gray-50">
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-1">
                              <a href="#" className="hover:text-indigo-600">
                                {discussion.title}
                              </a>
                            </h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>By {discussion.author}</span>
                              <span className="mx-2">&bull;</span>
                              <span>{discussion.date}</span>
                            </div>
                          </div>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <div>{discussion.replies} replies</div>
                            <div>{discussion.views} views</div>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center justify-between">
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Previous
                      </a>
                    </div>
                    <div className="hidden md:flex">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        3
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Upcoming Events</h3>
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit Event
                </button>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-2">
                {MOCK_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                        {event.type}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div>Date: {event.date}</div>
                      <div>Location: {event.location}</div>
                    </div>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View Details <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Community Members</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <p className="text-center py-8 text-gray-500">
                This feature is coming soon. Members directory will be available in the next update.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 