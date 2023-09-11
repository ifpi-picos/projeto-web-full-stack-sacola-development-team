import useAuth from "@/hooks/useAuth";
import {FormEvent, useRef, useState} from "react";
import ExibirSenha from "../components/LoginAndRegister/ExibirSenha";
import Link from "next/link";
import GoogleButton from "@/components/LoginAndRegister/GoogleButton";
import Loading from "@/components/Main/loading";
import {SweetAlerts} from "@/components/Utils/SweetAlerts";

export default function Home() {
    const {login, loginOrRegisterWithGoogle} = useAuth();

    const emailRef = useRef<HTMLInputElement>(null);
    const [passwordRef, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };

    function loading(value: boolean = false) {
        setIsLoading(value);
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (!emailRef.current?.value || !passwordRef) {
            return SweetAlerts("error", "Erro", "Preencha todos os campos!");
        }

        loading(true);

        try {
            const email = emailRef.current?.value;
            await login(email, passwordRef);
            window.location.href = "/MainPages/mainPage";
        } catch (error) {
            await SweetAlerts("error", "Erro", "Erro ao fazer login!");
        } finally {
            loading(false);
        }
    }

    async function handleLoginWithGoogle() {
        loading(true);
        try {
            await loginOrRegisterWithGoogle();
            window.location.href = "/teste";
        } catch (error) {
            await SweetAlerts("error", "Erro", "Erro ao fazer login com o Google!");
        } finally {
            loading(false);
        }
    }

    return (
        <section className="h-screen">
            <Loading isLoading={isLoading}/>

            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between ">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <header className="flex flex-col gap-4 w-full max-w-[350px] pl-16">
                            <h1 className="font-sans text-4xl font-bold text-aliceblue-50 pl-4 ">
                                GameMate
                            </h1>
                            <p className="font-sans font-normal text-base text-aliceblue-50">
                                A melhor plataforma para encontrar jogadores e jogar com seus
                                amigos.
                            </p>
                        </header>
                    </div>

                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 h-max">
                        <form>
                            <div className="relative mb-6" data-te-input-wrapper-init="">
                                <input
                                    type="text"
                                    className="peer block min-h-[auto]
                                    w-full
                                    border-0
                                    bg-transparent
                                     px-3
                                      py-[0.32rem]
                                       leading-[2.15]
                                        outline-none
                                         transition-all
                                          duration-200 ease-linear
                                           focus:placeholder:opacity-100
                                            data-[te-input-state-active]:placeholder:opacity-100
                                             motion-reduce:transition-none
                                              dark:text-neutral-200
                                               dark:placeholder:text-neutral-200
                                                [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0
                                                 border-b-2 border-aliceblue-50"
                                    id="email"
                                    placeholder="Seu email"
                                    autoComplete={"email"}
                                    ref={emailRef}
                                />
                                <label
                                    htmlFor="exampleFormControlInput3"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out translate-y-[-2.5rem]  dark:text-neutral-200 dark:peer-focus:text-primary"
                                >
                                    Email
                                </label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init="">
                                <ExibirSenha
                                    inputLabelName={"Senha"}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="mb-6 flex items-center justify-end">
                                <Link
                                    href="/src/pages/esqueceu"
                                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 hover:underline focus:underline active:underline"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="bg-gray-400 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init=""
                                data-te-ripple-color="light"
                                onClick={handleLogin}
                            >
                                Entrar
                            </button>

                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    OU
                                </p>
                            </div>

                            <div
                                className=" bg-aliceblue-50 mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                role="button"
                                data-te-ripple-init=""
                                data-te-ripple-color="light"
                                onClick={handleLoginWithGoogle}
                            >
                                <GoogleButton/>
                            </div>
                            <h3 className="flex justify-center items-center gap-1">
                                Ou se preferir
                                <Link href="/cadastro" className="font-bold">
                                    Cadastre-se
                                </Link>
                            </h3>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
