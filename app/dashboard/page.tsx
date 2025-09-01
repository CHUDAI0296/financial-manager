"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 如果用户未登录，重定向到登录页面
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
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

  if (status === 'unauthenticated') {
    return null; // 将由useEffect处理重定向
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to your dashboard</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hello, {session?.user?.name || 'User'}! This is your personal financial management dashboard.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-xl font-semibold leading-7 text-gray-900">Financial Tools</dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Access our suite of financial management tools.</p>
                <p className="mt-6">
                  <Link href="/tools" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    View tools <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-xl font-semibold leading-7 text-gray-900">Account Settings</dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Manage your profile and account preferences.</p>
                <p className="mt-6">
                  <Link href="/dashboard/settings" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Update settings <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-xl font-semibold leading-7 text-gray-900">Financial Reports</dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">View and generate financial reports and analyses.</p>
                <p className="mt-6">
                  <Link href="/dashboard/reports" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    View reports <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-t border-gray-200 pt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Recent Activity</h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            You have no recent activity. Start using our tools to track your financial activities.
          </p>
        </div>
      </div>
    </div>
  );
} 