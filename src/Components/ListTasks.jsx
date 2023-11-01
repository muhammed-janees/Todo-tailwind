import React, { useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';

function ListTasks({ tasks, setTasks }) {
    const [todo, setTodo] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter((task) => task.status === "todo")
        const fCompleted = tasks.filter((task) => task.status === "completed")

        setTodo(fTodos)
        setCompleted(fCompleted)

    }, [tasks])

    const statuses = ["todo", "completed"]

    return (
        <div className='flex flex-col md:flex-row md:flex-wrap gap-16'>
            {
                statuses.map((status, index) => (
                    <Section
                        key={index}
                        status={status}
                        tasks={tasks}
                        setTasks={setTasks}
                        todo={todo}
                        completed={completed}
                    />
                ))
            }
        </div>
    )
}

export default ListTasks;

const Section = ({ status, tasks, setTasks, todo, completed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item)=>addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = "bg-red-500";
    let taskToMap = todo;

    if (status === "completed") {
        text = "Completed";
        bg = "bg-green-500"
        taskToMap = completed
    }

    const addItemToSection = (id)=>{
        setTasks(prev =>{
            const mTask = prev.map(t=>{
                if(t.id === id){
                    return{...t,status:status}
                }
                return t
            })
            localStorage.setItem("tasks", JSON.stringify(mTask))
            return mTask;
        })
    }

    return (
        <div ref={drop} className={`w-64 rounded-md p-2${isOver?"bg-slate-200":""}`}>
            <Header text={text} bg={bg} count={taskToMap.length} />
            {taskToMap.length > 0 && taskToMap.map((task) => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md text-white text-sm uppercase`}>
            {text} {" "}
            <div className='ml-2 bg-white text-black w-5 h-5 rounded-full flex items-center justify-center'>{count}</div>
        </div>
    )
}

const Task = ({ task, tasks, setTasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleRemove = (id) => {
        const fTasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(fTasks));
        setTasks(fTasks);
        toast.error("Task removed")
    }

    return (
        <div ref={drag} className={` relative shadow-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"} mt-4 p-4 rounded-md`}>
            <p className='me-16'>{task.name}</p>
            <button className='text-red-500 absolute bottom-2 right-1' onClick={() => handleRemove(task.id)}><i class="fa-solid fa-trash-can"></i></button>
        </div>
    )
}