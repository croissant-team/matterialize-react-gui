import React from 'react';
import { Checkbox, Container, FormControlLabel, Paper, Collapse } from '@material-ui/core';
import { RootState } from '../data/reducers';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = (state: RootState) => {
  return {
    matter: state.configReducer.matter
  }
}

const connector = connect(
  mapStateToProps,
  {}
)

type PropsFromRedux = ConnectedProps<typeof connector>
type ConfigEditorProps =  PropsFromRedux;

const ConfigEditor: React.FC<ConfigEditorProps> = (props) => {
  const [showConfig, setShowConfig] = React.useState(false);

  const toggleConfig = () => {
    setShowConfig(!showConfig)
  }

  React.useEffect(() => {}, [])
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
            {props.matter}
          </Paper>
        </Collapse>
    </Container>
  );
}

export default connector(ConfigEditor)