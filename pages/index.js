import Layout from '../components/layout'
import { END_POINT, IMAGE_URL } from '../constants/ConstantsList'

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = ({ posts }) => {
  return (
    <Layout title="タグ一覧">
      <h1>ことわざ【諺】</h1>
      <Container>
        <Row>
          <Col xs={12} md={6} className="my-2">
            <Card>
              <Card.Img variant="top" src={`${IMAGE_URL}/${posts.proverb_image}`} />
              <Card.Body>
                <Card.Title>ことわざ【諺】</Card.Title>
                <Card.Text>昔から言い伝えてきた、訓戒・風刺などを内容とする短い句</Card.Text>
                <Button href={`/proverb/`} variant="primary">ことわざ（全:{posts.proverb_count}件）</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="my-2">
            <Card>
              <Card.Img variant="top" src='https://d2y9vn9mruehfd.cloudfront.net/img/stickers/main.png' />
              <Card.Body>
                <Card.Title>全力変顔</Card.Title>
                <Card.Text>暇な時。楽しい時。嬉しい時。つまらない時。寂しい時。悲しい時。このスタンプを使って友達を笑わせましょう♪</Card.Text>
                <Button variant="warning" as="a" href='//store.line.me/stickershop/product/1011010/ja' target="_blank">LINEスタンプ</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {posts.proverb_radom.map((proverb) => (
            <>
            <Col key={proverb.id} xs={12} md={4} className="my-2">
              <Card>
                <Card.Img variant="top" src={`${IMAGE_URL}/${proverb.image}`} />
                <Card.Body>
                  <Button href={`/proverb/${proverb.id}`} variant="outline-primary">{proverb.name}</Button>
                </Card.Body>
              </Card>
            </Col>
            </>
          ))}
        </Row>
      </Container>
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
