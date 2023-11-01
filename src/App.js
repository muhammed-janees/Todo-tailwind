import './App.css';
import { useEffect, useState } from 'react';
import CreateTask from './Components/CreateTask';
import ListTasks from './Components/ListTasks';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(prev=>{
      const list = JSON.parse(localStorage.getItem("tasks"))
      if(list!=null)return list
      return []
    })
  }, [])

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className='bg-slate-100 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16'>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>

  );
}

export default App;
