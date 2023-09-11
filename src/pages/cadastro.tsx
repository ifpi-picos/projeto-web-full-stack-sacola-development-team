import useAuth from "@/hooks/useAuth";
import {SetStateAction, useRef, useState} from "react";
import Image from "next/image";
import ExibirSenha from "../components/LoginAndRegister/ExibirSenha";
import FormularioCadastro from "../components/LoginAndRegister/FormularioCadastro";
import Link from "next/link";
import Loading from "@/components/Main/loading";
import {SweetAlerts} from "@/components/Utils/SweetAlerts";


export default function Cadastro() {

    const {register} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    function loading(value: boolean = false) {
        setIsLoading(value)
    }

    // Registro

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const emailRef = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleNameChange = (newName: SetStateAction<string>) => {
        setName(newName);
    }

    const handleUsernameChange = (newUsername: SetStateAction<string>) => {
        setUsername(newUsername);
    }

    const handlePasswordChange = (newPassword: SetStateAction<string>) => {
        setPassword(newPassword);
    }

    const handleConfirmPasswordChange = (newPassword2: SetStateAction<string>) => {
        setConfirmPassword(newPassword2);
    }


    async function handleRegister() {
        const email = emailRef.current?.value as string;

        if (!email || !password || !confirmPassword || !name || !username) {
            return await SweetAlerts('error', 'Erro', 'Preencha todos os campos!');
        } else if (password !== confirmPassword) {
            return await SweetAlerts('error', 'Erro', 'As senhas não coincidem!');
        } else if (password.length < 6) {
            return await SweetAlerts('error', 'Erro', 'A senha deve ter no mínimo 6 caracteres!');
        }

        loading(true);

        try {
            const res = await register(name, username, email, password);
            if (res !== 'Sucess') {
                throw new Error(res);
            }
            await SweetAlerts('success', 'Sucesso', 'Cadastro realizado com sucesso!');
            // window.location.href = '/teste';
        } catch (error: any) {
            await SweetAlerts('error', 'Erro', error.message);
        } finally {
            loading(false);
        }
    }

    return (
        <section className="h-screen">
            <Loading isLoading={isLoading}/>
            <div className="container h-full px-6 py-24">
                <div
                    className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between ">

                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 sm:block hidden ">
                        <header className="flex flex-col gap-4 w-full max-w-[350px] pl-16 justify-center items-center">
                            <h1 className="font-sans text-4xl font-bold text-aliceblue-50">
                                GameMate
                            </h1>
                        </header>
                        <Image src="dualsense.svg" width={500} height={500} alt=""/>

                    </div>


                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 h-max">
                        <form onSubmit={handleRegister}>
                            <h1 className="text-xl md:text-xl lg:text-xl text-center gap-4 relative bottom-20">
                                Faça seu cadastro no GameMate
                            </h1>

                            <div className="relative mb-8" data-te-input-wrapper-init="">

                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full  border-0 bg-transparent px-3 py-[0.5rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border-b-2 border-aliceblue-50"
                                    id="email"
                                    placeholder="Seu email"
                                    autoComplete={'email'}
                                    ref={emailRef}
                                />
                                <label
                                    htmlFor="exampleFormControlInput3"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out translate-y-[-2.5rem]  dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Email
                                </label>
                            </div>

                            <FormularioCadastro onChangeName={handleNameChange} onChangeUser={handleUsernameChange}/>
                            <div className="relative mb-6" data-te-input-wrapper-init="">


                                <ExibirSenha inputId={'password1'} inputLabelName={'Senha'}
                                             onChange={handlePasswordChange}/>


                                <ExibirSenha inputId={'password2'} inputLabelName={'Confirmar senha'}
                                             onChange={handleConfirmPasswordChange}/>


                            </div>


                            <button
                                type="button"
                                className="bg-gray-400 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init=""
                                data-te-ripple-color="light"
                                onClick={handleRegister}
                            >
                                Continuar
                            </button>

                            <p className="p-4">Já tem uma conta? <Link className="text-blue-500" href="/">Faça seu login
                                aqui</Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

