# 10 Redux
Vamos a trabajar con Redux utilizando Ducks. 

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
```js
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
```js
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
```js
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
```js
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
```js
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
```js
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

## Prácticando
pokeDucks
```js
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
```js
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