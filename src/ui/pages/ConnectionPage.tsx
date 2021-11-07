import * as React from 'react'
import { Controller, useForm } from "react-hook-form";
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
  const { handleSubmit, control } = useForm();

  const [isLoading, setIsLoading] = React.useState(false);

  const connect = async ({ connectionString }: { connectionString: string }) => {
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
            <Controller
              name={"connectionString"}
              control={control}
              defaultValue={DEFAULT_CONNECTION_STRING}
              render={({ field: { onChange, value } }) => (
                <TextField
                  placeholder={DEFAULT_CONNECTION_STRING}
                  label="Connection string"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
            
              <LoadingButton
                sx={{ marginLeft: '10px' }}
                variant="outlined"
                loading={isLoading}
                onClick={handleSubmit(connect)}
              >
              Connect
            </LoadingButton>
          </FormContent>
        </Box>
      </Paper>
    </Container>
  )
}
