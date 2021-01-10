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
import BenchmarkViewer from './components/BenchmarkViewer'

const MatterializeApp: React.FC = () => {
  return (
    <div className="App">
      <br />
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
      <br />
      <Row>
        <Col>
          <ConfigEditor />
        </Col>
      </Row>
      <Row>
        <Col>
          <BenchmarkViewer />
        </Col>
      </Row>
      <br />
      <br />
      <ResponseToast />
    </div>
  )
}

export default MatterializeApp
