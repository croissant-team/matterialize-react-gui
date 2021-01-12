import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Grid, Paper } from '@material-ui/core';
import FileSelector from './FileSelector';
import ScreenSelector from './ScreenSelector';
import BlurSlider from './BlurSlider';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { clearBackground, setBlurBackground, setImageBackground, setScreenCaptureBackground, setVideoBackground } from '../endpoints';

const GREEN_SCREEN = 0
const FILE = 1
const DESKTOP = 2
const BLUR = 3

const DEFAULT_BLUR_AMOUNT = 63

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
        fetch(clearBackground, {
          method: 'POST',
        })
        break;
      case FILE:

        if (props.selectedFile !== undefined) {
          const file = props.selectedFile as File
          const path = getFilePath(file)
  
          
          if (file.type.includes("video")) {
            fetch(setVideoBackground, {
              method: 'POST',
              body: JSON.stringify({ file_path: path }),
            })
          } else if (file.type.includes("image")) {  
            fetch(setImageBackground, {
              method: 'POST',
              body: JSON.stringify({ file_path: path }),
            })
          }
        } 

        break;
      case DESKTOP:
        if (props.selectedDesktop !== "") {
          fetch(setScreenCaptureBackground,  {
            method: 'POST',
            body: JSON.stringify({ desktop: props.selectedDesktop })
          })
        }
        break;
      case BLUR:
        fetch(setBlurBackground, {
          method: 'POST',
          body: JSON.stringify({ size: DEFAULT_BLUR_AMOUNT }),
        })
        break;
    }

  };

  return (
    <Container fixed maxWidth="sm">
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <Tabs 
                centered 
                variant="scrollable"
                scrollButtons="auto"
                value={value}
                onChange={handleChange} 
                aria-label="background-tabs"
              >
                <Tab wrapped label="Green Screen" {...a11yProps(GREEN_SCREEN)} />
                <Tab wrapped label="File" {...a11yProps(FILE)} />
                <Tab wrapped label="Screen Capture" {...a11yProps(DESKTOP)} />
                <Tab wrapped label="Blur" {...a11yProps(BLUR)} />
              </Tabs>
            </Grid>
            <Grid item xs={12}>

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

            </Grid>
          </Grid>

        </Paper>
    </Container>
  );
}

export default connector(BackgroundSelector)