import './App.css'
import Home from './pages/Home'
import Artifact from './pages/Artifact'
import {Routes, Route} from 'react-router-dom'
import ManagePersonalExhibitsPage from './pages/ManagePersonalExhibitsPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artifact/:artifact_id" element={<Artifact />} />
        <Route path="/artworks/:artworkId" element={<Artifact />} />
        <Route path="/collections" element={<ManagePersonalExhibitsPage />}/>
      </Routes>
    </>
  )
}

export default App
