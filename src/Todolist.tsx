import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';


type PropsType = {
    title: string,
    tasks: TaskType[], //or better Array<TaskType> (generic)
    removeTask: (id: string) => void,  //bad to desctibe type as Function 
    filteredTasks: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeTaskStatus: (a: string, b: boolean) => void
    filter: FilterValuesType
}

export
    type TaskType = {
        id: string,
        title: string,
        isDone: boolean,
    }








export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null) //or empty string


    const taskTitileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
        if (newTaskTitle.trim() ==="") {
            setError("Title is required")
            return
        }
        props.addTask(newTaskTitle.trim());
        setNewTaskTitle("");
    }

    const filteAllHandler = () => { props.filteredTasks("all") }
    const filteActiveHandler = () => { props.filteredTasks("active") }
    const filteCompletedHandler = () => { props.filteredTasks("completed") }
    





    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? "error" : ""} 
                type="text" placeholder="enter new task"
                value={newTaskTitle}
                onChange={taskTitileHandler}
                onKeyDown={keyDownHandler}
            />
            <button onClick={addTaskHandler} >+</button>
            { error && <div className="error-message">{error}</div>}

        </div>


        <ul>
            {props.tasks.map(t => {
                const removeTaskHandler = () => { props.removeTask(t.id) }
                const onChangeHandler = 
                (e: ChangeEvent<HTMLInputElement>) =>
                {props.changeTaskStatus(t.id, e.currentTarget.checked);}
                        return ( 
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" 
                        checked={t.isDone} 
                        onChange={ onChangeHandler } />
                    <span>{t.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )}
            )}
        </ul>


        <div>
            <button className = {props.filter === "all" ? "active-filter" : ""} onClick={filteAllHandler}>All</button>
            <button className= {props.filter === "active" ? "active-filter" : ""} onClick={filteActiveHandler}>Active</button>
            <button className= {props.filter === "completed" ? "active-filter" : ""} onClick={filteCompletedHandler}>Completed</button>
        </div>
    </div>


};

// export default TodoList;