import { Navigate, Route, Routes } from "react-router-dom"
// Components
import { Navbar } from "./components/Navbar"
import { AddTutorial } from "./components/AddTutorial"
import { TutorialsList } from "./components/TutorialsList"
import { Tutorial } from "./components/Tutorial"

export const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
          <Route path='/*' element={<Navigate to='/tutorials' replace />} />
        </Routes>
      </div>
    </>
  )
}
