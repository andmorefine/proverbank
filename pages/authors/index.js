import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT } from '../../constants/ConstantsList'
import Pagination from '../../components/pagination'

// posts：getStaticPropsで取得したデータを受け取る
const Home = ({ posts }) => {
  return (
    <Layout title="作者一覧">
      <h1>作者一覧</h1>
      <ul>
        {posts.authors.map((author) => (
          <li key={author.id}>
            {/* リンク先を指定 */}
            <Link href={`/authors/${author.id}`}>
              <a>{author.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination link='authors' pagination={posts.pagination} />
    </Layout>
  )
}

// ビルド時にデータを取得し静的なファイルを事前に生成
export const getStaticProps = async () => {
  const res = await fetch(`${END_POINT}/authors`)
  const error = { authors: [], pagination: {} }
  const posts = (res.status != 200) ? error : await res.json()
  return { props: { posts } }
}

export default Home
