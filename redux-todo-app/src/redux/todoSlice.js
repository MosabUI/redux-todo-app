import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
async()=>{
  const response = await fetch('http://localhost:7000/todos');
  if(response.ok){
    const todos = await response.json()
    return {todos}
  }
}
)
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
async(payload)=>{
  const response = await fetch('http://localhost:7000/todos',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'

    },
    body: JSON.stringify({title:payload.title})

  });
    if(response.ok){
      const todo = await response.json()
      return {todo}
    }
}
)
export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync',
async(payload)=>{
  const response = await fetch(`http://localhost:7000/todos/${payload.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'

    },
    body: JSON.stringify({completed:payload.completed})

  });
    if(response.ok){
      const todo = await response.json()
      return {id:todo.id,completed:todo.completed}
    }
}
)
export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync',
async(payload)=>{
  const response = await fetch(`http://localhost:7000/todos/${payload.id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json'

    },

  });
    if(response.ok){
      return {id:payload.id}
    }
}
)


const todoSlice = createSlice({
    name:"todos",
    initialState:[
    
    ],
    reducers: {
        addTodo:(state,action)=>{
          const newTodo ={
            id:Date.now(),
            title:action.payload.title,
            completed:false
          }
          state.push(newTodo)
       },
       toggleTodo:(state,action)=>{
        const index = state.findIndex(
            (todo)=>todo.id === action.payload.id
        )
        state[index].completed=action.payload.completed
       },
       deleteTodo:(state,action)=>{
        return state.filter((todo)=>todo.id !==action.payload.id)
       }
,   },
    extraReducers:{
      [getTodosAsync.pending]:(state,action)=>{
        console.log('fetching data...')
      },
      [getTodosAsync.fulfilled]:(state,action)=>{
        console.log('fetching data successfully...')
        return action.payload.todos
      },
      [addTodoAsync.pending]:(state,action)=>{
        console.log('adding data...')
        
      },
      [addTodoAsync.fulfilled]:(state,action)=>{
        console.log('adding data successfully...')
          state.push(action.payload.todo)
      },
      [removeTodoAsync.fulfilled]:(state,action)=>{
        console.log('deleted data successfully...')
        return state.filter((todo)=>todo.id !==action.payload.id)
      },
      [toggleTodoAsync.fulfilled]:(state,action)=>{
        console.log('toggle data successfully...')
        const index = state.findIndex(
          (todo)=>todo.id === action.payload.id
      )
      state[index].completed=action.payload.completed
      }
    }
})

export const {addTodo,toggleTodo,deleteTodo} = todoSlice.actions 
export default todoSlice.reducer