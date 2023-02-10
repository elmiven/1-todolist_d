import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './Todolist';




export
    type FilterValuesType = "all" | "completed" | "active";


function App() {

    // BLL:

    //useState for tasks
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML & CSS", isDone: true },
        { id: 2, title: "ES6 & TS", isDone: false },
        { id: 3, title: "React", isDone: false },
        { id: 4, title: "Redux", isDone: false },
    ]);

    //useState for filter
    let [filter, setFilter] = useState<FilterValuesType>("all");







    //callback fn to delete tasks from useState
    function removeTask(id: number) {
        let removedTask = tasks.filter(t => id !== t.id)
        setTasks(removedTask);
        console.log(removedTask);
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
            />

        </div>
    );
}




export default App;