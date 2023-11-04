import Swal, {SweetAlertIcon} from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export async function SweetAlerts(
    icon: SweetAlertIcon,
    title: string = "",
    text: string = ""
) {
    await MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: "Ok",
        color: "aliceblue",
        background: "#545454",
    });
}

export async function SweetAlertsConfirm(
    icon: SweetAlertIcon,
    title: string = "",
    text: string = "",
    titleConfirm: string = "",
    textConfirm: string = "",
) {
    return new Promise((resolve) => {
        MySwal
            .fire({
                title: title,
                text: text,
                icon: icon,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, quero remover esse jogo!",
                cancelButtonText: "Cancelar",
                color: "aliceblue",
                background: "#545454",
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: titleConfirm,
                        text: textConfirm,
                        icon: "success",
                        background: "#545454",
                        color: "aliceblue",
                    });
                    resolve(true); // O usuário confirmou
                } else {
                    resolve(false); // O usuário cancelou
                }
            });
    });
}

