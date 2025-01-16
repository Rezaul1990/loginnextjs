import { auth, db } from './config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';

// Auth services
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  return await signOut(auth);
};

// Todo services
export const addTodo = async (userId: string, title: string) => {
  return await addDoc(collection(db, 'todos'), {
    userId,
    title,
    completed: false,
    createdAt: new Date().toISOString()
  });
};

export const updateTodo = async (todoId: string, completed: boolean) => {
  const todoRef = doc(db, 'todos', todoId);
  return await updateDoc(todoRef, { completed });
};

export const deleteTodo = async (todoId: string) => {
  const todoRef = doc(db, 'todos', todoId);
  return await deleteDoc(todoRef);
};

export const getTodos = async (userId: string) => {
  const q = query(collection(db, 'todos'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}; 