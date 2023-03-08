import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';


type PropsType = {
    id: string
    title: string
    tasks: TaskType[], //or better Array<TaskType> (generic)
    removeTask: (todolistID: string, id: string) => void  //bad to desctibe type as Function 
    filteredTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (toodlistId: string) => void
}

export
    type TaskType = {
        id: string
        title: string
        isDone: boolean
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
            if (newTaskTitle.trim() ==="") {
                setError("Title is required")
                return
            }
            props.addTask(props.id, newTaskTitle.trim());
            setNewTaskTitle("");
            // alert(`you added new task "${e.currentTarget.value}"`)
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() ==="") {
            setError("Title is required")
            return
        }
        props.addTask(props.id, newTaskTitle.trim());
        setNewTaskTitle("");
    }

    const filteAllHandler = () => { props.filteredTasks(props.id, "all") }
    const filteActiveHandler = () => { props.filteredTasks(props.id, "active") }
    const filteCompletedHandler = () => { props.filteredTasks(props.id, "completed") }
    

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }


    return <div>
        <h3>{props.title} 
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
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
                const removeTaskHandler = () => { props.removeTask(props.id, t.id) }
                const onChangeHandler = 
                (e: ChangeEvent<HTMLInputElement>) =>
                {props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);}
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