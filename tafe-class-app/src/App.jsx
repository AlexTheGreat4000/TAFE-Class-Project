import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route, Outlet, Link } from "react-router-dom"

import { Header } from './components/Header'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Logout } from './pages/Logout'
import { Home } from './pages/Home'
import { firebaseConfig } from './config/config'
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { AuthContext } from './contexts/AuthContext'
import { getFirestore } from 'firebase/firestore'
import { FirestoreContext } from './contexts/FirestoreContext'

function App() {
  const [auth, setAuth] = useState()

  const FirebaseApp = initializeApp(firebaseConfig)
  const FirebaseAuth = getAuth(FirebaseApp)
  const Firestore = getFirestore(FirebaseApp)

  onAuthStateChanged(FirebaseAuth, (user) => {
    if (user) {
      setAuth(user)
    }
    else {
      setAuth(null)
    }
  })

  return (
    <>
      <AuthContext.Provider value={auth}>
        <FirestoreContext.Provider value={Firestore}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup authapp={FirebaseAuth} />} />
            <Route path="/Signin" element={<Signin authapp={FirebaseAuth} />} />
            <Route path="/Logout" element={<Logout authapp={FirebaseAuth} />} />
          </Routes>
        </FirestoreContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
