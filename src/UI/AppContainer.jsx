import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const AppContainer = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  )
}

export default AppContainer
