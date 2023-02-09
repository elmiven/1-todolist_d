import React from 'react';


type PropsType = {
    title: string,
    tasks: TaskType[], //or Array<TaskType> (generic)
    removeTasks: Function  //bad to desctibe type as Function 
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
            {props.tasks.map(t => <li>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick= {() => {props.removeTasks(t.id)}   }>x</button>
            </li>)}


        </ul>


        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>


};

// export default TodoList;