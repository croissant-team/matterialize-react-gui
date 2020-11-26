import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Button, Container } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../data/reducers';

const modelMixFactorMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 0.5,
    label: '0.5',
  },
  {
    value: 1,
    label: '1',
  },
];

const downscaleFactorMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
];

const numComponentsMarks = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 15,
    label: '15',
  },
];

const blurKernelSizeMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 49,
    label: '49',
  }
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
  {  }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type BackgroundCutConfigProps =  PropsFromRedux;

const BackgroundCutConfig: React.FC<BackgroundCutConfigProps> = (props) => {
  const [mixFactor, setMixFactor] = React.useState(0.25);
  const [downscaleFactor, setDownscaleFactor] = React.useState(2);
  const [numComponents, setNumComponents] = React.useState(11);
  const [medianBlurKernelSize, setMedianBlurKernelSize] = React.useState(21);
  const [changed, setChanged] = React.useState(false);


  React.useEffect(() => {
    try {
      const bgCutConfig = props.config["Background Cut"]
      setMixFactor(bgCutConfig["color_model_mix_factor"])
      setDownscaleFactor(bgCutConfig["downscale_factor"])
      setNumComponents(bgCutConfig["global_bg_model_num_components"])
      setMedianBlurKernelSize(bgCutConfig["median_blur_kernel_size"])
    } catch {}
  }, [props.config])

  const changeMixFactor = (event: any, newValue: any) => {
    setMixFactor(newValue as number)
  };

  const changeDownscaleFactor = (event: any, newValue: any) => {
    setDownscaleFactor(newValue as number)
  };

  const changeNumComponents = (event: any, newValue: any) => {
    setNumComponents(newValue as number)
  };

  const changeMedianBlurKernelSize = (event: any, newValue: any) => {
    setMedianBlurKernelSize(newValue as number)
  };

  //   "Background Cut": {
//     "color_model_mix_factor": "0 - 1"",
//     "downscale_factor": "1,2 3 4",
//     "global_bg_model_num_components": "5 - 15",
//     "median_blur_kernel_size": "odd number between 1 - 50"
// },

  return (
    <Container>
      <br />
      <Typography id="discrete-slider-custom" gutterBottom>
          Model Mix Factor
      </Typography>
      <Slider
        key="slider-bgCut-mix-factor"
        value={mixFactor}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-bgCut-mix-factor"
        onChange={changeMixFactor}
        valueLabelDisplay="auto"
        marks={modelMixFactorMarks}
        min={0}
        step={0.01}
        max={1}
      />

      <br />
      <Typography id="discrete-slider-custom" gutterBottom>
          Downscale Factor
      </Typography>
      <Slider
        key="slider-bgCut-downscale-factor"
        value={downscaleFactor}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-bgCut-downscale-factor"
        onChange={changeDownscaleFactor}
        valueLabelDisplay="auto"
        marks={downscaleFactorMarks}
        min={1}
        step={1}
        max={4}
      />

    <br />
    <Typography id="discrete-slider-custom" gutterBottom>
        Number of components in global background model
    </Typography>
    <Slider
      key="slider-bgCut-num-components"
      value={numComponents}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-bgCut-num-components"
      onChange={changeNumComponents}
      valueLabelDisplay="auto"
      marks={numComponentsMarks}
      min={5}
      step={1}
      max={15}
    />

    <br />
    <Typography id="discrete-slider-custom" gutterBottom>
        Median blur kernel size
    </Typography>
    <Slider
      key="slider-bgCut-kernel-size"
      value={medianBlurKernelSize}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-bgCut-kernel-size"
      onChange={changeMedianBlurKernelSize}
      valueLabelDisplay="auto"
      marks={blurKernelSizeMarks}
      min={1}
      step={2}
      max={49}
    />

    <Button disabled={!changed} variant="contained" color="primary"> Apply </Button>
    </Container>
  );
}

export default connector(BackgroundCutConfig)