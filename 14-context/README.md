# 14 Context API
Según React: Proporciona una forma de pasar datos mediante el árbol de componentes sin pasar props manualmente a todos los niveles. Context se diseñó con el objetivo de compartir datos considerados "globales" para un árbol de componentes de React. [https://es.reactjs.org/docs/context.html](https://es.reactjs.org/docs/context.html)

En simples palabras: Crear variables globales para ser utilizadas en todos nuestro componentes.

## createContext
[https://es.reactjs.org/docs/hooks-reference.html#usecontext](https://es.reactjs.org/docs/hooks-reference.html#usecontext)
```js
import React from 'react'

export const ThemeContext = React.createContext()

const ThemeProvider = (props) => {

    const themes = {
        color: '#000',
        background: '#eee'
    }
    const [theme, setTheme] = React.useState(themes)

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
```

## Provider
```jsx
import React from 'react'
import ThemeProvider from './context/ThemeProvider'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )
}

export default App
```

## useContext
```jsx
import React from 'react'
import { ThemeContext } from '../context/ThemeProvider'

const Navbar = () => {

    const {theme, setTheme} = React.useContext(ThemeContext)

    return (
        <div style={
            {
                background: theme.background, 
                color: theme.color
            }
        }>
            <h1>Navbar</h1>
            <label>Color</label>
            <input 
                type="color" 
                value={theme.color}
                onChange={e => setTheme({...theme, color: e.target.value})}
            />
            <label>Fondo</label>
            <input 
                type="color"
                value={theme.background}
                onChange={e => setTheme({...theme, background: e.target.value})}
            />
        </div>
    )
}

export default Navbar
```

## Mejoras
```js
import React from 'react'

export const ThemeContext = React.createContext()

const ThemeProvider = (props) => {
  
    const themes = {
        color: '#000',
        background: '#eee'
    }
    
    const [theme, setTheme] = React.useState(themes)

    React.useEffect(() => {
        if(localStorage.getItem('LocalTheme')){
            const LocalTheme = JSON.parse(localStorage.getItem('LocalTheme'))
            setTheme(LocalTheme)
        }
    }, [])
    
    const cambiarColor = (valor) => {
        setTheme(valor)
        localStorage.setItem('LocalTheme', JSON.stringify(valor))
        console.log(valor)
        console.log('color guardado')
    }

    return (
        <ThemeContext.Provider value={{theme, cambiarColor}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
```

```jsx
import React from 'react'
import { ThemeContext } from '../context/ThemeProvider'

const Navbar = () => {

    const {theme, cambiarColor} = React.useContext(ThemeContext)

    return (
        <div style={
            {
                background: theme.background, 
                color: theme.color
            }
        }>
            <h1>Navbar</h1>
            <label>Color</label>
            <input 
                type="color" 
                value={theme.color}
                onChange={e => cambiarColor({...theme, color: e.target.value})}
            />
            <label>Fondo</label>
            <input 
                type="color"
                value={theme.background}
                onChange={e => cambiarColor({...theme, background: e.target.value})}
            />
        </div>
    )
}

export default Navbar
```