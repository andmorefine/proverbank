import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT, IMAGE_URL } from '../../constants/ConstantsList'

// post：getStaticPropsから取得したデータ
const ProverbDetail = ({ posts }) => {
  return (
    <Layout title={posts ? posts.proverb.name : ''}>
      {posts ? (<>
        <h3>{posts.proverb.kana}</h3>
        <h1>{posts.proverb.name}</h1>
        <p>{posts.proverb.text}</p>
        {posts.proverb.image ? (<img src={`${IMAGE_URL}/${posts.proverb.image}`} />) : (<></>)}
        <ul className="proverb_list">
          {posts.others.map((item) => (
            <li key={item.id}>
              {item.image ? (<img src={`${IMAGE_URL}/${item.image}`} />) : (<></>)}
              <Link href={`/proverb/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="alphabetal_list">
          {posts.alphabetals.map((alphabetal) => (
            <li key={alphabetal.id}>
              <Link href={`/alphabetal/${alphabetal.id}`}>
                <a>{alphabetal.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </>) : (<></>)}
      <Link href="/proverb/">
        <a>Back</a>
      </Link>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch(`${END_POINT}/top`)
  const error = { proverb_count: null }
  const posts = (res.status != 200) ? error : await res.json()

  const proverb_count = Array.from({ length: posts.proverb_count }, (_, i) => i);
  const paths = proverb_count.map((value) => ({
    params: {
      id: (value + 1).toString(),
    },
  }))
  return { paths, fallback: false }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${END_POINT}/proverb/${params.id}`)
  const error = { message: res.status }
  const posts = (res.status != 200) ? error : await res.json()

  return { props: { posts } }
}

export default ProverbDetail
