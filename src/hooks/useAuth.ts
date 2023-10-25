import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import Player from "@/core/Player";
import { addUserDocument } from "@/services/registerService";

// Define o idioma padrão do auth
auth.useDeviceLanguage();

export default function useAuth() {
  const provider = new GoogleAuthProvider();

  // Funções de ‘login’
  async function login(email: string, password: string) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      if (user) {
        user.getIdToken().then(async (token) => {
          localStorage.setItem("acessToken", token);
        });
        return "Sucess";
      } else {
        throw new Error("Usuário não encontrado!");
      }
    } catch (e: any) {
      if (e.code === "auth/user-not-found") {
        throw new Error("Usuário não encontrado!");
      } else if (e.code === "auth/wrong-password") {
        throw new Error("Senha incorreta!");
      } else if (e.code === "auth/invalid-email") {
        throw new Error("Email inválido!");
      } else {
        return e.message;
      }
    }
  }

  // Funções de ‘cadastro’
  async function register(
    name: string,
    username: string,
    email: string,
    password: string,
    photoURL: string
  ) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if (user) {
        user.getIdToken().then(async (token) => {
          localStorage.setItem("acessToken", token);
          const player = new Player(user.uid, name, username, email, photoURL);
          await addUserDocument(player, token);
        });
        return "Sucess";
      } else {
        throw new Error("Usuário não encontrado!");
      }
    } catch (e: any) {
      if (e.code === "auth/email-already-in-use") {
        return "Email já cadastrado!";
      } else if (e.code === "auth/invalid-email") {
        return "Email inválido!";
      } else if (e.code === "auth/weak-password") {
        return "Senha fraca!";
      } else {
        await auth.currentUser?.delete();
        return e.message;
      }
    }
  }

  // Funções de ‘login’ e ‘cadastro’ com o Google
  async function loginOrRegisterWithGoogle() {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);

      if (credential === null) throw new Error("credential is null");

      const user = res.user;

      if (user === null) throw new Error(user);

      if (user) {
        user.getIdToken().then(async (token) => {
          localStorage.setItem("acessToken", token);
          const player = new Player(
            user.uid,
            user.displayName,
            "",
            user.email,
            user.photoURL,
            [],
            []
          );
          await addUserDocument(player, token);
        });
        return true;
      } else {
        throw new Error("Usuário não encontrado!");
      }
    } catch (e: any) {
      console.log(e.code);
      if (e.code === "auth/account-exists-with-different-credential") {
        throw new Error("Conta já existe com credenciais diferentes!");
      } else if (e.code === "auth/invalid-credential") {
        throw new Error("Credencial inválida!");
      } else if (e.code === "auth/operation-not-allowed") {
        throw new Error("Operação não permitida!");
      } else if (e.code === "auth/user-disabled") {
        throw new Error("Usuário desabilitado!");
      } else if (e.code === "auth/user-not-found") {
        throw new Error("Usuário não encontrado!");
      }
    }
  }

  // Função de ‘esqueci minha senha’
  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Sucess";
    } catch (e: any) {
      if (e.code === "auth/invalid-email") {
        return "Email inválido!";
      } else if (e.code === "auth/user-not-found") {
        return "Usuário não encontrado!";
      }
    }
  }

  // Função de logout
  async function logout() {
    try {
      await auth.signOut();
      localStorage.removeItem("acessToken");
      window.location.href = "/";
    } catch (e: any) {
      console.log(e.code);
      if (e.code === "auth/no-current-user") {
        console.log("no current user");
      }
    }
  }

  // User is logged in
  async function isLogged() {
    return localStorage.getItem("acessToken") !== null;
  }

  // Pick the user from local storage
  async function getUser() {
    return localStorage.getItem("acessToken");
  }

  return {
    login,
    register,
    loginOrRegisterWithGoogle,
    forgotPassword,
    logout,
    isLogged,
    getUser,
  };
}
