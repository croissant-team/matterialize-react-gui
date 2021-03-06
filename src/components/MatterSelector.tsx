import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Matter } from '../types'
import { showToast } from '../data/actions/toast/toastActions'
import { matterUpdated } from '../data/actions/config/configActions'
import { cameraLoading, cameraLoaded } from '../data/actions/loading/loadingActions';
import { availableMatters, currentMatter, setMatterType } from '../endpoints'

const PRECONDITION_FAILED = 412

const connector = connect(null, { showToast, matterUpdated, cameraLoading, cameraLoaded })

type PropsFromRedux = ConnectedProps<typeof connector>
type MatterSelectorProps = PropsFromRedux

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const MatterSelector: React.FC<MatterSelectorProps> = (props) => {
  const classes = useStyles()
  const [matter, setMatter] = React.useState("None")
  const [matters, setMatters] = React.useState<Matter[]>([])

  const selectMatter = (matterType: string) => {
    setMatter(matterType)
    props.matterUpdated(matterType)
    const prevMatter = matter

    props.cameraLoading()

    fetch(setMatterType,  {
      method: 'POST',
      body: JSON.stringify({ matter: matterType })
    })
      .then(res =>  {
        if (res.ok) {
          props.matterUpdated(matterType)
        } else if (res.status === PRECONDITION_FAILED) {
          setMatter(prevMatter)
          props.matterUpdated(prevMatter)
          props.showToast("Please take a clean plate before using this matter", "warning")
        }
        props.cameraLoaded()
      })
      .catch(err => props.cameraLoaded())
  }

  React.useEffect(
    () => {
      fetch(availableMatters)
        .then(res => res.json())
        .then(data => {
          setMatters(data.matters)
        })
      fetch(currentMatter)
      .then(res => {
        if (res.ok) {
          res.json()
          .then(data => { 
            setMatter(data.matter)
            props.matterUpdated(data.matter)
          })
        } else if (res.status === PRECONDITION_FAILED) {
          props.showToast("Please take a clean plate before using this matter", "warning")
        }
      })
    },
    []
  )
  return (
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
  )
}

export default connector(MatterSelector)
