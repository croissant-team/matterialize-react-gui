import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Paper } from '@material-ui/core';
import ImageSelector from './ImageSelector';
import ScreenSelector from './ScreenSelector';
import ClearBackground from './ClearBackground';
import BlurSlider from './BlurSlider';

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

export default function BackgroundSelector() {
//   const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        fetch('http://localhost:9000/background/clear/', {
          method: 'POST',
        })
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        fetch('http://localhost:9000/background/blur', {
          method: 'POST',
          body: JSON.stringify({ size: 63 }),
        })
        break;
    }
    // call endpoint to change it
  };

  return (
    <Container fixed maxWidth="md">
        <Paper square>
            <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Green Screen" {...a11yProps(0)} />
            <Tab label="Image" {...a11yProps(1)} />
            <Tab label="Screen Capture" {...a11yProps(2)} />
            <Tab label="Blur" {...a11yProps(3)} />
            </Tabs>
        <TabPanel value={value} index={0}>
            Select a tab from above to choose a background
            {/* need to clear the background when this panel is shown */}
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ImageSelector /> <ClearBackground /> <br /> <br />
            Selected image: no image selected
        </TabPanel>
        <TabPanel value={value} index={2}>
            <ScreenSelector />
        </TabPanel>
        <TabPanel value={value} index={3}>
            <BlurSlider />
        </TabPanel>
        </Paper>
    </Container>
  );
}