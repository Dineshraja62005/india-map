import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <dev className="App">
      <header>
        <h1>PFAS Contamination Map - India</h1>
      </header>
      <main>
        <p>The map will go here soon.</p>
      </main>
      <footer>
        <p>Data Sources | About</p>
      </footer>
    </dev>
  )
}

export default App
