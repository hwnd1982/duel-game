import { useRef } from 'react'
import { Canvas, Portal, StatusBar } from '../features'

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
