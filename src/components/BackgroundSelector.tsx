import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Checkbox, Collapse, Container, FormControlLabel, Paper } from '@material-ui/core';
import FileSelector from './FileSelector';
import ScreenSelector from './ScreenSelector';
import BlurSlider from './BlurSlider';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';

const GREEN_SCREEN = 0
const FILE = 1
const DESKTOP = 2
const BLUR = 3

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const mapStateToProps = (state: RootState) => {
  return {
    selectedFile: state.fileReducer.file,
    selectedDesktop: state.desktopReducer.desktop
  }
}

const connector = connect(
  mapStateToProps,
  {}
)

type PropsFromRedux = ConnectedProps<typeof connector>
type BackgroundSelectorProps =  PropsFromRedux;

const BackgroundSelector: React.FC<BackgroundSelectorProps> = (props) => {
  const [value, setValue] = React.useState(0);
  const [showBackgrounds, setShowBackgrounds] = React.useState(true);

  const getFilePath = (file: File | undefined) => {
    if (file === undefined) {
      return "No file selected"
    } else {
      return (file as any).path
    }
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case GREEN_SCREEN:
        fetch('http://localhost:9000/background/clear/', {
          method: 'POST',
        })
        break;
      case FILE:

        if (props.selectedFile !== undefined) {
          const file = props.selectedFile as File
          const path = getFilePath(file)
  
          
          if (file.type.includes("video")) {
            fetch('http://localhost:9000/background/video', {
              method: 'POST',
              body: JSON.stringify({ file_path: path }),
            })
          } else if (file.type.includes("image")) {  
            fetch('http://localhost:9000/background/set', {
              method: 'POST',
              body: JSON.stringify({ file_path: path }),
            })
          }
        } 

        break;
      case DESKTOP:
        if (props.selectedDesktop !== "") {
          fetch("http://localhost:9000/background/desktop",  {
            method: 'POST',
            body: JSON.stringify({ desktop: props.selectedDesktop })
          })
        }
        break;
      case BLUR:
        fetch('http://localhost:9000/background/blur', {
          method: 'POST',
          body: JSON.stringify({ size: 63 }),
        })
        break;
    }
    // call endpoint to change it
  };


  const toggleBackgrounds = () => {
    setShowBackgrounds(!showBackgrounds)
  }

  return (
    <Container fixed maxWidth="md">
      <div
        style={{
            position: 'relative', left: '-35%'
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={showBackgrounds}
              onChange={toggleBackgrounds}
              name="backgroundsCheckbox"
              color="primary"
            />
          }
          label="Show background effects"
        />
      </div>

      <Collapse in={showBackgrounds}>
        <Paper square>
            <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Green Screen" {...a11yProps(GREEN_SCREEN)} />
            <Tab label="File" {...a11yProps(FILE)} />
            <Tab label="Screen Capture" {...a11yProps(DESKTOP)} />
            <Tab label="Blur" {...a11yProps(BLUR)} />
            </Tabs>
        <TabPanel value={value} index={GREEN_SCREEN}>
            Green Screen effect applied
        </TabPanel>
        <TabPanel value={value} index={FILE}>
            <FileSelector /> <br /> <br />
            Selected file: {getFilePath(props.selectedFile)}
        </TabPanel>
        <TabPanel value={value} index={DESKTOP}>
            <ScreenSelector />
        </TabPanel>
        <TabPanel value={value} index={BLUR}>
            <BlurSlider />
        </TabPanel>
        </Paper>
      </Collapse>
    </Container>
  );
}

export default connector(BackgroundSelector)