import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

export function watchAuthState(callback) {
  onAuthStateChanged(auth, callback);
}

export function logout() {
  return signOut(auth);
}
