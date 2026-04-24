import Header from "./components/homeComp/Header"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Footer from "./components/homeComp/Footer"
import Skills from "./Pages/Skills"
import { Route ,Routes } from "react-router-dom"
import Projects from "./Pages/Projects"
import Gallery from "./Pages/Gallery"
import Resume from "./Pages/Resume"
import Certificate from "./Pages/Certificate"
import Contact from "./Pages/Contact"
function App() {
  

  return (
    //Pushes the footer to the bottom when content is short.
    <>
     <Header  />
     <div className="min-h-screen flex flex-col">
     <main className="flex-grow ">
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="about" element={<About/>} />
      <Route path="skills" element={<Skills/>}/>
      <Route path="projects" element={<Projects/>}/>
      <Route path="gallery" element={<Gallery/>}/>
      <Route path="resume" element={<Resume/>}/>
      <Route path="certificate" element={<Certificate/>}/>
      <Route path="contact" element={<Contact/>}/>
     </Routes>
     </main>
     <Footer/>
     </div>
    </>
  )
}

export default App
