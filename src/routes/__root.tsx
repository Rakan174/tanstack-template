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
        title: 'Goldex — أسعار الذهب اليوم في مصر | Gold Prices in Egypt (EGP)',
      },
      {
        name: 'description',
        content: 'أسعار الذهب لحظة بلحظة بالجنيه المصري. تابع أسعار عيار 24 و21 و18 والجنيه الذهب والأونصة. Real-time gold prices in Egyptian Pounds.',
      },
      {
        name: 'og:title',
        content: 'Goldex — أسعار الذهب اليوم في مصر',
      },
      {
        name: 'og:description',
        content: 'تابع أسعار الذهب لحظة بلحظة بالجنيه المصري. Live gold prices in EGP.',
      },
      {
        name: 'theme-color',
        content: '#0a0a0f',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
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
    <html lang="en" dir="ltr">
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
