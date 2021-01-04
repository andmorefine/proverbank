import Link from 'next/link'
import Layout from '../components/layout'
import { END_POINT, IMAGE_URL } from '../constants/ConstantsList'

const Home = ({ posts }) => {
  return (
    <Layout title="タグ一覧">
      <h1>ことわざ【諺】</h1>
      <ul className="top">
        <li>
          <img src={`${IMAGE_URL}/${posts.proverb_image}`} />
          <h4>ことわざ【諺】</h4>
          <p>昔から言い伝えてきた、訓戒・風刺などを内容とする短い句</p>
          <Link href={`/proverb/`}>
            <a>ことわざ（全:{posts.proverb_count}件）</a>
          </Link>
        </li>
        {posts.proverb_radom.map((proverb) => (
          <li key={proverb.id}>
            <img src={`${IMAGE_URL}/${proverb.image}`} />
            <Link href={`/proverb/${proverb.id}`}>
              <a>{proverb.name}</a>
            </Link>
          </li>
        ))}
        <li>
          <img src='https://d2y9vn9mruehfd.cloudfront.net/img/stickers/main.png' />
          <h4>全力変顔</h4>
          <p>暇な時。楽しい時。嬉しい時。つまらない時。寂しい時。悲しい時。このスタンプを使って友達を笑わせましょう♪</p>
          <Link href='//store.line.me/stickershop/product/1011010/ja' target="_blank">
            <a>LINEスタンプ</a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${END_POINT}/top`)
  const error = { proverb_radom: [] }
  const posts = (res.status != 200) ? error : await res.json()
  return { props: { posts } }
}

export default Home
