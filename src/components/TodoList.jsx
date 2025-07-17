import React, { Fragment, useEffect, useRef, useState } from "react";
import { TodoItem } from "./TodoItem";
import { v4 as uuid } from "uuid"
const KEY ="todoApp.todos"
export function TodoList() {
    const [todos, setTodos] = useState ([])

    useEffect( () => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if (storedTodos) {
            setTodos(storedTodos)
        }
    }, [])


    useEffect( () => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const taskRef = useRef();
    const agregarTarea = () => {
        console.log("Agregando Tarea!")
        const task = taskRef.current.value;
        const id = uuid();
        if (task === "") return;
        setTodos( (PrevTodos) => {
            const newTask = {
                id: id,
                task: task,
                completed: false
            }
            return [...PrevTodos, newTask]
        })
        taskRef.current.value = null
    }

    const eliminarTarea = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos)
    }

    const cambiarEstadoTarea = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=>todo.id === id)
        todo.completed = !todo.completed;
        setTodos(newTodos)
    }

    const contarTareasPendientes = () => {
        return todos.filter((todo)=> !todo.completed).length
    }

    const ResumenTareas = () => {
        const cantidad = contarTareasPendientes();
        if (cantidad === 1) {
            return (
                <div className="alert alert-info mt-3">Queda una tarea por terminar!</div>
            )
        }

        if (cantidad === 0) {
            return (
                <div className="alert alert-success mt-3">Felicitaciones! completaste todas tus tareas</div>
            )
        }

        return (
            <div className="alert alert-info mt-3">Te quedan {cantidad} tareas por terminar!</div>
        )
    }

    return (
        <Fragment>
            <h1 className="alert alert-info">Listado de tareas</h1>
            <div className="input-group mt-3 mb-3">
                <input ref={taskRef} type="text" placeholder="Agregar una tarea" className="form-control "/>
                <button onClick={agregarTarea} className="btn btn-success"><i className="bi bi-plus-circle-fill"></i></button>
                <button onClick={eliminarTarea} className="btn btn-danger"><i className="bi bi-plus-circle-fill"></i></button>
            </div>
            <ul className="list-group">
                {todos.map(todo => (
                    <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}/>
                ))}
            </ul>
            <ResumenTareas/>
        </Fragment>
    )
}