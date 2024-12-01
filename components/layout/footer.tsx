import * as React from "react"
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-primary p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-primary-foreground sm:text-xl">
            Get Access To Full Database For FREE! (Over 1,394+ Posts)
          </strong>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground bg-primary-foreground px-8 py-3 text-primary hover:bg-transparent hover:text-primary-foreground focus:outline-none focus:ring active:bg-primary-foreground/90"
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
            <p className="text-lg font-medium text-foreground">X (Twitter)</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link 
                  href="/best-x-posts" 
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  Best X Posts To Swipe
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-x-posts/justin-welsh" 
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  Best Justin Welsh Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-x-posts/tim-denning" 
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  Best Tim Denning Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-x-posts/alex-hormozi" 
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  Best Alex Hormozi Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-x-posts/tiago-forte" 
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  Best Tiago Forte Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* LinkedIn Section */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">LinkedIn</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <span className="text-muted-foreground/75">
                  All LinkedIn Posts
                  <span className="ml-2 text-muted-foreground/60">(Coming soon)</span>
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/75">
                  Best Justin Welsh Posts
                  <span className="ml-2 text-muted-foreground/60">(Coming soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Substack Section */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-foreground">Substack</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <span className="text-muted-foreground/75">
                  All Substack Posts
                  <span className="ml-2 text-muted-foreground/60">(Coming soon)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="mt-16 sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center sm:justify-start">
              <Link href="/" className="text-xl font-bold text-foreground">
                Social Swipe Deck
              </Link>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground sm:mt-0 sm:text-right">
              Copyright &copy; {new Date().getFullYear()}. All rights reserved.{" "}
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground"
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