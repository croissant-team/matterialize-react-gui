import './App.css'
import { Col, Container, Hidden, Row, Visible } from 'react-grid-system'
import React from 'react'
import CleanPlateCapture from './components/CleanPlateCapture'
import MatterSelector from './components/MatterSelector'
import WebcamSelector from './components/WebcamSelector'
import WebcamCapture from './components/WebcamCapture'
import BackgroundSelector from './components/BackgroundSelector'
import RecordingIndicator from './components/RecordingIndicator'
import RecordingButton from './components/RecordingButton'
import ResponseToast from './components/ResponseToast'
import ConfigEditor from './components/ConfigEditor'

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
            <Visible sm xs>
              <br />
              <br />
            </Visible>
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
        <br />
        <Row>
          <Col>
            <ConfigEditor />
          </Col>
        </Row>
        <br/>
        <br />
        <ResponseToast />
      </Container>
    </div>
  )
}

// matters/benchmark

export default MatterializeApp
