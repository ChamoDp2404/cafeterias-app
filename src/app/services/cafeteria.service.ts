import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cafeteria } from '../models/cafeteria.model';

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {

  private colRef = collection(this.firestore, 'cafeterias');

  constructor(private firestore: Firestore) {}

  getCafeterias(): Observable<Cafeteria[]> {
    return collectionData(this.colRef, { idField: 'id' }) as Observable<Cafeteria[]>;
  }

  getCafeteriaById(id: string): Observable<Cafeteria> {
    const docRef = doc(this.firestore, `cafeterias/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Cafeteria>;
  }

  addCafeteria(cafeteria: Cafeteria): Promise<any> {
    return addDoc(this.colRef, cafeteria);
  }

  updateCafeteria(id: string, cafeteria: Cafeteria): Promise<void> {
    const docRef = doc(this.firestore, `cafeterias/${id}`);
    return updateDoc(docRef, { ...cafeteria });
  }

  deleteCafeteria(id: string): Promise<void> {
    const docRef = doc(this.firestore, `cafeterias/${id}`);
    return deleteDoc(docRef);
  }
}
