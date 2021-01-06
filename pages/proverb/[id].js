import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT, IMAGE_URL } from '../../constants/ConstantsList'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// post：getStaticPropsから取得したデータ
const ProverbDetail = ({ posts }) => {
  return (
    <Layout title={posts ? posts.proverb.name : ''}>
      {posts ? (<>
        <Container>
          <h3>{posts.proverb.kana}</h3>
          <h1>{posts.proverb.name}</h1>
          <p>{posts.proverb.text}</p>
          {posts.proverb.image ? (<img src={`${IMAGE_URL}/${posts.proverb.image}`} />) : (<></>)}
          <Row>
            {posts.others.map((proverb) => (
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
          {posts.alphabetals.map((alphabetal) => (
            <li className="m-1" key={alphabetal.id}>
              <Button href={`/alphabetal/${alphabetal.id}`} variant="outline-dark">{alphabetal.name}</Button>
            </li>
          ))}
        </ul>
      </>) : (<></>)}
      <Link href="/proverb">
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
