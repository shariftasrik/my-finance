import { useState } from 'react'
import {Navigate, Outlet, Route, Routes} from "react-router-dom"
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/settings";
import AccountPage from "./pages/account-page";
import Transactions from "./pages/transactions";
import { useStore } from 'zustand';

const RootLayout = ()=> {
  const {user} = useStore((state)=> state);
  console.log(user);

  return !user ? (
    <Navigate to="sign-in" replace={true}/>) : 
    (<>
    <div>
      <Outlet/>
    </div>
  </>
  );
};


function App() {
  const [count, setCount] = useState(0)

  return (
   <main>
      <div>
        <Routes>
          <Route element={<RootLayout/>}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashboard/>} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/account" element={<AccountPage/>} />
          </Route>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Routes>
      </div>
   </main>
  )
}

export default App;
