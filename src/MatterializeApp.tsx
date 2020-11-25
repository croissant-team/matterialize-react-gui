import './App.css'
import { Col, Container, Row } from 'react-grid-system'
import React from 'react'
import CleanPlateCapture from './components/CleanPlateCapture'
import MatterSelector from './components/MatterSelector'
import WebcamSelector from './components/WebcamSelector'
import WebcamCapture from './components/WebcamCapture'
import BackgroundSelector from './components/BackgroundSelector'
import RecordingIndicator from './components/RecordingIndicator'
import RecordingButton from './components/RecordingButton'

const MatterializeApp: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={12}>
            <WebcamCapture/>
            <RecordingIndicator />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <RecordingButton/>
          </Col>
        </Row>
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
            <BackgroundSelector />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <CleanPlateCapture/>
          </Col>
        </Row>
        <br />
      </Container>
    </div>
  )
}

export default MatterializeApp
