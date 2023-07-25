import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Input } from './components/Input';
import { Button } from './components/Button';
const inititalState = {
  todos: [],
  loading: false,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {...state, todos: action.payload}
      case 'ON_LOADING':
        return {...state, loading: action.payload}
    default: 
      return state
  }
}; // reducerFn всегада чистый функция болуш керек
function App() {
  const [state, dispatch] = useReducer(reducer, inititalState);
  const [value, setValue] = useState('');
  const onHandleAddItem = async () => {
    await fetch('https://todo-6ff31-default-rtdb.firebaseio.com/todo.json', {
      method: 'POST',
      body: JSON.stringify(value),
    });
getUserData()
  };

  const getUserData =async()=>{
    dispatch({type: 'ON_LOADING', payload: true})
    const response =await fetch('https://todo-6ff31-default-rtdb.firebaseio.com/todo.json')

    const result = await response.json();

    const data = result ? Object.entries(result).map(([id, value])=>{
      return {
        id, 
        value,
      }

    }) : []
dispatch ({type: 'SET_TODOS', payload: data})
dispatch({type: 'ON_LOADING', payload: false})

  }
  


useEffect(()=>{   //useEffect только mount та иштейт
  getUserData()
}, [])

if (state.loading){
  return <h2>Loading...</h2>
}

const onHandleDeleteClick=async(id)=>{
  await fetch(`https://todo-6ff31-default-rtdb.firebaseio.com/todo/${id}.json`,
  {
    method: 'DELETE',
  })
  getUserData()
}

  return (
    <div className="App">
      <Input value={value} onChange={(e) => setValue(e.target.value)}></Input>
      <Button onClick={onHandleAddItem}>Add</Button>
      {state.todos.map((item)=>{
return <li key={item.id}>{item.value}
<button onClick={()=>onHandleDeleteClick(item.id)}>delete</button>  
</li>

})}
    
    </div>
  );
}
export default App;
