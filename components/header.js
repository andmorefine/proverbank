import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Header = () => (
  <header className={styles.header}>
    <ul>
      <li>
        <Link href="/">
          <a>andmorefine</a>
        </Link>
      </li>
      <li>
        <Link href="/proverb">
          <a>ことわざ一覧</a>
        </Link>
      </li>
      <li>
        <Link href="/alphabetal">
          <a>あいうえお一覧</a>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header
