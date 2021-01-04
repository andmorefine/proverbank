import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Pagination = ({ link, pagination }) => {

  return (
    <>
      <ul className={styles.pagination}>
        {pagination.prev_page ? (
          <li>
          <Link href={`/${link}/page/1`}>
            <a>frist</a>
          </Link>
        </li>) : (<></>)}
        {pagination.prev_page ? (
          <li>
          <Link href={`/${link}/page/${pagination.prev_page}`}>
            <a>prev</a>
          </Link>
        </li>) : (<></>)}
        {pagination.current_page - 2 > 0 ? (
          <li>
          <Link href={`/${link}/page/${pagination.current_page - 2}`}>
            <a>{pagination.current_page - 2}</a>
          </Link>
        </li>) : (<></>)}
        {pagination.current_page - 1 > 0 ? (
          <li>
          <Link href={`/${link}/page/${pagination.current_page - 1}`}>
            <a>{pagination.current_page - 1}</a>
          </Link>
        </li>) : (<></>)}
        <li>
          <span>{pagination.current_page}</span>
        </li>
        {pagination.current_page + 1 < pagination.total_pages ? (
          <li>
          <Link href={`/${link}/page/${pagination.current_page + 1}`}>
            <a>{pagination.current_page + 1}</a>
          </Link>
        </li>) : (<></>)}
        {pagination.current_page + 2 < pagination.total_pages ? (
          <li>
          <Link href={`/${link}/page/${pagination.current_page + 2}`}>
            <a>{pagination.current_page + 2}</a>
          </Link>
        </li>) : (<></>)}
        {pagination.next_page ? (
          <li>
          <Link href={`/${link}/page/${pagination.next_page}`}>
            <a>next</a>
          </Link>
        </li>) : (<></>)}
        {pagination.total_pages && pagination.current_page != pagination.total_pages ? (
          <li>
          <Link href={`/${link}/page/${pagination.total_pages}`}>
            <a>last</a>
          </Link>
        </li>) : (<></>)}
      </ul>
      <div>{pagination.total_count}件</div>
    </>
  )
}

export default Pagination
