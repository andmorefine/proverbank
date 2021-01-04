import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Header = () => (
  <header className={styles.header}>
    <ul>
      <li>
        <Link href="/">
          <a>青空漫画</a>
        </Link>
      </li>
      <li>
        <Link href="/authors">
          <a>作者一覧</a>
        </Link>
      </li>
      <li>
        <Link href="/books" as="/books">
          <a>書籍一覧</a>
        </Link>
      </li>
      {/* <li>
        <Link href="/books/[id]" as="/books/1">
          <a>書籍一覧</a>
        </Link>
      </li> */}
      <li>
        <Link href="/tags" as="/tags">
          <a>タグ一覧</a>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header
