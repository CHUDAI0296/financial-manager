"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChartBarIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { Fragment } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Career Guide', href: '/career' },
  { name: 'Education', href: '/education' },
  { name: 'Financial Tools', href: '/tools' },
  { name: 'Community', href: '/community' },
  { name: 'Industry News', href: '/news' },
];

const secondaryNavigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Resources', href: '/resources' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header>
      {/* Top secondary navigation */}
      <div className="bg-[#003366] text-white">
        <div className="container-custom flex justify-end py-1 text-sm">
          {secondaryNavigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="px-3 py-1 hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <Disclosure as="nav" className={classNames(
        "sticky top-0 z-50 border-b",
        scrolled ? "bg-white shadow-sm" : "bg-white"
      )}>
        {({ open }) => (
          <>
            <div className="container-custom">
              <div className="flex h-16 justify-between">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center gap-2">
                    <ChartBarIcon className="h-8 w-8 text-[#003366]" />
                    <div>
                      <div className="text-xl font-bold text-[#003366]">Financial Manager</div>
                      <div className="text-xs text-[#4b5563]">Career Resources & Professional Tools</div>
                    </div>
                  </Link>
                </div>

                <div className="hidden sm:ml-16 sm:flex sm:items-center sm:space-x-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "px-3 py-2 text-sm font-medium border-b-2",
                          isActive
                            ? "border-[#003366] text-[#003366]" 
                            : "border-transparent text-gray-700 hover:border-gray-300 hover:text-[#1a4480]"
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1a4480] sm:text-sm sm:leading-6"
                      placeholder="Search..."
                    />
                  </div>
                  
                  {status === 'authenticated' ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4480] focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          {session?.user?.image ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={session.user.image}
                              alt={`${session.user.name}'s profile`}
                            />
                          ) : (
                            <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <div className="font-medium">{session?.user?.name}</div>
                            <div className="truncate">{session?.user?.email}</div>
                          </div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/dashboard"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/dashboard/settings"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        href="/auth/signin"
                        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-[#003366] hover:bg-gray-50 border border-[#003366]"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="rounded-md bg-[#003366] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#1a4480]"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-50">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden bg-white shadow-lg">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        isActive
                          ? "bg-[#f0f4f8] text-[#003366]" 
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}

                <div className="pt-4 pb-2">
                  <div className="flex items-center px-3">
                    <div className="pointer-events-none flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="search"
                      name="mobile-search"
                      id="mobile-search"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#1a4480] sm:text-sm sm:leading-6"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                {status === 'authenticated' ? (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center px-3">
                      {session?.user?.image ? (
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={session.user.image}
                            alt={`${session.user.name}'s profile`}
                          />
                        </div>
                      ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
                      )}
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
                        <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as="a"
                        href="/dashboard"
                        className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Settings
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="button"
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2 px-3">
                    <Link
                      href="/auth/signin"
                      className="block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-medium text-[#003366] shadow-sm border border-[#003366]"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full rounded-md bg-[#003366] px-3 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-[#1a4480]"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
} 