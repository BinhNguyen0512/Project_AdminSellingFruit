import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'
import {login} from '../../slice/userSlice'

const Signin = () => {

  const dispatch = useDispatch();
  const authenticate = useSelector(state => state.user.authenticate)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')



  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email, password
    }
    dispatch(login(user))
  }

  if( authenticate){
    return <Navigate to="/" />
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit = {(e) => userLogin(e)}>
              <Input
                label={'Email'}
                type={'email'}
                placeholder={'manhbinh99@gmail.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />


              <Input
                label={'Password'}
                type={'password'}
                placeholder={'*********'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </Layout>
  )
}

export default Signin
