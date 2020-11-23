import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 60,
    label: '60',
  },
  {
    value: 80,
    label: '80',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export default function BlurSlider() {
  const classes = useStyles();

  const handleChange = (event: any, newValue: any) => {
    console.log(newValue) // call endpoint here
  };

  return (
    <>
      <Typography id="discrete-slider-custom" gutterBottom>
        Blur amount
      </Typography>
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={10}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </>
  );
}