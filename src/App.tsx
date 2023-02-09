import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';


function App() {

// BLL:
    let initTasks = [
        { id: 1, title: "HTML & CSS", isDone: true },
        { id: 2, title: "ES6 & TS", isDone: false },
        { id: 3, title: "React", isDone: false },
        { id: 4, title: "Redux", isDone: false },
    ]


    let arr = useState(initTasks);
    let tasks = arr[0];
    let setTasks = arr[1];


    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
        console.log(filteredTasks);
    }

    //UI:
    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasks} removeTask={removeTask} />
        </div>
    );
}

export default App;