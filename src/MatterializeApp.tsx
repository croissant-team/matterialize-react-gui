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
import ResponseToast from './components/ResponseToast'

const MatterializeApp: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <WebcamCapture/>
            <RecordingIndicator />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <RecordingButton/> 
            &nbsp;
            &nbsp;
            <CleanPlateCapture/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <WebcamSelector/>
            &nbsp;
            &nbsp;
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
        <br />
        <ResponseToast />
      </Container>
    </div>
  )
}

export default MatterializeApp
