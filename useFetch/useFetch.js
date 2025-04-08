/**-------------------------- */
// 127 - useFetch - CustomHook
// 128 - Parametrizar y consumir nuestro custom Hook
// 130 - Incorporar caché
/**-------------------------- */

import { useEffect, useState } from "react"

const localCache = {

};


export const useFetch = (url) => {

    //aquí vamos a trabajar la petición HTTP
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null, //esta preopiedad serápara el mensaje de error
    });

    useEffect(() => {
        getFetch();

    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    //función para realizar peticióon HTTP. Irá dentro del useEffect.
    const getFetch = async () => {

        //de 130-Incorporar caché- comprobar si los datos ya están en localCache:
        if (localCache[url]) {
            console.log('Usanndo caché');
            console.log(localCache);
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            })
            return; //y no se ejecutan las líneas de abajo
        }


        //cambiamos los valores de state a los valores que debe tener durnte la carga de datos, que hemos definido en la función setLoadingState
        setLoadingState();

        // const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
        const response = await fetch(url);

        //sleep: forzamos la espera por 1,5 segundos para que se parezca a una sitación real de carga de datos
        await new Promise(resolve => setTimeout(resolve, 1500));

        //filtro por si hay cualquiera de los errores que puede haber al hacer fetch en una API
        if (!response.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText,
                }
            })
            return;
        }

        // si ha salido todo bien en el fetch..:
        const data = await response.json();

        // modifico el estado de state con los nuevos valores (especialmente el de data):
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,

        })


        console.log(data);
        

        //Manejo del caché.
        //Así incorporamos nuevos valores (=objetos completos de datos por cada id pokemon pedido con fetch) a nuestor localCache creado arriba
        /*
        Esta línea de código almacena información en una variable llamada localCache, asociándola con una "llave" (url).
            localCache → Es un objeto (como una caja con cajones). Se usa para guardar datos temporalmente.
            url → Es una clave (como el nombre de un cajón dentro de localCache).
            data → Es el contenido (lo que guardamos dentro del cajón).
        Quedaría como (en la variable localCache declarada arriba) :
        const localCache={
            'https://pokeapi.co/api/pokemon/1': {id:1, name: 'Bulbasur', sprites:'whatever', info:'whatever'}
            'https://pokeapi.co/api/pokemon/2': {id:2, name: 'Ivysur', sprites:'whatever', info:'whatever'}
            'https://pokeapi.co/api/pokemon/3': {id:3, name: 'Venusaur', sprites:'whatever', info:'whatever'}
        }        
        */
        localCache[url] = data;
        


    }



    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        //tb lo podría regresar de muchas maneras:
        // ..data ó
        // data
        // etc
    }
}
