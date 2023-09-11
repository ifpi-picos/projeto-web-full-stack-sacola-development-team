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
// import {addUserDocument} from "@/core/Services/RegisterService/Register";

// Define o idioma padrão do auth
auth.useDeviceLanguage();

export default function useAuth() {


    // Funções de ‘login’
    async function login(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("logged in")
        } catch (e: any) {
            console.log(e.code)
            if (e.code === "auth/user-not-found") {
                console.log("user not found")
            } else if (e.code === "auth/wrong-password") {
                console.log("wrong password")
            } else if (e.code === "auth/invalid-email") {
                console.log("invalid email")
            }
        }
    }


    // Funções de ‘cadastro’
    async function register(name: string, username: string, email: string, password: string) {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user

            const player = new Player(user.uid, name, username, email, '')

            // await addUserDocument(player)

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
            const player = new Player(
                user.uid,
                user.displayName,
                '',
                user.email,
                user.photoURL,
                [],
                []
            )

            await addDoc(collection(db, "players"), {
                player: player.toJSON()
            })

        } catch (e: any) {
            console.log(e.code)
            if (e.code === "auth/account-exists-with-different-credential") {
                console.log("account exists with different credential")
            } else if (e.code === "auth/invalid-credential") {
                console.log("invalid credential")
            } else if (e.code === "auth/operation-not-allowed") {
                console.log("operation not allowed")
            } else if (e.code === "auth/user-disabled") {
                console.log("user disabled")
            } else if (e.code === "auth/user-not-found") {
                console.log("user not found")
            } else if (e.code === "auth/wrong-password") {
                console.log("wrong password")
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
            console.log("logged out")
            window.location.href = '/'
        } catch (e: any) {
            console.log(e.code)
            if (e.code === "auth/no-current-user") {
                console.log("no current user")
            }
        }
    }


    return {
        login,
        register,
        loginOrRegisterWithGoogle,
        forgotPassword,
        logout
    }
}