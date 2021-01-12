import './App.css'
import { connect, ConnectedProps } from 'react-redux'
import React from 'react'
import { CircularProgress } from '@material-ui/core'
import MatterializeApp from './MatterializeApp'
import { RootState } from './data/reducers'
import { serverLoaded } from './data/actions/loading/loadingActions'
import { availableMatters } from './endpoints'

const mapStateToProps = (state: RootState) => {
  return {
    serverLoading: state.loadingReducer.loading
  }
}

const connector = connect(
  mapStateToProps,
  { serverLoaded }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type AppProps =  PropsFromRedux;

const App: React.FC<AppProps> = (props) => {

  const checkLoaded = () => {
    fetch(availableMatters)
    .then(res => props.serverLoaded())
    .catch(data => checkLoaded())
  }

  React.useEffect( checkLoaded, [] )

  return (
    <div className="App">
      {props.serverLoading && 
        <div
        style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
        >
          <CircularProgress />
      </div>
      }
      
      {!props.serverLoading && 
        <MatterializeApp />
      }

    </div>
  )
}

export default connector(App)
