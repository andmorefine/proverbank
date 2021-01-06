import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT } from '../../constants/ConstantsList'

import { Button } from 'react-bootstrap';

const Alphabetal = ({ posts }) => {
  return (
    <Layout title="あいうえお一覧">
      <h1>あいうえお一覧</h1>
      <ul className="alphabetal_list">
        {posts.alphabetals.map((alphabetal) => (
          <li className="m-1" key={alphabetal.id}>
            <Button href={`/alphabetal/${alphabetal.id}`} variant="outline-dark">{alphabetal.name}</Button>
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
