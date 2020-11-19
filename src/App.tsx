import './App.css'
import { connect, ConnectedProps } from 'react-redux'
import React from 'react'
import { CircularProgress } from '@material-ui/core'
import MatterializeApp from './MatterializeApp'
import { RootState } from './data/reducers'
import { serverLoaded } from './data/actions/loading/loadingActions'



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
      {false && 
        <MatterializeApp />
      }

    </div>
  )
}

export default connector(App)
