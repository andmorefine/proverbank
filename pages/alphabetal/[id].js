import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT, IMAGE_URL } from '../../constants/ConstantsList'

// post：getStaticPropsから取得したデータ
const AlphabetalDetail = ({ posts }) => {
  return (
    <Layout title={posts ? `「${posts.alphabetal.name}」から始まることわざ` : ''}>
      {posts ? (<>
        <h1>「{posts.alphabetal.name}」から始まることわざ（{posts.proverbs_total_count}件）</h1>
        <ul className="proverb_list">
          {posts.proverbs.map((proverb) => (
            <li key={proverb.id}>
              {proverb.image ? (<img src={`${IMAGE_URL}/${proverb.image}`} />) : (<></>)}
              <Link href={`/proverb/${proverb.id}`}>
                <a>{proverb.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="alphabetal_list">
          {posts.m_alphabetals.map((alphabetal) => (
            <li key={alphabetal.id}>
              <Link href={`/alphabetal/${alphabetal.id}`}>
                <a>{alphabetal.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </>) : (<></>)}
      <Link href="/alphabetal/">
        <a>Back</a>
      </Link>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch(`${END_POINT}/alphabetal`)
  const error = { proverb_count: null }
  const posts = (res.status != 200) ? error : await res.json()

  const paths = posts.alphabetals.map((value) => ({
    params: {
      id: value.id.toString(),
    },
  }))
  return { paths, fallback: false }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${END_POINT}/alphabetal/${params.id}`)
  const error = { message: res.status }
  const posts = (res.status != 200) ? error : await res.json()

  return { props: { posts } }
}

export default AlphabetalDetail
