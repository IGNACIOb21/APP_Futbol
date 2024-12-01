import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc, collection, getDocs, updateDoc,deleteDoc } from 'firebase/firestore';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { Partido } from '../models/partido';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  utilsSvc = inject(UtilsService);

  //======================  Autenticación =======================

  getAuth() {
    return getAuth();
  }

  // Servicio de inicio de sesión
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Registro de un nuevo usuario
  regidtroIn(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualización del nombre de usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // Enviar email para restablecer la contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Cerrar sesión
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/principal');
  }

  //======================  Base de Datos =======================

  // Setear un documento (crear o reemplazar)
  setDocument(path: string, data: any) {
    const db = getFirestore();
    return setDoc(doc(db, path), data);
  }

  // Obtener un documento
  async getDocument(path: string) {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, path));
    return docSnap.exists() ? docSnap.data() : null; // Verifica si el documento existe
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    const db = getFirestore();
    const userRef = collection(db, 'users'); // Referencia a la colección de usuarios
    const snapshot = await getDocs(userRef);
    return snapshot.docs.map(doc => doc.data() as User); // Mapea los documentos a objetos de tipo User
  }

  // Obtener usuarios filtrados por tipo
  async getPlayers(): Promise<User[]> {
    const db = getFirestore();
    const userRef = collection(db, 'users');
    const snapshot = await getDocs(userRef);  // Filtra los jugadores
    return snapshot.docs
      .map(doc => doc.data() as User)
      .filter(user => user.tipoUsuario === 'jugador'); // Filtra por tipoUsuario "Jugador"
  }

  // Actualizar estadísticas de un jugador
  async updatePlayerStats(playerId: string, stats: any): Promise<void> {
    const db = getFirestore();
    const playerRef = doc(db, 'users', playerId); // Referencia al documento del jugador
    await updateDoc(playerRef, stats);  // Actualiza el documento con las estadísticas
  }

  async getPlayerStats(playerId: string): Promise<any> {
    const db = getFirestore();
    const playerRef = doc(db, 'users', playerId);
    const playerSnap = await getDoc(playerRef);
    return playerSnap.exists() ? playerSnap.data() : null; // Devuelve las estadísticas del jugador
  }

  async getLoggedUserId(): Promise<string | null> {
    const user = getAuth().currentUser; // Obtiene al usuario autenticado
    return user ? user.uid : null; // Devuelve el UID o null si no hay sesión activa
  }
  
  
  async getAllPartidos(): Promise<Partido[]> {
    const db = getFirestore();
    const partidosRef = collection(db, 'partidos'); // Referencia a la colección de partidos
    const snapshot = await getDocs(partidosRef);
  
    return snapshot.docs.map(doc => doc.data() as Partido);
  }


async deleteDocument(path: string): Promise<void> {
  const db = getFirestore();
  const docRef = doc(db, path); // Referencia al documento
  await deleteDoc(docRef); // Eliminar el documento
}


  
}
