import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import WebcamCapture from "./components/WebcamCapture";
import FileSelector from './components/FileSelector';
import MatterSelector from './components/MatterSelector';
import WebcamSelector from './components/WebcamSelector';
import { Container, Row, Col } from 'react-grid-system';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        <Button color="primary">Hello World</Button>
      </header> */}
      <Container>
        <Row>
          <Col sm={12}>
            <WebcamCapture />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <FileSelector />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <MatterSelector />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <WebcamSelector />
          </Col>
        </Row>
      </Container>



    </div>
  );
}

export default App;
