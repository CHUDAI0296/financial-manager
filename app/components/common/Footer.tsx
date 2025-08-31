"use client";

import Link from 'next/link';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const navigation = {
  resources: [
    { name: 'Career Planning', href: '/career' },
    { name: 'Skills Development', href: '/education' },
    { name: 'Financial Tools', href: '/tools' },
    { name: 'Industry News', href: '/news' },
    { name: 'Certifications', href: '/education/certifications' },
  ],
  support: [
    { name: 'Documentation', href: '/docs' },
    { name: 'User Guides', href: '/guides' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Glossary', href: '/glossary' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' },
    { name: 'Careers', href: '/careers' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: React.ComponentProps<'svg'>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ],
};

const quickLinks = [
  { name: 'Find a Financial Manager Job', href: '/career/jobs' },
  { name: 'Professional Development', href: '/education/development' },
  { name: 'Budget Calculator', href: '/tools/budget-calculator' },
  { name: 'Industry Reports', href: '/reports' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Quick links section */}
      <div className="bg-[#f0f4f8]">
        <div className="container-custom py-8">
          <div className="text-center sm:text-left">
            <h3 className="text-base font-semibold text-[#003366]">Quick Links</h3>
            <div className="mt-4 grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm text-gray-700 hover:text-[#003366]">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="bg-[#003366] text-white">
        <div className="container-custom pt-12 pb-8">
          <div className="xl:grid xl:grid-cols-4 xl:gap-8">
            <div className="space-y-6 xl:col-span-1">
              <Link href="/" className="flex items-center">
                <ChartBarIcon className="h-10 w-10 text-white" />
                <div className="ml-3">
                  <div className="text-lg font-bold">Financial Manager</div>
                  <div className="text-xs text-gray-300">Career Resources & Professional Tools</div>
                </div>
              </Link>
              <p className="text-sm leading-6 text-gray-300">
                Helping financial managers advance their careers with expert guidance, resources, and tools based on authoritative information.
              </p>
              <div className="flex space-x-5">
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href} className="text-gray-300 hover:text-white">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" width="24" height="24" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {navigation.resources.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {navigation.support.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-xs leading-5 text-gray-400 md:order-1">
              &copy; {currentYear} Financial Manager. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
              <span className="text-gray-600">|</span>
              <Link href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link>
              <span className="text-gray-600">|</span>
              <Link href="/accessibility" className="text-gray-400 hover:text-white">Accessibility</Link>
              <span className="text-gray-600">|</span>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
            <p className="mt-4 md:mt-0 text-xs text-gray-400">
              This website contains information sourced from the Bureau of Labor Statistics.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 