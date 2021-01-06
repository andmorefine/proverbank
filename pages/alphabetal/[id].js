import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT, IMAGE_URL } from '../../constants/ConstantsList'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// post：getStaticPropsから取得したデータ
const AlphabetalDetail = ({ posts }) => {
  return (
    <Layout title={posts ? `「${posts.alphabetal.name}」から始まることわざ` : ''}>
      {posts ? (<>
        <Container>
          <h1 className="h4">「{posts.alphabetal.name}」から始まることわざ（{posts.proverbs_total_count}件）</h1>
          <Row>
            {posts.proverbs.map((proverb) => (
              <Col key={proverb.id} xs={6} md={4} className="my-2">
                <Card>
                  {proverb.image ? (<Card.Img variant="top" src={`${IMAGE_URL}/${proverb.image}`} />) : (<></>)}
                  <Card.Body>
                    <Button href={`/proverb/${proverb.id}`} variant="outline-primary">{proverb.name}</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <ul className="alphabetal_list">
          {posts.m_alphabetals.map((alphabetal) => (
            <li className="m-1" key={alphabetal.id}>
              <Button href={`/alphabetal/${alphabetal.id}`} variant="outline-dark">{alphabetal.name}</Button>
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
