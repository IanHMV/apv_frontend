import { Outlet } from "react-router-dom"

const Layout = ()=> {
  return (
    <>
        <main className='container mx-auto mt-12 gap-10 p-5 items-center md:grid md:grid-cols-2 md:gap-20'>
          <Outlet />
        </main>
    </>
  )
}

export default Layout