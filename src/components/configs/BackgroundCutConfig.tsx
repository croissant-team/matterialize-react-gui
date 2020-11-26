import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Button, Container } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../data/reducers';
import CheckIcon from '@material-ui/icons/Check';
import { postConfig } from '../../data/actions/config/configActions';
import { cameraLoading } from '../../data/actions/loading/loadingActions';

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
  { postConfig, cameraLoading }
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
    setChanged(true)
  };

  const changeDownscaleFactor = (event: any, newValue: any) => {
    setDownscaleFactor(newValue as number)
    setChanged(true)
  };

  const changeNumComponents = (event: any, newValue: any) => {
    setNumComponents(newValue as number)
    setChanged(true)
  };

  const changeMedianBlurKernelSize = (event: any, newValue: any) => {
    setMedianBlurKernelSize(newValue as number)
    setChanged(true)
  };


  const applyConfig = () => {
    const config: any = {}
    config["color_model_mix_factor"] = `${mixFactor}`
    config["downscale_factor"] = `${downscaleFactor}`
    config["global_bg_model_num_components"] = `${numComponents}`
    config["median_blur_kernel_size"] = `${medianBlurKernelSize}`
    props.cameraLoading()
    props.postConfig("Background Cut", config)
    setChanged(false)
  }

  
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

export default connector(BackgroundCutConfig)