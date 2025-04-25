import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="min-h-screen bg-black">
        {/* Aquí mete el resto de los componentes de los routes */}
        <Outlet/>
      </main>        
    </>
  )
}

export default AuthLayout