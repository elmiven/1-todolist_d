import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null) //or empty string

    const taskTitileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.ctrlKey && e.key == "Enter") {
            if (newTaskTitle.trim() === "") {
                setError("Title is required")
                return
            }
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("");
            // alert(`you added new task "${e.currentTarget.value}"`)
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("");
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                type="text" placeholder="enter new task"
                value={newTaskTitle}
                onChange={taskTitileHandler}
                onKeyDown={keyDownHandler}
            />
            <button onClick={addTaskHandler} >+</button>
            {error && <div className="error-message">{error}</div>}

        </div>

    )


}


export default AddItemForm