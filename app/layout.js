import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PreSQ Innovation: Elevate Your Web Presence',
  description:
    'Transform Your Business with PreSQ. Expert Web Development, SEO, and Digital Marketing Services Tailored for Your Success.',
  keywords:
    'presq, presq innovations, pre, p, r, e, web development, seo, digital marketing, web design, web development company, web development services, web development agency, web development company in india, presq, presq innovation, presq innovation pvt. ltd., agency',
  shortcutIcon: '/images/logo.png',
  appleIcon: '/images/logo.png',

  // Open Graph
  ogTitle: 'PreSQ: Elevate Your Web Presence',
  ogDescription:
    'Transform Your Business with PreSQ. Expert Web Development, SEO, and Digital Marketing Services Tailored for Your Success.',
  ogImage: '/images/logo.png',
  ogUrl: 'https://presq.in',
  ogShortcutIcon: '/images/logo.png',
  ogAppleIcon: '/images/logo.png'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        {/* <!-- Google Tag Manager --> */}
        <Script id="show-banner">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-543T9HRF');`}</Script>
        {/* <!-- End Google Tag Manager --> */}

        <Script id="show-banner">{`https://assets.calendly.com/assets/external/widget.js`}</Script>

        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
          sizes="any"
        />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />
        <meta
          property="og:image:type"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />
        <meta
          property="og:image:width"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />
        <meta
          property="og:image:height"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />

        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />
        <meta
          name="twitter:image:type"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />
        <meta
          name="twitter:image:width"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />
        <meta
          name="twitter:image:height"
          content="https://firebasestorage.googleapis.com/v0/b/presq-2794f.appspot.com/o/favicon.ico?alt=media&token=4915414a-d76f-4deb-8d18-15dfc0989825"
        />

        <meta property="og:image:alt" content="Presq Innovation" />
        <meta property="twitter:image:alt" content="Presq Innovation" />

        <link rel="canonical" href="https://presq.in/contacts" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}