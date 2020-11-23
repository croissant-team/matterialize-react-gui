import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Desktop } from '../types'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const ScreenSelector = () => {
  const classes = useStyles()
  const [desktop, setDesktop] = React.useState("None")
  const [desktops, setDesktops] = React.useState<Desktop[]>([])

  const selectDesktop = (desktopName: string) => {
    setDesktop(desktopName)

    fetch("http://localhost:9000/background/desktop",  {
      method: 'POST',
      body: JSON.stringify({ desktop: desktopName })
    })
  }

  React.useEffect(
    () => {
      fetch("http://localhost:9000/background/desktop/options")
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
          value={desktop}
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

export default ScreenSelector
