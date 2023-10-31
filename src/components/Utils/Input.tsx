import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import {
  SweetAlerts,
  SweetAlertsConfirm,
} from "@/components/Utils/SweetAlerts";
import Swal from 'sweetalert2';


export default function VincularSteam() {
  const [data, setData] = React.useState<{
    steamId: string;
    status: 'initial' | 'loading' | 'failure' | 'sent';
  }>({
    steamId: '',
    status: 'initial',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ steamId: '', status: 'sent' });
      }, 1500)
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Steam vinculada com sucesso!',
        confirmButtonText: 'Ok',
        color: 'aliceblue',
        background: '#545454'
      })
      ;
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
          className="mx-auto"
        >
          Vincular com a Steam
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px', width: '105%' }}
          placeholder="Ex: 76581198524378123"
          
          
          required
          value={data.steamId}
          onChange={(event) =>
            setData({ steamId: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              className='bg-azul-primary-50'
            >
              Vincular
            </Button>
          }
        />
        
      </FormControl>
    </form>
  );
}