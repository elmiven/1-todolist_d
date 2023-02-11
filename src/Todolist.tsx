import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';


type PropsType = {
    title: string,
    tasks: TaskType[], //or better Array<TaskType> (generic)
    removeTask: (id: string) => void,  //bad to desctibe type as Function 
    filteredTasks: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
}

export
    type TaskType = {
        id: string,
        title: string,
        isDone: boolean,
    }








export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const taskTitileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key == "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
            alert(`you added new task "${e.currentTarget.value}"`)
        }
    }

    const addTaskHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }

    const filteAllHandler = () => { props.filteredTasks("all") }
    const filteActiveHandler = () => { props.filteredTasks("active") }
    const filteCompletedHandler = () => { props.filteredTasks("completed") }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input type="text" placeholder="enter new task"
                value={newTaskTitle}
                onChange={taskTitileHandler}
                onKeyDown={keyDownHandler}
            />
            <button onClick={addTaskHandler} >+</button>
        </div>


        <ul>
            {props.tasks.map(t => {
                const removeTaskHandler = () => { props.removeTask(t.id) }
                        return ( 
                        <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )}
            )}
        </ul>


        <div>
            <button onClick={filteAllHandler}>All</button>
            <button onClick={filteActiveHandler}>Active</button>
            <button onClick={filteCompletedHandler}>Completed</button>
        </div>
    </div>


};

// export default TodoList;