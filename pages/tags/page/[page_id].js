import Link from 'next/link'
import Layout from '../../../components/layout'
import { END_POINT } from '../../../constants/ConstantsList'
import Pagination from '../../../components/pagination'

// posts：getStaticPropsで取得したデータを受け取る
const Home = ({ posts, page_id }) => {
  return (
    <Layout title={`タグ一覧 | ${page_id}ページ`}>
      <h1>タグ一覧</h1>
      <ul>
        {posts.tags.map((tag) => (
          <li key={tag.id}>
            {/* リンク先を指定 */}
            <Link href={`/tags/${tag.id}`}>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination link='tags' pagination={posts.pagination} />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`${END_POINT}/tags`)
  const posts = await res.json()  
  const total_list = Array.from({ length: posts.pagination.total_pages }, (_, i) => i);
  // 事前ビルドしたいパスを指定
  const paths = total_list.map((value) => ({
    params: {
      page_id: (value + 1).toString(),
    },
  }))
  return { paths, fallback: false }
}

// ビルド時にデータを取得し静的なファイルを事前に生成
export const getStaticProps = async ({ params }) => {
  // 全記事データを取得
  const res = await fetch(`${END_POINT}/tags?page=${params.page_id}`)

  const error = { tags: [], pagination: {} }
  const posts = (res.status != 200) ? error : await res.json()
  const page_id = params.page_id

  // コンポーネントに渡すデータを指定
  return {
    props: {
      posts,
      page_id,
    },
  }
}

export default Home
