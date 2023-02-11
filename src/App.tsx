import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './Todolist';




export
    type FilterValuesType = "all" | "completed" | "active";


function App() {

    // BLL:

    //useState for tasks
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML & CSS", isDone: true },
        { id: v1(), title: "ES6 & TS", isDone: false },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
    ]);

    //useState for filter
    let [filter, setFilter] = useState<FilterValuesType>("all");







    //callback fn to delete tasks from useState
    function removeTask(id: string) {
        let removedTask = tasks.filter(t => id !== t.id)
        setTasks(removedTask);
        console.log(removedTask);
    }


    function addTask(title: string) {
        let tasksNew = [...tasks, { id: v1(), title: title, isDone: false }]
        setTasks(tasksNew)
    }





    //callback fn to change filter useState
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }




    //UI:
    return (
        <div className="App">

            <TodoList
                title="What to learn" //data props
                tasks={filteredTasks} //data props
                removeTask={removeTask} //callback props to delete task
                filteredTasks={changeFilter} //callback props 
                addTask={addTask}
            />

        </div>
    );
}




export default App;