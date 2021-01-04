import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT, IMAGE_URL } from '../../constants/ConstantsList'

const Alphabetal = ({ posts }) => {
  return (
    <Layout title="あいうえお一覧">
      <h1>あいうえお一覧</h1>
      <ul className="alphabetal_list">
        {posts.alphabetals.map((alphabetal) => (
          <li key={alphabetal.id}>
            <Link href={`/alphabetal/${alphabetal.id}`}>
              <a>{alphabetal.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

// ビルド時にデータを取得し静的なファイルを事前に生成
export const getStaticProps = async () => {
  const res = await fetch(`${END_POINT}/alphabetal`)
  const error = { proverbs: [], alphabetals: [] }
  const posts = (res.status != 200) ? error : await res.json()
  return { props: { posts } }
}

export default Alphabetal
