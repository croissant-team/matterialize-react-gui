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
  const [matter, setMatter] = React.useState(0);

  const handleChange = (event) => {
    setMatter(event.target.value);

    const options = {
      method: 'post'
    }
    fetch("http://localhost:9000/matter/set/" + event.target.value, options)
      .then(resp =>  console.log(resp))
  };

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
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
           <MenuItem value={1}>Background cut</MenuItem>
           <MenuItem value={2}>Background subtract</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default MatterSelector;