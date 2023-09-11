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
    })
}