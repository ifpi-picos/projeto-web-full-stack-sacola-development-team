import { background } from '@chakra-ui/react'
import Swal, {SweetAlertIcon} from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


export async function SweetAlerts(icon: SweetAlertIcon, title: string = '', text: string = '') {
    await MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Ok',
        color: 'aliceblue',
        background:'#545454',
    })
}

export async function SweetAlertsConfirm(icon: SweetAlertIcon, title: string = '', text: string = '') {
    const result = await MySwal.fire({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, quero remover esse jogo!',
        cancelButtonText: 'Cancelar',
        color: 'aliceblue',
        background:'#545454',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Removido!',
                text: 'Este jogo foi removido da sua conta.',
                icon: 'success',
                background: '#545454'
            });
        }
    });
}