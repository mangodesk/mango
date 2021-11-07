import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { MessagerContext } from '../App'

const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:27017'

export default function ConnectionPage() {
  const messager = useContext(MessagerContext)

  const [isLoading, setIsLoading] = useState(false);
  const [connectionString, updateConnectionString] = useState(DEFAULT_CONNECTION_STRING);

  const connect = async () => {
    setIsLoading(true);

    try {
      const { databases } = await messager?.invoke('connect', {
        connectionString,
      })

      console.log(databases)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false);
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
                value={connectionString}
                onChange={event => updateConnectionString(event.target.value)}
                fullWidth
                margin="dense"
              />
            </Grid>
          </Grid>

          <LoadingButton
            variant="contained"
            size="large"
            loading={isLoading}
            onClick={connect}
          >
            Connect
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  )
}
