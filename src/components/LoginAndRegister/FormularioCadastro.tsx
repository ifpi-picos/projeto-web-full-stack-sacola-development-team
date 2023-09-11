import React from 'react';

interface FormularioCadastroProps {
    onChangeName?: (name: string) => void;
    onChangeUser?: (username: string) => void;
}

const FormularioCadastro: React.FC<FormularioCadastroProps> = ({onChangeName, onChangeUser}) => {

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (onChangeName) {
            onChangeName(name);
        } else {
            console.warn('Você precisa passar a prop onChange para o componente ExibirSenha');
        }
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        if (onChangeUser) {
            onChangeUser(username);
        } else {
            console.warn('Você precisa passar a prop onChange para o componente ExibirSenha');
        }
    }

    return (
        <div>


            <div className="relative mb-8" data-te-input-wrapper-init="">
                <input
                    type="text"
                    className="peer block min-h-[auto] w-full border-0 bg-transparent px-3 py-[0.40rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border-b-2 border-aliceblue-50"
                    id="nome"
                    placeholder="Seu nome"
                    autoComplete={'name'}
                    onChange={handleNameChange}
                />
                <label
                    htmlFor="nome"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.1rem] leading-[2.30] text-neutral-500 transition-all duration-200 ease-out translate-y-[-2rem] dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                    Nome
                </label>
            </div>

            <div className="relative mb-8" data-te-input-wrapper-init="">
                <input
                    type="text"
                    className="peer block min-h-[auto] w-full border-0 bg-transparent px-3 py-[0.32rem] leading-[2.30] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border-b-2 border-aliceblue-50"
                    id="nomeUsuario"
                    placeholder="Seu nome de usuário"
                    autoComplete={'username'}
                    onChange={handleUserChange}
                />
                <label
                    htmlFor="nomeUsuario"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.1rem] leading-[2.30] text-neutral-500 transition-all duration-200 ease-out translate-y-[-2rem] dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                    Nome de usuário
                </label>
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init="">

            </div>

            {/* E assim por diante para outros campos, como "Confirmar senha" */}


        </div>
    );
};

export default FormularioCadastro;
