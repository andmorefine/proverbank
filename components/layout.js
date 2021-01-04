import Head from 'next/head'
import { NextSeo } from 'next-seo';

import Header from './header'
import Footer from './footer'
import styles from '../styles/Home.module.scss'
import { GA_TRACKING_ID } from '../lib/gtag'

export default function Layout({ children, title }) {
  const defaultTitle = '青空漫画 - 無料コミック漫画'
  const headTitle = title ? `${title} | ${defaultTitle}` : defaultTitle

  return (
    <>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
        <title>{headTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/*-- ファビコン --*/}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>
      <NextSeo
        title={headTitle}
        description="無料WEB漫画が全巻読み放題！無料＆登録不要で漫画（マンガ）が読めます。"
      />

      <Header />

      <div className={styles.container}>
        {children}
      </div>

      <Footer />
    </>
  )
}
