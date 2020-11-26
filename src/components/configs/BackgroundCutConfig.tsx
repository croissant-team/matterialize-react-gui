import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Container } from '@material-ui/core';

const modelMixFactorMarks = [
  {
    value: 0,
    label: '0',
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
    value: 49,
    label: '49',
  }
];

function valuetext(value: number) {
  return `${value}`;
}

export default function BackgroundCutConfig() {
  const handleChange = (event: any, newValue: any) => {
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
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        onChange={handleChange}
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
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        onChange={handleChange}
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
      defaultValue={50}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-custom"
      onChange={handleChange}
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
      defaultValue={50}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-custom"
      onChange={handleChange}
      valueLabelDisplay="auto"
      marks={blurKernelSizeMarks}
      min={1}
      step={2}
      max={49}
    />
    </Container>
  );
}