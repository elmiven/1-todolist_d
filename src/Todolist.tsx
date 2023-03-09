import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import AddItemForm from './AddItemForm';
import { FilterValuesType } from './App';
import EditableSpan from './EditableSpan';


type PropsType = {
    id: string
    title: string
    tasks: TaskType[], //or better Array<TaskType> (generic)
    removeTask: (todolistID: string, id: string) => void  //bad to desctibe type as Function 
    filteredTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, taskID: string) => void
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


    //code before refactor to one component 
    // const [newTaskTitle, setNewTaskTitle] = useState("");
    // const [error, setError] = useState<string | null>(null) //or empty string

    // const taskTitileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setNewTaskTitle(e.currentTarget.value)
    // }

    // const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    //     if (e.ctrlKey && e.key == "Enter") {
    //         if (newTaskTitle.trim() === "") {
    //             setError("Title is required")
    //             return
    //         }
    //         props.addTask(props.id, newTaskTitle.trim());
    //         setNewTaskTitle("");
    //         // alert(`you added new task "${e.currentTarget.value}"`)
    //     }
    // }

    // const addTaskHandler = () => {
    //     if (newTaskTitle.trim() === "") {
    //         setError("Title is required")
    //         return
    //     }
    //     props.addTask(props.id, newTaskTitle.trim());
    //     setNewTaskTitle("");
    // }

    const filteAllHandler = () => { props.filteredTasks(props.id, "all") }
    const filteActiveHandler = () => { props.filteredTasks(props.id, "active") }
    const filteCompletedHandler = () => { props.filteredTasks(props.id, "completed") }


    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
            {/* {props.title} */}
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm addItem={addTask} />


        {/* Before refactoring, when component was in one Todolist
         <div>
            <input className={error ? "error" : ""}
                type="text" placeholder="enter new task"
                value={newTaskTitle}
                onChange={taskTitileHandler}
                onKeyDown={keyDownHandler}
            />
            <button onClick={addTaskHandler} >+</button>
            {error && <div className="error-message">{error}</div>}

        </div> */}





        <ul>
            {props.tasks.map(t => {

                const removeTaskHandler = () => { props.removeTask(props.id, t.id) }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(props.id, t.id, newValue)
                }

                return (
                    <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeStatusHandler} />
                        {/* <span>{t.title}</span> */}
                        <EditableSpan
                            title={t.title}
                            onChange={onChangeTitleHandler}
                        />
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                )
            }
            )}
        </ul>


        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={filteAllHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={filteActiveHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={filteCompletedHandler}>Completed</button>
        </div>
    </div>


};



