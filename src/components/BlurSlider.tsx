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
    value: 100,
    label: '100',
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export default function BlurSlider() {
  const [blur, setBlur] = React.useState(63)
  const classes = useStyles();

  const handleChange = (event: any, newValue: any) => {
    var blurSize = Math.floor(((newValue as number) / 100) * 128)

    if (blurSize % 2 == 0) {
      blurSize++
    }

    if (blurSize > 127) {
      blurSize = 127
    }

    if (blurSize !== blur) {
      setBlur(blurSize)

      fetch('http://localhost:9000/background/blur', {
        method: 'POST',
        body: JSON.stringify({ size: blurSize }),
      })
    }
  };

  return (
    <>
      <Typography id="discrete-slider-custom" gutterBottom>
        Blur amount
      </Typography>
      <Slider
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        step={1}
        max={100}
      />
    </>
  );
}