import React, { useReducer, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:27017'

type State = {
  isLoading: boolean
  connectionString?: string
}

const initialState: State = {
  isLoading: false,
  connectionString: undefined,
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
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateConnectionString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: 'updateConnectionString', payload: event.target.value })
  }

  const connect = () => {
    dispatch({ type: 'setIsLoading', payload: true })

    const connectionString = state.connectionString || DEFAULT_CONNECTION_STRING

    dispatch({ type: 'setIsLoading', payload: false })
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        placeholder={DEFAULT_CONNECTION_STRING}
        label="Connection string"
        variant="outlined"
        value={state.connectionString}
        onChange={updateConnectionString}
      />

      <LoadingButton
        variant="outlined"
        size="large"
        loading={state.isLoading}
        onClick={connect}
      >
        Connect
      </LoadingButton>
    </Box>
  )
}
