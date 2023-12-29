import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  limit as limitQuery,
} from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { Resource, ResourceCreate } from './Resource';
import { Repository } from './Repository';

export class FirebaseRepository<T extends Resource> implements Repository<T> {
  constructor(
    protected readonly firestore: Firestore,
    protected readonly collectionName: string
  ) {}

  listen(callback: (resources: T[]) => void): () => void {
    const q = query(
      collection(this.firestore, this.collectionName),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T))
      );
    });
  }

  async getAll(limit = 10): Promise<T[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      orderBy('createdAt', 'desc'),
      limitQuery(limit)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  }

  async get(id: string): Promise<T | undefined> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return undefined;
  }

  async create(resource: ResourceCreate<T>): Promise<T> {
    const docRef = await addDoc(
      collection(this.firestore, this.collectionName),
      {
        ...resource,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );
    return { id: docRef.id, ...resource } as T;
  }

  async update(id: string, resource: Omit<T, 'id'>): Promise<T> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await setDoc(docRef, {
      ...resource,
      updatedAt: serverTimestamp(),
    });
    return { ...resource, id: docRef.id } as T;
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, this.collectionName, id));
  }

  async getAllBy(field: string, value: string, limit = 8): Promise<T[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where(field, '==', value),
      orderBy('createdAt', 'desc'),
      limitQuery(limit)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  }

  async search(field: string, value: string): Promise<T[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where(field, '>=', value),
      where(field, '<=', value + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    const categories: T[] = [];
    querySnapshot.forEach((doc) => {
      categories.push({ ...doc.data(), id: doc.id } as T);
    });
    return categories;
  }

  async getResource<R extends Resource>(
    resourceName: string,
    id: string
  ): Promise<R> {
    const docRef = doc(this.firestore, resourceName, id);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as R;
  }

  async getResourceList<R extends Resource>(
    resourceName: string
  ): Promise<R[]> {
    const q = query(
      collection(this.firestore, resourceName),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as R));
  }
}
