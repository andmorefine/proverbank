import Layout from '../../components/layout'
import { Container } from 'react-bootstrap';

const AlphabetalDetail = () => {
  return (
    <Layout title="お問い合わせ">
      <Container>
        <h1 className="text-center my-3">お問い合わせ</h1>
        <p>お問い合わせをお受けしました。</p>
        <p>ご入力いただいた返信用メールアドレスに受付完了メールをお送りしております。<br />
        メールが届かない場合は、お問い合わせ内容の送信が完了していないことがございます。<br />
        メールアドレスの記載にお間違えがないか確認し、再度お問い合わせください。</p>
        <p>スタッフが確認次第、順次対応いたしますが、<br />
        お問い合わせ内容や混雑状況により、ご連絡を差し上げるまでに<br />
        お時間がかかる場合がございます。<br />あらかじめご了承いただきますようお願いいたします。</p>
        <div className="row mt-2 justify-content-center">
          <a className="btn btn-outline-secondary" href="/">HOMEへ戻る</a>
        </div>
      </Container>
    </Layout>
  )
}

export default AlphabetalDetail
