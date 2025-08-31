"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChartBarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Career Guide', href: '/career' },
  { name: 'Education', href: '/education' },
  { name: 'Financial Tools', href: '/tools' },
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
                  
                  <Link
                    href="/login"
                    className="btn-primary"
                  >
                    Login
                  </Link>
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

                <div className="mt-4 px-3">
                  <Link
                    href="/login"
                    className="block w-full rounded-md bg-[#003366] px-3 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-[#1a4480]"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
} 