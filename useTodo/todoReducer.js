

export const todoReducer = (initialState = [], action) => {

    switch (action.type) {


        case '[TODO] Add Todo':
            //siempre tengo que regresar un estado
            return [...initialState, action.payload];



        case '[TODO] Remove Todo':
            {
                // .filter devuelve un nuevo array,. no modifica el ya existente. 
                // es por esto que podemos utilizarlo. 
                // no debemos mutar el array original sino sustituirlo por uno nuevo
                // si quiero desarrollar cualquier código antes de pasar el resultado (como determinar una variable)
                // al estar en un case-switch, debo envolverlo todo entre llaves '{}'

                const a = initialState.filter(item => item.id !== action.payload);
                return a;
            }

        case '[TODO] Toggle Todo':
          
        return initialState.map(todo=>{
            if(todo.id===action.payload){
                return {
                    ...todo,
                    done: !todo.done
                }
            }

            return todo;
        })


        default:
            return initialState;
    }



}