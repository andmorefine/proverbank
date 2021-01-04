import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span>Welcome to </span>
          <Link href="/books/">
            <a>青空漫画</a>
          </Link>
        </h1>
      </main>
    </Layout>
  )
}
