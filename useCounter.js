//un hook no es más que una función. 
//es una simple función.
//normalmente los customHooks están amarrados a un hook interno propio de react
//aquí es donde está toda la lógica de negocio (como en un a función externa pura y dura) y no en el componente donde se utiliza este customHook
//por ejemplo, al poner el límite en cero para el botón decrement (if (counter===0) return;);
//al tener la lógica centralizada en este useCounter, si yo quisiera hacer otro counter, ya tengo el hook (=la función) useCounter para que funcione



import { useState } from "react"

export const useCounter = (initialValue = 10) => {

    //normalmente los customHooks están amarrados a un hook interno propio de react
    const [counter, setCounter] = useState(initialValue);

    const increment = (value=1) => {
        setCounter((current)=>current + value);
    }
    const decrement=(value=1)=>{
        if (counter===0) return;
        setCounter((current)=>current-value);
    }
    const reset =()=>{
        setCounter(initialValue);
    }



    //el hook tiene un return que puede ser un número, un arreglo, un objeto, un valor booleano, ...
    return {
        //counter: counter, //el objeto tiene la propiedad counter que está asociado a la variable counter. entonces se puede poner solo counter, (en vez de counter: couner,)
        counter,
        increment,//dentro del objeto, retorno como uno de sus elementos la función increment para poder incrementar en el componente que esté utilizando este customHook
        decrement,//idem que increment
        reset,//idem que increment y decrement
    }
}

