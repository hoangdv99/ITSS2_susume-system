import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [flag, setFlag] = useState(false)
  const [loading, setLoading] = useState(true);

  async function signup(name, email, password, phone, accountBalance) {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await firestore.collection("users").doc(user.user.uid).set({
      id: user.user.uid,
      name,
      email,
      phone,
      accountBalance,
    });
  }

  async function getBalance(id){
    let result = []
    await firestore.collection('users').where('id', '==' ,id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push(doc.data().accountBalance);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return result[0]
  }
  async function addMoneyToAccount(id, accountBalance){
    await firestore.collection("users").doc(id).update(
      {
        accountBalance: accountBalance
      }
    )

    setFlag(!flag)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [flag]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getBalance,
    addMoneyToAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
