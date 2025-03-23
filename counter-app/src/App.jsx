import './App.css'
import { useState } from 'react';
function App() {
  const [count , setCount] = useState(0)

  const increment = () => {
   setCount(prev => prev+1)
  }
  const decrement = () => {
    setCount(prev => prev-1)
   }
  return(
    <div className='App'>
    <header className='App-header'>
    <h1>
      COUNT : {count}
    </h1>
    <hr/>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>

    </header>
  </div>
  );
    
}

export default App
