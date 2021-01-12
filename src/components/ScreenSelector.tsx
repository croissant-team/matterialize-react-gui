import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Desktop } from '../types'
import { RootState } from '../data/reducers'
import { connect, ConnectedProps } from 'react-redux'
import { desktopLoaded } from '../data/actions/desktop/desktopActions'
import { availableDesktops, setScreenCaptureBackground } from '../endpoints'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))


const mapStateToProps = (state: RootState) => {
  return {
    desktop: state.desktopReducer.desktop
  }
}

const connector = connect(
  mapStateToProps,
  { desktopLoaded }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type ScreenSelectorProps =  PropsFromRedux;

const ScreenSelector: React.FC<ScreenSelectorProps> = (props) => {
  const classes = useStyles()
  const [desktops, setDesktops] = React.useState<Desktop[]>([])

  const selectDesktop = (desktopName: string) => {
    fetch(setScreenCaptureBackground,  {
      method: 'POST',
      body: JSON.stringify({ desktop: desktopName })
    })
    .then(res => props.desktopLoaded(desktopName))
  }

  React.useEffect(
    () => {
      fetch(availableDesktops)
        .then(res => res.json())
        .then(data => {
          setDesktops(data.devices)
        })
    },
    []
  )
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="screen-select-label">Screen</InputLabel>
        <Select
          labelId="screen-select-label"
          id="screen-select"
          value={props.desktop}
          onChange={e => selectDesktop(e.target.value as string)}
          label="Screen"
        >
          {desktops.map((desktop, key) => (
            <MenuItem key={key} value={desktop.name}>{desktop.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
    </>
  )
}

export default connector(ScreenSelector)
