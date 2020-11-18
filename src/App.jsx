import './App.css'
import { Col, Container, Row } from 'react-grid-system'
import React from 'react'
import FileSelector from './components/FileSelector'
import ClearBackground from './components/ClearBackground'
import CleanPlateCapture from './components/CleanPlateCapture'
import MatterSelector from './components/MatterSelector'
import WebcamSelector from './components/WebcamSelector'
import WebcamCapture from './components/WebcamCapture'

function App () {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={12}>
            <WebcamCapture/>
          </Col>
        </Row>
        <br/>
        <br/>
        <Row>
          <Col>
            <WebcamSelector/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <MatterSelector/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <FileSelector/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <CleanPlateCapture/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <ClearBackground/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
