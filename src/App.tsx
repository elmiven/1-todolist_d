import React from 'react';
import './App.css';
import {TodoList} from './Todolist';



// BLL:
function App() {

    //const todoListTitle: string = "What to learn";

    const tasks = [
        { id: 1, title: "HTML & CSS", isDone: true },
        { id: 2, title: "ES6 & TS", isDone: false },
        { id: 3, title: "React", isDone: false },
        { id: 4, title: "Redux", isDone: false },
    ]

    //UI:
    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasks} />
        </div>
    );
}

export default App;