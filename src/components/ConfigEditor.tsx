import React from 'react';
import { Checkbox, Container, FormControlLabel, Paper, Collapse, Box, Typography, Button } from '@material-ui/core';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import PublishIcon from '@material-ui/icons/Publish';
import { getConfig } from '../data/actions/config/configActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import BackgroundCutConfig from './configs/BackgroundCutConfig';



const mapStateToProps = (state: RootState) => {
  return {
    matter: state.configReducer.matter,
    config: state.configReducer.config
  }
}

const connector = connect(
  mapStateToProps,
  { getConfig }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type ConfigEditorProps =  PropsFromRedux;

const ConfigEditor: React.FC<ConfigEditorProps> = (props) => {
  const [showConfig, setShowConfig] = React.useState(false);

  const toggleConfig = () => {
    setShowConfig(!showConfig)
  }

  React.useEffect(() => {
    props.getConfig()
  }, [])
//   "Background Cut": {
//     "color_model_mix_factor": "0 - 1"",
//     "downscale_factor": "1,2 3 4",
//     "global_bg_model_num_components": "5 - 15",
//     "median_blur_kernel_size": "odd number between 1 - 50"
// },
// "Background Negation": {
//     "threshold": "0 - 255"
// },
  return (
    <Container fixed maxWidth="md">
      <FormControlLabel
        control={
          <Checkbox
            checked={showConfig}
            onChange={toggleConfig}
            name="configCheckbox"
            color="primary"
          />
        }
        label="Show config"
      />
        <Collapse in={showConfig}>
          <Paper square>
            {props.matter === "Background Cut" &&
            <>
              <BackgroundCutConfig />
            </>
            }

            {props.matter === "Background Negation" &&
            <>
              <BackgroundCutConfig />
            </>
            }

            {(props.matter === "None" || props.matter === "OpenCV") &&
              <div>
                <Box p={3}>
                  <Typography>{`No config available for matter '${props.matter}'`}</Typography>
                </Box>
              </div>
            }
            <br />
            <Button variant="contained" color="primary"> <PublishIcon /> &nbsp; Import </Button>
            &nbsp;
            &nbsp;
            <Button variant="contained" color="secondary"> <GetAppIcon /> &nbsp; Export </Button>
            <br />
            <br />
          </Paper>
        </Collapse>
    </Container>
  );
}

export default connector(ConfigEditor)