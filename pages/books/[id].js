import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT } from '../../constants/ConstantsList'

// post：getStaticPropsから取得したデータ
const BookDetail = ({ book }) => {
  return (
    <Layout title={book ? book.name : ''}>
      {book ? (<>
        <h1>{book.id}: {book.name}</h1>
        <p>{book.updated}</p>
        <h2>巻数</h2>
        <ul>
          {book.volumes_sort.map((volume) => (
            <li key={volume.id}>
              <Link href={`/books/${book.id}/volumes/${volume.id}`}>
                <a>{volume.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <h2>タグ</h2>
        <ul>
          {book.image_bank_tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/tags/${tag.id}`}>
                <a>{tag.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </>) : (<></>)}
      <Link href="/books/">
        <a>Back</a>
      </Link>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`${END_POINT}/books`)
  const error = { books: [], pagination: {} }
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
  const res = await fetch(`${END_POINT}/books/${params.id}`)

  const error = { message: res.status }
  const book = (res.status != 200) ? error : await res.json()

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      book
    },
  }
}

export default BookDetail
