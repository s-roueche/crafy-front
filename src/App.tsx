import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [data, setData] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000')
            .then(res => res.text())
            .then(setData)
            .catch(console.error);
    }, [])

  return (
    <div>
        {data}
    </div>
  )
}

export default App
