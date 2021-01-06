import Link from 'next/link'
import Layout from '../../components/layout'
import { END_POINT, IMAGE_URL } from '../../constants/ConstantsList'

import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const Proverb = ({ posts }) => {
  return (
    <Layout title="ことわざ一覧">
      <h1>ことわざ一覧</h1>
      <Container>
        <Row>
          {posts.proverbs.map((proverb) => (
            <Col key={proverb.id} xs={6} md={4} className="my-2">
              <Card>
                <Card.Img variant="top" src={`${IMAGE_URL}/${proverb.image}`} />
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
    </Layout>
  )
}

// ビルド時にデータを取得し静的なファイルを事前に生成
export const getStaticProps = async () => {
  const res = await fetch(`${END_POINT}/proverb`)
  const error = { proverbs: [], alphabetals: [] }
  const posts = (res.status != 200) ? error : await res.json()
  return { props: { posts } }
}

export default Proverb
