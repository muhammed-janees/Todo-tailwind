import './App.css';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("")

  const addTasks = () => {
    if (task !== "") {
      setTasks([...tasks, task])
      setTask("");
    }
    console.log(tasks);
  }

  const deleteTasks = (index) => {
    const updatedList = [...tasks];
    updatedList.splice(index, 1)
    setTasks(updatedList)
  }

  return (
    <div className='flex flex-col items-center'>
      <div>
        <h1 className='text-4xl m-10 font-bold text-blue-700'>ToDo App</h1>
      </div>
      <div className='p-4 m-4 bg-blue-100 rounded-md'>
        <input className='p-3 caret-red-400' type="text" placeholder='Enter the Task' value={task} onChange={(e) => { setTask(e.target.value) }} />
        <button onClick={addTasks} className='bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600'>Add Task</button>
      </div>
      <div>
        {
          tasks?.length > 0 ? (
            <ul>
              {
                tasks.map((task, index) => (
                  <div className='flex bg-slate-100 m-4 py-4 pl-12 pr-4 rounded-md' key={index}>
                    <li className='self-center font-bold pr-10 mr-6 grow'>{task}</li>
                    <button onClick={() => { deleteTasks(index) }} className='bg-red-500 text-white p-2 rounded-md font-bold hover:bg-red-600'><i class="fa-solid fa-trash"></i></button>
                  </div>

                ))
              }
            </ul>
          ) : (
            <div>
              <p className='text-red-500 font-bold'>No tasks</p>
            </div>
          )

        }
      </div>
    </div>
  );
}

export default App;
