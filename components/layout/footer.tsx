import * as React from "react"
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-white sm:text-xl">
            Get Access To Full Database For FREE! (Over 1,394+ Posts)
          </strong>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
            href="/sign-up"
          >
            <span className="text-xl font-medium">Sign Up</span>

            <svg
              className="size-4 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* X (Twitter) Section */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">X (Twitter)</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link 
                  href="/best-justin-welsh-x-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Justin Welsh Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-dan-koe-x-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Dan Koe Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-morgan-housel-x-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Morgan Housel Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-tim-denning-x-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Tim Denning Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-tim-ferriss-x-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Tim Ferriss Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-naval-x-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Naval Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* LinkedIn Section */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">LinkedIn</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link 
                  href="/best-justin-welsh-linkedin-posts" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Best Justin Welsh Posts
                  <span className="ml-2 text-gray-400">(Coming soon)</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/platform/linkedin" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  View All LinkedIn Posts
                  <span className="ml-2 text-gray-400">(Coming soon)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Substack Section */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-900">Substack</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link 
                  href="/platform/substack" 
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  View All Substack Posts
                  <span className="ml-2 text-gray-400">(Coming soon)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="mt-16 sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center sm:justify-start">
              <Link href="/" className="text-xl font-bold text-black">
                Social Swipe Deck
              </Link>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
              Copyright &copy; {new Date().getFullYear()}. All rights reserved.{" "}
              <Link 
                href="/terms" 
                className="text-gray-500 hover:text-gray-700"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}