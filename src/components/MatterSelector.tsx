import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Matter } from '../types'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const MatterSelector = () => {
  const classes = useStyles()
  const [matter, setMatter] = React.useState("None")
  const [matters, setMatters] = React.useState<Matter[]>([])
  const [loadingMatter, setloadingMatter] = React.useState(false)

  const selectMatter = (matterType: string) => {
    setMatter(matterType)
    setloadingMatter(true)

    fetch("http://localhost:9000/matter/set",  {
      method: 'POST',
      body: JSON.stringify({ matter: matterType })
    })
      .then(resp =>  setloadingMatter(false))
      .catch(err => setloadingMatter(false))
  }

  React.useEffect(
    () => {
      fetch("http://localhost:9000/matter/options")
        .then(res => res.json())
        .then(data => {
          setMatters(data.matters)
        })
    },
    []
  )
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="matter-select-label">Matter</InputLabel>
        <Select
          labelId="matter-select-label"
          id="matter-select"
          value={matter}
          onChange={e => selectMatter(e.target.value as string)}
          label="Matter"
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {matters.map((matter, key) => (
            <MenuItem key={key} value={matter.name}>{matter.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      {loadingMatter && <CircularProgress />}
      
    </>
  )
}

export default MatterSelector
