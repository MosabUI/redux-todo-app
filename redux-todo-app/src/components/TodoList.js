import React,{useEffect} from 'react';
import TodoItem from './TodoItem';
import { useSelector,useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';


const TodoList = () => { 
   const dispatch=  useDispatch()
   const todos =useSelector((state)=>state.todos)	

   useEffect(()=>{
     dispatch(getTodosAsync())
   },[dispatch])

   
	// const todos = [
	// 	{ id: 1, title: 'todo1', completed: false },
	// 	{ id: 2, title: 'todo2', completed: false },
	// 	{ id: 3, title: 'todo3', completed: true },
	// 	{ id: 4, title: 'todo4', completed: false },
	// 	{ id: 5, title: 'todo5', completed: false },
	// ];

	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
