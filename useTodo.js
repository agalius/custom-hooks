import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";


export const useTodo = () => {

    const initialState = [];

    //función initializer: Función que transforma initialState en el estado inicial real
    //normalmente se pone como 'init'
    const init = () => {
        return JSON.parse(localStorage.getItem('todo')) || [];
    }

    const [todo, dispatch] = useReducer(todoReducer, initialState, init); //el reducer no se ejecuta -> todoReducer(), simplemente se pasa la referencia a la función ->todoReducer

    //LOCAL STORAGE: para grabar en local storage -> string -> hay que serializar los objetos (= JSON.stringify  y  JSON.parse)
    //necesito ejecutar algo cuando mis todos cambien -> ejecutar un efecto secundario cuando todos cambien
    useEffect(() => {
        //   console.log(todo);
        localStorage.setItem('todo', JSON.stringify(todo));
    }, [todo])

    const todoAllCounter=todo.length;

    const todoPendingCounter=todo.filter(todo=>!todo.done).length;    

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {       
        const action = {
            type: '[TODO] Remove Todo',
            payload: id,
        }
        dispatch(action);
        //también podría ser directamente:
        //dispatch({type: '[TODO] Remove Todo', payoad:id,});
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id,
        }
        dispatch(action);
    }

    return {
        todo,
        todoAllCounter,
        todoPendingCounter,
        initialState,
        init,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}