'use client'

import {Button, Flex, FormControl, Heading, Input, Stack, Text,} from '@chakra-ui/react'
import Link from 'next/link'
import {useRef, useState} from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Main/loading";
import {SweetAlerts} from "@/components/Utils/SweetAlerts";


export default function FormularioEsqueceuSenha() {

    const {forgotPassword} = useAuth();
    const emailRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    function loading(value: boolean = false) {
        setIsLoading(value)
    }

    async function handleForgotPassword() {
        if (!emailRef.current?.value) {
            return alert('Preencha o campo de email')
        }

        loading(true);

        try {
            const res = await forgotPassword(emailRef.current?.value);
            if (res !== 'Sucess') {
                throw new Error(res?.valueOf());
            }
            await SweetAlerts('success', 'Sucesso', 'Email enviado com sucesso!');
        } catch (error: any) {
            await SweetAlerts('error', 'Erro', error.message);
        } finally {
            loading(false);
        }
    }

    return (


        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Loading isLoading={isLoading}/>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}

                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}
                         className='flex justify-center items-center text-xl p-10'>
                    Esqueceu sua senha?
                </Heading>
                <Text className='flex justify-center items-center  p-2'
                      fontSize={{base: 'sm', sm: 'md'}}
                >
                    Você receberá um link para redefinir sua senha
                </Text>
                <FormControl id="email" className='flex items-center justify-center'>
                    <Input
                        type="text"
                        className="peer block min-h-[auto] w-full  border-0 bg-transparent px-3  leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-1 border-b-2 border-aliceblue-50"
                        id="email"
                        placeholder="seu-email@exemplo.com"
                        ref={emailRef}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button className="bg-gray-400  text-white font-bold py-2 px-4 mt-2 rounded-sm"
                            onClick={handleForgotPassword}>
                        Enviar
                    </Button>
                    <Link href="/"
                          className="text-sm text-white  hover:underline pt-2 flex justify-end items-center px-2">

                        Voltar para o login
                    </Link>
                </Stack>
            </Stack>
        </Flex>


    )
}

