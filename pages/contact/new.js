import { useState } from 'react';
import Layout from '../../components/layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { END_POINT } from '../../constants/ConstantsList'

import { Form, Button, Container } from 'react-bootstrap';

const AlphabetalDetail = () => {
  const router = useRouter()

  const state = {
    name: '',
    email: '',
    subject: '',
    body: '',
  }
  const [contact, setContact] = useState(state);

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setContact({...contact, name: e.target.value})
        break;
      case 'email':
        setContact({...contact, email: e.target.value})
        break;
      case 'subject':
        setContact({...contact, subject: e.target.value})
        break;
      case 'body':
        setContact({...contact, body: e.target.value})
        break;
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(contact)

    console.log('The link was clicked.');

    axios.post(`${END_POINT}/contact`, { contact })
      .then(res => {
        router.push('/contact/thanks')
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        // always executed
      })
  }

  return (
    <Layout title="お問い合わせ">
      <Container>
        <h1>お問い合わせ</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="mt-2">名前</Form.Label>
            <Form.Control type="text" name="name" value={contact.name} onChange={handleChange} />
            <Form.Label className="mt-2">メールアドレス</Form.Label>
            <Form.Control type="email" name="email" value={contact.email} onChange={handleChange} />
            <Form.Label className="mt-2">件名</Form.Label>
            <Form.Control type="text" name="subject" value={contact.subject} onChange={handleChange} />
            <Form.Label className="mt-2">お問い合わせ本文</Form.Label>
            <Form.Control as="textarea" rows={3} name="body" value={contact.body} onChange={handleChange} />
          </Form.Group>
          <Button variant="success" type="submit">
            送信
          </Button>
        </Form>
      </Container>
    </Layout>
  )
}

export default AlphabetalDetail
