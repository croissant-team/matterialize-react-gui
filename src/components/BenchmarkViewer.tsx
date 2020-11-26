import React, { useState } from 'react'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Container, createStyles, Grid, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@material-ui/core'
import { Assessment, ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    details: {
      flexGrow: 1
    }
  }),
);

const BenchmarkViewer = () => {
  const classes = useStyles()

  type benchmarkResult = {
    matter: string,
    results: {
      accuracy: number,
      process_time: number
    }
  }

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<benchmarkResult[]>([]);

  const runBenchmark = () => {
    setLoading(true)
    fetch("http://localhost:9000/matters/benchmark")
    .then(res => res.json())
    .then(data => {
      const new_results: benchmarkResult[] = []

      Object.keys(data).forEach(function(key, index) {
        const info: benchmarkResult = {
          matter: key,
          results: {
            accuracy: data[key].accuracy,
            process_time: data[key].run_time
          }
        }

        new_results.push(info)
      })

      setResults(new_results)
      setLoading(false)
    })
  }

  return(
    <Container fixed maxWidth="md">

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="benchmark-runs"
          id="benchmark-header"
        >
          <Typography>Benchmark Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={classes.details}>
            {loading && 
              <Grid item xs={12}>
                <div className={classes.root}>
                  <LinearProgress  />
                </div>
              </Grid>
            }
            <Grid item xs={12}>
              {results.length === 0 ?
                <Typography>
                  No Current Results.
                </Typography> :
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Matter Type</TableCell>
                        <TableCell align="right">Accuracy (%)</TableCell>
                        <TableCell align="right">Process Time (ms)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results!.map((res) => (
                        <TableRow key={res.matter}>
                          <TableCell component="th" scope="row">{res.matter}</TableCell>
                          <TableCell align="right">{res.results.accuracy * 100}</TableCell>
                          <TableCell align="right">{res.results.process_time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </Grid>
          </Grid>
        </AccordionDetails>
        <AccordionActions>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Assessment />} 
            disabled={loading}
            onClick={() => runBenchmark()} 
          >
            Run Benchmarks
          </Button>
        </AccordionActions>
      </Accordion>
    </Container>
  )
}

export default BenchmarkViewer