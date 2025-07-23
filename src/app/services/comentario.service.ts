import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Comentario } from '../models/comentario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private colRef = collection(this.firestore, 'comentarios');

  constructor(private firestore: Firestore) {}

  obtenerComentariosPorCafeteria(cafeteriaId: string): Observable<Comentario[]> {
    const q = query(this.colRef, where('cafeteriaId', '==', cafeteriaId));
    return collectionData(q, { idField: 'id' }) as Observable<Comentario[]>;
  }

  agregarComentario(comentario: Comentario): Promise<any> {
    return addDoc(this.colRef, comentario);
  }

  eliminarComentario(id: string): Promise<void> {
    const docRef = doc(this.firestore, `comentarios/${id}`);
    return deleteDoc(docRef);
  }
}
