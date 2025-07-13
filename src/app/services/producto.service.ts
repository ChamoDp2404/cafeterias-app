import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, docData, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private colRef = collection(this.firestore, 'productos');

  constructor(private firestore: Firestore) {}

  // Obtener productos por cafetería
  getProductosPorCafeteria(cafeteriaId: string): Observable<Producto[]> {
    const q = query(this.colRef, where('cafeteriaId', '==', cafeteriaId));
    return collectionData(q, { idField: 'id' }) as Observable<Producto[]>;
  }

  // Obtener un producto por ID
  getProductoById(id: string): Observable<Producto> {
    const docRef = doc(this.firestore, `productos/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Producto>;
  }

  // Agregar nuevo producto
  addProducto(producto: Producto): Promise<any> {
    return addDoc(this.colRef, producto);
  }

  // Actualizar producto
  updateProducto(id: string, producto: Producto): Promise<void> {
    const docRef = doc(this.firestore, `productos/${id}`);
    return updateDoc(docRef, { ...producto });
  }

  // Eliminar producto
  deleteProducto(id: string): Promise<void> {
    const docRef = doc(this.firestore, `productos/${id}`);
    return deleteDoc(docRef);
  }
}
