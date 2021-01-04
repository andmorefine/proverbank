import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT } from '../../constants/ConstantsList'

// post：getStaticPropsから取得したデータ
const TagDetail = ({ tag }) => {
  return (
    <Layout title={tag ? tag.tag.name : ''}>
      {tag ? (<>
      <h1>タグネーム: {tag.tag.name}</h1>
      <ul>
        {tag.list.books.map((book) => (
          <li key={book.id}>
            {/* リンク先を指定 */}
            <Link href={`/books/${book.id}`}>
              <a>{book.name}</a>
            </Link>
          </li>
        ))}
        </ul>
      </>) : (<></>)}
      <Link href="/tags/">
        <a>Back</a>
      </Link>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`${END_POINT}/tags`)
  const error = { authors: [], pagination: {} }
  const posts = (res.status != 200) ? error : await res.json()

  const total_list = Array.from({ length: posts.pagination.total_count }, (_, i) => i);
  const paths = total_list.map((value) => ({
    params: {
      id: (value + 1).toString(),
    },
  }))
  return { paths, fallback: false }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps = async ({ params }) => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`${END_POINT}/tags/${params.id}`)
  const error = { message: res.status }
  const tag = (res.status != 200) ? error : await res.json()

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      tag
    },
  }
}

export default TagDetail
