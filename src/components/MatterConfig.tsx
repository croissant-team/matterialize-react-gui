import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Box, Button, Container } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import CheckIcon from '@material-ui/icons/Check';
import { postConfig } from '../data/actions/config/configActions';
import { cameraLoading } from '../data/actions/loading/loadingActions';
import { MatterConfig } from '../data/reducers/configReducer'
import { config } from 'process';

function valuetext(value: number) {
  return `${value}`;
}

const mapStateToProps = (state: RootState) => {
  return {
    config: state.configReducer.config,
    matter: state.configReducer.matter
  }
}

const connector = connect(
  mapStateToProps,
  { postConfig, cameraLoading }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type MatterConfigEditorProps =  PropsFromRedux;


const MatterConfigEditor: React.FC<MatterConfigEditorProps> = (props) => {
  const [matterConfig, setMatterConfig] = React.useState({matter: "None", fields: []} as MatterConfig);
  React.useEffect(() => {
    try {
      props.config.forEach(element => {
        if (element.matter === props.matter) {
            console.log(element)
            setMatterConfig(element)
        }
      });
    } catch {}
  }, [props.matter])

  const changeField = (event: any, newValue: any) => {
      // something here
  }

  return (
    <Container>
      {matterConfig.fields.map(field => {
        return (<>
          <br />
          <Typography id="discrete-slider-custom" gutterBottom>
              {field.name}
          </Typography>
          <Slider
            key="slider-bgCut-mix-factor"
            value={field.value}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-bgCut-mix-factor"
            // onChange={changeMixFactor}
            valueLabelDisplay="auto"
            min={field.field_info.min}
            step={field.field_info.step_size}
            max={field.field_info.max}
          />
        </>)
      })}

{/* 
      <Button 
        disabled={!changed} 
        variant="contained" 
        color="primary"
        onClick={applyConfig}
      >
         <CheckIcon /> &nbsp; Apply 
      </Button> */}

      {matterConfig.fields.length === 0 &&
        <div>
          <Box p={3}>
            <Typography>{`No config available for matter '${props.matter}'`}</Typography>
          </Box>
        </div>
      }
    </Container>
  );
}

export default connector(MatterConfigEditor)