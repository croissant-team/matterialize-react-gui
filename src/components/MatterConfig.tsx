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
  const [values, setValues] = React.useState({} as any);
  const [changed, setChanged] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      props.config.forEach(element => {
        if (element.matter === props.matter) {
            setMatterConfig(element)

            var vals: any = {}
            element.fields.forEach(field => {
              console.log(field.value)
              vals[field.name] = (field.value as number)
            })

            setValues(vals)
        }
      });
    } catch {}
  }, [props.matter])

  const changeField = (newValue: any, field: string) => {
    var newValues = { ...values }
    newValues[field] = newValue as number
    setValues(newValues)
    setChanged(true);
  }

  const applyConfig = () => {
    var config: any = {}
    Object.keys(values).forEach(key => {
      config[key] = `${values[key]}`
    })
    props.cameraLoading()
    props.postConfig(props.matter, config)
    setChanged(false)
  }


  return (
    <Container>
      {matterConfig.fields.map(field => {
        const id = field.name.replace(" ", "-")
        return (<>
          <br />
          <Typography id={`discrete-typography-${id}`} gutterBottom>
              {field.name}
          </Typography>
          <Slider
            key={`slider-${id}`}
            value={values[field.name]}
            getAriaValueText={valuetext}
            aria-labelledby={`discrete-slider-${id}`}
            onChange={(e, value) => changeField(value, field.name)}
            valueLabelDisplay="auto"
            min={field.field_info.min}
            step={field.field_info.step_size}
            max={field.field_info.max}
          />
        </>)
      })}

    {matterConfig.fields.length > 0 &&
      <Button 
        disabled={!changed} 
        variant="contained" 
        color="primary"
        onClick={applyConfig}
      >
         <CheckIcon /> &nbsp; Apply 
      </Button> 
    }

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