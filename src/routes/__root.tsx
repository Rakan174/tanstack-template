import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { ConvexClientProvider } from '../convex'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'NexusAI — AI-Powered Content Tools for Business',
      },
      {
        name: 'description',
        content: 'Generate blogs, ads, emails, social posts and more with AI. 8 specialized tools, 50,000+ users. Start free today.',
      },
      {
        name: 'og:title',
        content: 'NexusAI — 10x Your Content with AI',
      },
      {
        name: 'og:description',
        content: 'Generate professional content in seconds with our AI-powered toolkit.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
