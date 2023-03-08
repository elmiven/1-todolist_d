import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from './Todolist';

export
    type FilterValuesType = "all" | "completed" | "active";

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}




function App() {
    // BLL:

    // old state for 1 TDL
    // let [tasks, setTasks] = useState([
    //     { id: v1(), title: "HTML & CSS", isDone: true },
    //     { id: v1(), title: "ES6 & TS", isDone: false },
    //     { id: v1(), title: "React", isDone: false },
    //     { id: v1(), title: "Redux", isDone: false },
    // ]);



    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'completed' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })




    //useState for filter
    let [filter, setFilter] = useState<FilterValuesType>("all");




    //callback fn to delete tasks from useState
    function removeTask(todolistID: string, id: string) {
        let tasksCopyForOneTDL = tasks[todolistID]
        let filteredTasks = tasksCopyForOneTDL.filter(t => t.id != id)
        tasks[todolistID] = filteredTasks
        setTasks({ ...tasks })

        //old code for 1 TDL
        // let removedTask = tasks.filter(t => id !== t.id)
        // setTasks(removedTask);
        // console.log(removedTask);
    }

    function addTask(todolistID: string, title: string) {
        const task = { id: v1(), title: title, isDone: false }
        const tasksCopyForOneTDL = tasks[todolistID]
        const tasksCopyForOneTDLPlusTask = [task, ...tasksCopyForOneTDL]
        tasks[todolistID] = tasksCopyForOneTDLPlusTask
        setTasks({ ...tasks })

        //old code for 1 TDL
        // let tasksNew = [...tasks, { id: v1(), title: title, isDone: false }]
        // setTasks(tasksNew)
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        const tasksCopyForOneTDL = tasks[todolistID]
        const task = tasksCopyForOneTDL.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }


        //old code for 1 TDL
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
    }

    //callback fn to change filter useState
    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
        // setFilter(value)
    }


const removeTodolist = (todolistID: string) => {
    let filteredTodolist = todolists.filter(t => t.id !==todolistID)
    setTodolists(filteredTodolist)
    //delete tied tasks with deleted TDL
    delete tasks[todolistID]
    //unnecessary action because we already don't see this tasks 
    setTasks({...tasks})
}






    //UI:
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }


                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title} //data props
                            tasks={tasksForTodolist} //data props
                            removeTask={removeTask} //callback props to delete task
                            filteredTasks={changeFilter} //callback props 
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}




export default App;