import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MatterSelector = () => {
  const classes = useStyles();
  const [matter, setMatter] = React.useState("None");
  const [matters, setMatters] = React.useState([]);

  const handleChange = (event) => {
    const matterType = event.target.value;
    setMatter(matterType);

    fetch("http://localhost:9000/matter/set/",  {
      method: 'post',
      body: JSON.stringify({ content: matterType }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(resp =>  console.log(resp))
  };

  React.useEffect(
    () => {
      fetch("http://localhost:9000/matter/options")
        .then(res => res.json())
        .then(data => {
          setMatters(data.matters)})
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
          onChange={handleChange}
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
    </>
  );
}

export default MatterSelector;