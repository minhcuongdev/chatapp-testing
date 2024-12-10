import { Outlet } from "react-router-dom"

const LayoutRoot = () => {
  return (
    <div className="w-[70%] mx-auto h-screen">
      <Outlet />
    </div>
  )
}

export default LayoutRoot
