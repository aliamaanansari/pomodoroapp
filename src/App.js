import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.css'
import Timer from './components/Timer'
import TodoList from './components/TodoList'
import { MainContextProvider } from './store/mainContext'
import { initialState, reducer, types } from './store/reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log({ state })

  useEffect(() => {
    dispatch({
      type: types.IMPORT_TASK_FROM_LOCALSTORAGE,
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <MainContextProvider value={{ state, dispatch }}>
        <Routes>
          <Route path='/' element={<TodoList />} />
          <Route path='/task/:taskId' element={<Timer />} />
        </Routes>
      </MainContextProvider>
    </BrowserRouter>
  )
}

export default App
