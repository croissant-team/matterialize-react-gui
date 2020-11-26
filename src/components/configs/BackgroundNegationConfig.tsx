import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Button, Container } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../data/reducers';
import CheckIcon from '@material-ui/icons/Check';
import { postConfig } from '../../data/actions/config/configActions';
import { cameraLoading } from '../../data/actions/loading/loadingActions';

const thresholdMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
  {
    value: 150,
    label: '150',
  },
  {
    value: 200,
    label: '200',
  },
  {
    value: 255,
    label: '255',
  },
];

function valuetext(value: number) {
  return `${value}`;
}


const mapStateToProps = (state: RootState) => {
  return {
    config: state.configReducer.config
  }
}

const connector = connect(
  mapStateToProps,
  { postConfig, cameraLoading }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type BackgroundNegationConfigProps =  PropsFromRedux;

const BackgroundNegationConfig: React.FC<BackgroundNegationConfigProps> = (props) => {
  const [threshold, setThreshold] = React.useState(25);
  const [changed, setChanged] = React.useState(false);


  React.useEffect(() => {
    try {
      const bgNegateConfig = props.config["Background Negation"]
      setThreshold(bgNegateConfig["threshold"])
    } catch {}
  }, [props.config])

  const changeThreshold = (event: any, newValue: any) => {
    setThreshold(newValue as number)
    setChanged(true)
  };

  const applyConfig = () => {
    const config: any = {}
    config["threshold"] = `${threshold}`
    props.cameraLoading()
    props.postConfig("Background Negation", config)
    setChanged(false)
  }

  
  return (
    <Container>
      <br />
      <Typography id="discrete-slider-custom" gutterBottom>
          Threshold
      </Typography>
      <Slider
        key="slider-bgNegate-threshold"
        value={threshold}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-bgNegate-threshold"
        onChange={changeThreshold}
        valueLabelDisplay="auto"
        marks={thresholdMarks}
        min={0}
        step={1}
        max={255}
      />

      <br />

    <Button 
      disabled={!changed} 
      variant="contained" 
      color="primary"
      onClick={applyConfig}
    >
       <CheckIcon /> &nbsp; Apply 
    </Button>
    </Container>
  );
}

export default connector(BackgroundNegationConfig)