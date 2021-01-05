import React from 'react';
import { Checkbox, Container, FormControlLabel, Paper, Collapse, Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import PublishIcon from '@material-ui/icons/Publish';
import { getConfig, importConfig, exportConfig } from '../data/actions/config/configActions';
import { cameraLoading } from '../data/actions/loading/loadingActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ExpandMore } from '@material-ui/icons';
import { Col, Row } from 'react-grid-system';
import MatterConfigEditor from './MatterConfig';



const mapStateToProps = (state: RootState) => {
  return {
    matter: state.configReducer.matter,
    config: state.configReducer.config
  }
}

const connector = connect(
  mapStateToProps,
  { getConfig, importConfig, exportConfig, cameraLoading }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type ConfigEditorProps =  PropsFromRedux;

const ConfigEditor: React.FC<ConfigEditorProps> = (props) => {

  const importConfig = () => {
    props.cameraLoading();
    props.importConfig();
  }

  React.useEffect(() => {
    props.getConfig()
  }, [])

  return (
    <Container fixed maxWidth="sm">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="config"
          id="config-header"
        >
          <Typography>
            Matter Configuration
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <br />
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item xs={12}>
              <MatterConfigEditor />

              {(props.matter === "None" || props.matter === "OpenCV") &&
                <div>
                  <Box p={3}>
                    <Typography>{`No config available for matter '${props.matter}'`}</Typography>
                  </Box>
                </div>
              }
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={importConfig}> 
                <PublishIcon /> &nbsp; Import 
              </Button>
              &nbsp;&nbsp;
              <Button variant="contained" color="secondary" onClick={props.exportConfig}> 
                <GetAppIcon /> &nbsp; Export 
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default connector(ConfigEditor)