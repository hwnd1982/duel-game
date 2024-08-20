import { useRef } from 'react'
import { StatusBar } from '../features'
import { Canvas, Portal } from '../widgets'

export const App = () => {
  const ref = useRef(null);
  
  return (
    <>
      <StatusBar />
      <Canvas ref={ref} />
      <Portal />
    </>
  )
}

export default App;
