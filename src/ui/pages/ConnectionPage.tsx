import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled, Container, Paper, Typography, Divider } from '@mui/material'
import { useMessager } from '../core/messager'

const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:27017'

const FormContent = styled(Box)({
  display: 'flex',
  padding: 25,
})

export default function ConnectionPage() {
  const messager = useMessager()

  const [isLoading, setIsLoading] = React.useState(false);
  const [connectionString, updateConnectionString] = React.useState(DEFAULT_CONNECTION_STRING);

  const connect = async () => {
    setIsLoading(true);

    try {
      const databases = await messager?.connect(connectionString)

      console.log(databases)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false);
  }

  return (
    <Container>
      <Paper>
        <Box component="form" noValidate autoComplete="off">
          <Typography px={3} py={2} variant="h6">
            Add a new database
          </Typography>

          <Divider />

          <FormContent>
            <TextField
              placeholder={DEFAULT_CONNECTION_STRING}
              label="Connection string"
              variant="outlined"
              value={connectionString}
              onChange={event => updateConnectionString(event.target.value)}
              fullWidth
            />
              <LoadingButton
                sx={{ marginLeft: '10px' }}
                variant="outlined"
                loading={isLoading}
                onClick={connect}
              >
              Connect
            </LoadingButton>
          </FormContent>
        </Box>
      </Paper>
    </Container>
  )
}
