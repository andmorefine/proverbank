import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT } from '../../constants/ConstantsList'
import Pagination from '../../components/pagination'

// posts：getStaticPropsで取得したデータを受け取る
const Home = ({ posts }) => {
  return (
    <Layout title="書籍一覧">
      <h1>書籍一覧</h1>
      <ul>
        {posts.books.map((book) => (
          <li key={book.id}>
            {/* リンク先を指定 */}
            <Link href={`/books/${book.id}`}>
              <a>{book.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination link='books' pagination={posts.pagination} />
    </Layout>
  )
}

// ビルド時にデータを取得し静的なファイルを事前に生成
export const getStaticProps = async () => {
  const res = await fetch(`${END_POINT}/books`)
  const error = { books: [], pagination: {} }
  const posts = (res.status != 200) ? error : await res.json()
  return { props: { posts } }
}

export default Home
