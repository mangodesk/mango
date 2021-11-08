import React, { useContext, useReducer } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Paper, Typography } from '@mui/material'

import { MessagerContext } from '../App'
import { useAppDispatch, setDatabases, setCollections } from '../store'

const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:27017'

type State = {
  isLoading: boolean
  connectionString?: string
}

const initialState: State = {
  isLoading: false,
  connectionString: '',
}

function reducer(state: State, action: { type: string; payload: any }): State {
  switch (action.type) {
    case 'setIsLoading':
      return { ...state, isLoading: action.payload }
    case 'updateConnectionString':
      return { ...state, connectionString: action.payload }
    default:
      throw new Error('Unknown action')
  }
}

export default function ConnectionPage() {
  const history = useHistory()
  const messager = useContext(MessagerContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const storeDispatch = useAppDispatch()

  const updateConnectionString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: 'updateConnectionString', payload: event.target.value })
  }

  const connect = async () => {
    dispatch({ type: 'setIsLoading', payload: true })

    const connectionString = state.connectionString || DEFAULT_CONNECTION_STRING

    try {
      const { databases, collections } = await messager?.invoke('connect', {
        connectionString,
      })

      storeDispatch(setDatabases(databases))
      storeDispatch(setCollections(collections))

      dispatch({ type: 'setIsLoading', payload: false })
      history.push('/query')
    } catch (error) {
      console.error(error)
      dispatch({ type: 'setIsLoading', payload: false })
    }
  }

  return (
    <Container>
      <Paper>
        <Box px={3} py={2} component="form" noValidate autoComplete="off">
          <Typography variant="h6" margin="dense">
            Add a new database
          </Typography>

          <Grid container>
            <Grid item xs={12} sm={12}>
              <TextField
                placeholder={DEFAULT_CONNECTION_STRING}
                label="Connection string"
                variant="outlined"
                value={state.connectionString}
                onChange={updateConnectionString}
                fullWidth
                margin="dense"
              />
            </Grid>
          </Grid>

          <LoadingButton
            variant="contained"
            size="large"
            loading={state.isLoading}
            onClick={connect}
          >
            Connect
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  )
}
