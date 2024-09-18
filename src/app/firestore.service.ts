// firestore.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Obter uma coleção do Firestore
  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }

  // Adicionar um documento a uma coleção
  addDocument(collectionName: string, data: any) {
    return this.firestore.collection(collectionName).add(data);
  }

  // Atualizar um documento em uma coleção
  async updateDocument(collection: string, docId: string, data: any): Promise<void> {
    return this.firestore.collection(collection).doc(docId).update(data);
  }

  // Excluir um documento de uma coleção
  async deleteDocument(collection: string, documentId: string): Promise<void> {
    return this.firestore.collection(collection).doc(documentId).delete();
  }
}
