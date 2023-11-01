import { useState } from "react";
import React from 'react'
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

function CreateTask({ tasks, setTasks }) {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    });

    console.log(task);

    const handleSubmit = (e) => {

        e.preventDefault();
        if (task.name.length < 3)
            return toast.error("Task must contain more then 3 character")
        if (task.name.length > 100)
            return toast.error("Task must not be more then 100 character")

        setTasks((prev) => {
            const list = [...prev, task];
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })

        toast.success("Task created")

        setTask({
            id: "",
            name: "",
            status: "todo"
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className='border-2 border-slate-400 bg-slate-100 px-1 mr-4 w-64 h-14 rounded-md' value={task.name} onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} />
            <button className='bg-cyan-500 rounded-md text-white px-4 h-12'>Create</button>
        </form>
    )
}

export default CreateTask