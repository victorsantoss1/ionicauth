import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(private afAuth: AngularFireAuth, private firestoreService: FirestoreService ) { }

  // Obter o usuário atual
  async getCurrentUser(): Promise<firebase.User | null> {
    return await this.afAuth.currentUser;
  }

  // Registrar um novo usuário
  async registerUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Fazer login de um usuário existente
  async loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Redefinir a senha do usuário
  async resetPassword(email: string): Promise<void> {
    return await this.afAuth.sendPasswordResetEmail(email);
  }

  // Fazer logout
  async signOut(): Promise<void> {
    return await this.afAuth.signOut();
  }

  // Obter o perfil do usuário atual
  async getProfile(): Promise<firebase.User | null> {
    return await this.afAuth.currentUser;
  }


// Atualizar o nome do usuário
async updateUserName(newName: string): Promise<void> {
  const user = await this.getCurrentUser();
  if (user) {
    // Verifica se o nome é válido
    if (!newName || typeof newName !== 'string') {
      return Promise.reject('Nome inválido');
    }

    // Atualiza o nome do usuário no Firebase Authentication
    await user.updateProfile({ displayName: newName });

    // Atualiza o nome do usuário no Firestore
    await this.firestoreService.updateDocument('users', user.uid, { fullname: newName });
  } else {
    return Promise.reject('Sem usuário logado');
  }
}
  

  // Excluir o usuário atual
  async deleteUser(): Promise<void> {
    const user = await this.getProfile();
    if (user) {
      return user.delete();
    } else {
      return Promise.reject('Sem usuario logado');
    }
  }
}
