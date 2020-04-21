# 10 Redux
Vamos a trabajar con Redux utilizando Ducks. 

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [http://curso-react-js-udemy.bluuweb.cl/](http://curso-react-js-udemy.bluuweb.cl/)
<b>Nos vemos en clases!</b>
:::

1. [https://es.redux.js.org/](https://es.redux.js.org/)
2. [https://github.com/erikras/ducks-modular-redux#the-proposal](https://github.com/erikras/ducks-modular-redux#the-proposal)

## Instaciones
```
npm i redux
npm i react-redux
npm i redux-devtools
npm i redux-thunk
npm i axios
```

Extensión Navegador
[https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es)

Configuración Store.js
[https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup](https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup)

API:
[https://pokeapi.co/](https://pokeapi.co/)
```
https://pokeapi.co/api/v2/pokemon?offset=0&limit=20
```

Crear archivos ``Redux/pokesDucks.js`` y ``Redux/store.js`` 


## pokesDucks.js
```jsx
// constantes
const dataInicial = {
    array: []
}

// types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'

// reducer
export default function reducer(state = dataInicial, action){

}

// actions
export const obtenerPokemonsAction = () => async (dispatch) => {

}
```

Acciones
```jsx
// actions
export const obtenerPokemonsAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}
```

Reducer
```jsx
// reducer
export default function pokesReducer(state = dataInicial, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
```

## store.js
```jsx
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokesReducer from './pokesDucks'

const rootReducer = combineReducers({
    pokemones: pokesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}
```

## App.jsx
```jsx
import React from 'react';
import {Provider} from 'react-redux'
import generateStore from './redux/store'
import Pokemones from './components/Pokemones';

function App() {
  const store = generateStore()
  return (
    <Provider store={store}>
      <Pokemones />
    </Provider>
  );
}

export default App;
```

## Llamar en un componente
```jsx
import React from 'react'

// hooks react redux
import {useDispatch, useSelector} from 'react-redux'

// importamos la acción
import {obtenerPokeAction} from '../redux/pokeDucks'

const Pokemones = () => {

    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    // crearmos el state utilizando nuestra tienda
    // store.pokemones lo sacamos de la tienda
    const pokemones = useSelector(store => store.pokemones.array)

    return (
        <div>
            <h1>Pokemones!</h1>
            <button onClick={() => dispatch(obtenerPokeAction())}>Obtener</button>
            <ul>
                {
                    pokemones.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones
```

## Prácticando #1
pokeDucks
```jsx
import axios from 'axios'

// Constantes
const dataInicial = {
    array: [],
    offset: 0
}
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_POKE_NEXT_SUCCESS = 'GET_POKE_NEXT_SUCCESS'

// Reducer
export default function pokeReducer (state = dataInicial, action) {
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, array: action.payload}
        case GET_POKE_NEXT_SUCCESS:
            return {...state, array: action.payload.array, offset: action.payload.offset}
        default: 
            return state
    }
}

// Acciones
export const obtenerPokeAction = () => async (dispatch, getState) => {
    // console.log(getState())
    const {offset} = getState().pokemones
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results,
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokeAction = (numero) => async(dispatch, getState) => {

    const {offset} = getState().pokemones
    const siguiente = offset + numero

    console.log('siguiente: ', siguiente)
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({
            type: GET_POKE_NEXT_SUCCESS,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        })
    } catch (error) {
        console.log(error)
    }
}
```

Poke.jsx
```jsx
import React from 'react'

import {useDispatch, useSelector} from 'react-redux'

import {obtenerPokeAction} from '../redux/pokeDucks'
import {siguientePokeAction} from '../redux/pokeDucks'

const Poke = () => {

    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.array)
    // console.log(pokemones)

    return (
        <div>
            <h1>Pokemones!</h1>
            <button onClick={() => dispatch(obtenerPokeAction())}>Obtener</button>
            <button onClick={() => dispatch(siguientePokeAction(20))}>Siguientes</button>
            <ul>
                {
                    pokemones.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Poke
```

## Prácticando #2
```jsx
import axios from 'axios'

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
    offset: 0
}

// types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO'

// reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload}
        default:
            return state
    }
}

// acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        console.log(res.data)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {

    const {next} = getState().pokemones

    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones

    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
```

```jsx
import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { obtenerPokemonesAccion,  siguientePokemonAccion, anteriorPokemonAccion} from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    return (
        <div>
            lista de pokemones 
            <br/>
            
            {
                pokemones.length === 0 && <button onClick={() => dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            }
            {
                next && <button onClick={() => dispatch(siguientePokemonAccion())} >Siguiente</button>
            }
            {
                previous && <button onClick={() => dispatch(anteriorPokemonAccion())} >Anterior</button>
            } 
            <ul>
                {
                    pokemones.map(item => (
                        <li key={item.name} >{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones
```

## LocalStorage
```jsx
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    if(localStorage.getItem('offset=0')){
        console.log('existe')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
    }else{
        console.log('no existe')
        try {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
            console.log(res.data)
            dispatch({
                type: OBTENER_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem('offset=0', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {

    const {next} = getState().pokemones

    if(localStorage.getItem(next)){
        console.log('existe')
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
    }else{
        console.log('no existe')
        try {
            const res = await axios.get(next)
            dispatch({
                type: SIGUIENTE_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem(next, JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)){
        console.log('existe')
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
    }else{
        console.log('no existe')
        try {
            const res = await axios.get(previous)
            dispatch({
                type: SIGUIENTE_POKEMONES_EXITO,
                payload: res.data
            })
            localStorage.setItem(previous, JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }

}
```

## Practica #3
```jsx
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'

case POKE_INFO_EXITO:
    return {...state, unPokemon: action.payload}

export const unPokeDetalleAccion = (url) => async (dispatch, getState) => {
    if(url === undefined){
        url = 'https://pokeapi.co/api/v2/pokemon/1/'
    }
    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    try {
        const res = await axios.get(url)
        // console.log(res.data)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                foto: res.data.sprites.front_default,
                alto: res.data.height,
                ancho: res.data.weight
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            foto: res.data.sprites.front_default,
            alto: res.data.height,
            ancho: res.data.weight
        }))

    } catch (error) {
        console.log(error.response)
    }
}
```

```jsx
import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {unPokeDetalleAccion} from '../redux/pokeDucks'

const Detalle = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        const obtenerInfo = () => {
            dispatch(unPokeDetalleAccion())
        }
        obtenerInfo()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)
    // console.log(pokemon)

    return pokemon ? (
        <div className="card text-center text-uppercase">
            <div className="card-body">
                <img className="img-fluid" alt="" src={pokemon.foto} />
                <div className="card-title">{pokemon.nombre}</div>
                <p className="card-text">Alto: {pokemon.alto} - Ancho: {pokemon.ancho}</p>
            </div>
        </div>
    ) : null
}

export default Detalle
```

```jsx
<div className="row">
    <div className="col-md-6">
        <h3>Lista de Pokemons</h3>

        <div className="d-flex justify-content-between">
            {
                pokemones.length === 0 && 
                <button 
                    onClick={() => dispatch(obtenerPokemonesAccion())}
                    className="btn btn-dark"
                >
                    Get Pokemones
                </button>
            }
            {
                next && 
                <button onClick={() => dispatch(siguientePokemonAccion())} className="btn btn-dark mr-2">Siguiente</button>
            }
            {
                previous && 
                <button onClick={() => dispatch(anteriorPokemonAccion())} className="btn btn-dark">Anterior</button>
            } 
        </div>
        
        <ul className="list-group mt-3 text-uppercase">
            {
                pokemones.map(item => (
                    <li className="list-group-item" key={item.name} >
                        {item.name}
                        <button 
                            className="btn btn-dark btn-sm float-right"
                            onClick={() => dispatch(unPokeDetalleAccion(item.url))}
                        >
                            Detalle
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
    <div className="col-md-6">
        <Detalle />
    </div>
</div>
```

```jsx
<Provider store={store}>
    <div className="container mt-3">
    <Pokemones />
    </div>
</Provider>
```