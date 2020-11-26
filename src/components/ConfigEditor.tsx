import React from 'react';
import { Checkbox, Container, FormControlLabel, Paper, Collapse, Box, Typography, Button } from '@material-ui/core';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import PublishIcon from '@material-ui/icons/Publish';
import { getConfig, importConfig, exportConfig } from '../data/actions/config/configActions';
import { cameraLoading } from '../data/actions/loading/loadingActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import BackgroundCutConfig from './configs/BackgroundCutConfig';
import BackgroundNegationConfig from './configs/BackgroundNegationConfig';



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
  const [showConfig, setShowConfig] = React.useState(false);

  const toggleConfig = () => {
    setShowConfig(!showConfig)
  }

  const importConfig = () => {
    props.cameraLoading();
    props.importConfig();
  }

  React.useEffect(() => {
    props.getConfig()
  }, [])

  return (
    <Container fixed maxWidth="md">
      <div style={{position: 'absolute'}}>
          <FormControlLabel
            style={{
              position: 'relative', float:'left', marginLeft: '0px'
            }}
            control={
              <Checkbox
                  checked={showConfig}
                  onChange={toggleConfig}
                  name="configCheckbox"
                  color="primary"
              />
            }
            label="Show config     "
          />
      </div>

      <Collapse in={showConfig}>
        <Paper square>
          <br />

          {props.matter === "Background Cut" &&
            <BackgroundCutConfig />
          }

          {props.matter === "Background Negation" &&
            <BackgroundNegationConfig />
          }

          {(props.matter === "None" || props.matter === "OpenCV") &&
            <div>
              <Box p={3}>
                <Typography>{`No config available for matter '${props.matter}'`}</Typography>
              </Box>
            </div>
          }
          <br />

          <Button variant="contained" color="primary" onClick={importConfig}> 
            <PublishIcon /> &nbsp; Import 
          </Button>
          &nbsp;
          &nbsp;
          <Button variant="contained" color="secondary" onClick={props.exportConfig}> 
            <GetAppIcon /> &nbsp; Export 
          </Button>
          <br />
          <br />
          
        </Paper>
      </Collapse>
    </Container>
  );
}

export default connector(ConfigEditor)