import {auth, db} from "@/firebase/firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from "@firebase/auth";
import {addDoc, collection,} from "firebase/firestore";
import Player from "@/core/Player";
import {addUserDocument} from "@/services/registerService";


// Define o idioma padrão do auth
auth.useDeviceLanguage();

export default function useAuth() {

    // Funções de ‘login’
    async function login(email: string, password: string) {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('user', JSON.stringify(user))
        } catch (e: any) {
            if (e.code === "auth/user-not-found") {
                throw new Error('Usuário não encontrado!')
            } else if (e.code === "auth/wrong-password") {
                throw new Error('Senha incorreta!')
            } else if (e.code === "auth/invalid-email") {
                throw new Error('Email inválido!')
            }
        }
    }


    // Funções de ‘cadastro’
    async function register(name: string, username: string, email: string, password: string) {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user

            const player = new Player(user.uid, name, username, email, '')

            await addUserDocument(player)

            localStorage.setItem('user', JSON.stringify(user))
            return 'Sucess'

        } catch (e: any) {
            if (e.code === "auth/email-already-in-use") {
                return 'Email já cadastrado!'
            } else if (e.code === "auth/invalid-email") {
                return 'Email inválido!'
            } else if (e.code === "auth/weak-password") {
                return 'Senha fraca!'
            } else {
                await auth.currentUser?.delete()
                return e.message;
            }
        }
    }

    //Função de ‘login’/cadastro' com o google
    const provider = new GoogleAuthProvider();

    async function loginOrRegisterWithGoogle() {
        try {
            const res = await signInWithPopup(auth, provider)
            const user = res.user
            if (user === null) throw new Error(user)
            const player = new Player(
                user.uid,
                user.displayName,
                '',
                user.email,
                user.photoURL,
                [],
                []
            )

            await addUserDocument(player)

            localStorage.setItem('user', JSON.stringify(user))
        } catch (e: any) {
            console.log(e.code)
            if (e.code === "auth/account-exists-with-different-credential") {
                throw new Error('Conta já existe com credenciais diferentes!')
            } else if (e.code === "auth/invalid-credential") {
                throw new Error('Credencial inválida!')
            } else if (e.code === "auth/operation-not-allowed") {
                throw new Error('Operação não permitida!')
            } else if (e.code === "auth/user-disabled") {
                throw new Error('Usuário desabilitado!')
            } else if (e.code === "auth/user-not-found") {
                throw new Error('Usuário não encontrado!')
            }
        }
    }

    // Função de ‘esqueci minha senha’
    async function forgotPassword(email: string) {
        try {
            await sendPasswordResetEmail(auth, email)
            return 'Sucess'
        } catch (e: any) {
            if (e.code === "auth/invalid-email") {
                return 'Email inválido!'
            } else if (e.code === "auth/user-not-found") {
                return 'Usuário não encontrado!'
            }
        }
    }

    // Função de logout
    async function logout() {
        try {
            await auth.signOut()
            localStorage.removeItem('user')
            window.location.href = '/'
        } catch (e: any) {
            console.log(e.code)
            if (e.code === "auth/no-current-user") {
                console.log("no current user")
            }
        }
    }


    // User is logged in
    async function isLogged() {
        const user = localStorage.getItem('user')
        return !!user;
    }


    return {
        login,
        register,
        loginOrRegisterWithGoogle,
        forgotPassword,
        logout,
        isLogged
    }
}