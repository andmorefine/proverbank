import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT } from '../../constants/ConstantsList'

const AuthorDetail = ({ author }) => {
  return (
    <Layout title={author ? author.name : ''}>
      {author ? (<>
        <h1>作者: {author.name}</h1>
        <h2>書籍</h2>
        <ul>
          {author.image_bank_books.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>
                <a>{book.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </>) : (<></>)}
      <Link href="/authors/">
        <a>Back</a>
      </Link>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`${END_POINT}/authors`)
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
  const res = await fetch(`${END_POINT}/authors/${params.id}`)
  const error = { message: res.status }
  const author = (res.status != 200) ? error : await res.json()

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      author
    },
    revalidate: 1,
  }
}

export default AuthorDetail
