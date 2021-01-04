import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import Layout from '../../../../components/layout'
import styles from '../../../../styles/BookDetail.module.scss'
import { END_POINT, IMAGE_URL } from '../../../../constants/ConstantsList'

import contents from '../../../../contents/books_volumes.json'

// post：getStaticPropsから取得したデータ
const VolumeDetail = ({ volume }) => {
  return (
    <Layout title={volume ? (`${volume.book_name} | ${volume.name}`) : ''}>
      {volume ? (<>
      <h2>【{volume.book_name}】{volume.name}: {volume.last_page}ページ</h2>
      {(() => {
        const items = [];
        for (let i = 1; i <= volume.last_page; i++) {
          items.push(<li key={i}>
            <LazyLoad width="50" height="50" once>
              <img src={`${IMAGE_URL}/${volume.book_name}/${volume.name}/${i}.jpg`} alt='' />
            </LazyLoad>
          </li>)
        }
          return <ul className={styles.detail}>{ items }</ul>;
        })()}
      <Link href={`/books/${volume.book_id}`}>
        <a>Back</a>
      </Link>
      </>) : (<></>)}
    </Layout>
  )
}

// https://image-bank-com.s3-ap-northeast-1.amazonaws.com/ximage/だがしかし/第01巻/1.jpg

export const getStaticPaths = async () => {
  // const res = await fetch(`${END_POINT_LOCAL}/books/volumes`)
  // const posts = (res.status != 200) ? [] : await res.json()
  const posts = contents

  const paths = posts.flatMap((book) => (
    book.volume_ids.map((volume) => ({
      params: {
        id: book.id.toString(),
        volume_id: volume.toString(),
      }
    }))
  ))

  return { paths, fallback: false }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps = async ({ params }) => {  
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`${END_POINT}/books/${params.id}/volumes/${params.volume_id}`)

  const error = { message: res.status }
  const volume = (res.status != 200) ? error : await res.json()

  // ページコンポーネントにpropsとしてに渡す
  return {
    revalidate: 1,
    props: {
      volume
    },
  }
}

export default VolumeDetail
