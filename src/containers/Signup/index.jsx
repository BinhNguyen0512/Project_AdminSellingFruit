import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../slice/userSlice'

const Signup = () => {
  const authenticate = useSelector(state => state.user.authenticate)
  const message =  useSelector(state => state.user.message)
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [error, setError] = useState()
  const userSignup = (e) => {
    e.preventDefault()
    const user = { firstName, lastName, email, password, phone, address}
    dispatch(signup(user))
  }

  if( authenticate){
    return <Navigate to="/" />
  }
  return (
    <Layout>
      <Container>
        {message}
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit = {(e) => userSignup(e)}>
              <Row>
                <Col md={6}>
                  <Input
                    label={'First Name'}
                    type={'text'}
                    value={firstName}
                    placeholder={'First Name'}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label={'Last Name'}
                    type={'text'}
                    placeholder={'Last Name'}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                </Col>
              </Row>
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
              <Col md={12}>
                  <Input
                    label={'Phone'}
                    type={'text'}
                    placeholder={'0981376700'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Col>
                <Col md={12}>
                  <Input
                    label={'Address'}
                    type={'text'}
                    placeholder={'97 Man thiện, phường Hiệp Phú, Quận 9'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>
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

export default Signup
