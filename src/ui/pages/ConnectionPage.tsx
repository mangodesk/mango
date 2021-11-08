import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  styled,
  MenuItem,
  Container,
  Paper,
  Typography,
  Divider,
} from '@mui/material';
import { useMessager } from '../core/messager';
import { useAppDispatch, setDatabases, setCollections } from '../store';
import { useHistory } from 'react-router';

const DEFAULT_CONNECTION_STRING = 'mongodb://localhost:27017';

const FormContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: 25,
});

const FormRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: 5,
});

export default function ConnectionPage() {
  const history = useHistory();
  const messager = useMessager();
  const { handleSubmit, control } = useForm();
  const storeDispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const connect = async ({ connectionString }: { connectionString: string }) => {
    if (!messager) return;

    setIsLoading(true);

    try {
      const { databases, collections } = await messager.connect(connectionString);
      storeDispatch(setDatabases(databases));
      storeDispatch(setCollections(collections));
      setIsLoading(false);
      history.push('/query');

      console.log(databases);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Paper>
        <Box component="form" noValidate autoComplete="off">
          <Typography px={3} py={2} variant="h6">
            Add a new database
          </Typography>

          <Divider />

          <FormContent>
            <FormRow>
              <Controller
                name={'name'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    placeholder="Nom de la base de données"
                    label="Name"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    fullWidth
                  />
                )}
              />

              <Controller
                name={'type'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl sx={{ marginLeft: 2 }} fullWidth>
                    <InputLabel id="type">Type</InputLabel>
                    <Select labelId="type" value={value} label="Age" onChange={onChange}>
                      <MenuItem value={'production'}>Production</MenuItem>
                      <MenuItem value={'staging'}>Staging</MenuItem>
                      <MenuItem value={'local'}>Local</MenuItem>
                      <MenuItem value={'other'}>Other</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </FormRow>

            <FormRow>
              <Controller
                name={'connectionString'}
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
            </FormRow>
          </FormContent>
        </Box>
      </Paper>
    </Container>
  );
}
