import React from 'react';
import { FilterValuesType } from './App';


type PropsType = {
    title: string,
    tasks: TaskType[], //or better Array<TaskType> (generic)
    removeTask: (id: number) => void  //bad to desctibe type as Function 
    filteredTasks: (value: FilterValuesType) => void
}

export
    type TaskType = {
        id: number,
        title: string,
        isDone: boolean,
    }


export function TodoList(props: PropsType) {

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input />
            <button>+</button>
        </div>


        <ul>
            {props.tasks.map(t => (
                <li>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={() => { props.removeTask(t.id) }}>x</button>
                </li>
            )
            )}
        </ul>


        <div>
            <button onClick={ () => {props.filteredTasks("all")} }>All</button>
            <button onClick={ () => {props.filteredTasks("completed")} }>Active</button>
            <button onClick={ () => {props.filteredTasks("active")} }>Completed</button>
        </div>
    </div>


};

// export default TodoList;