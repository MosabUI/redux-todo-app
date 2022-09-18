import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoAsync, removeTodoAsync } from '../redux/todoSlice';
const TodoItem = ({ id, title, completed }) => {
	const dispatch =useDispatch()

	const handleChecked=()=>{
		dispatch(toggleTodoAsync({
			id:id,completed:!completed
		}))
	}
	const removeTodo=()=>{

		dispatch(removeTodoAsync({id:id}))
	}
	
	
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onChange={handleChecked}></input>
					{title}
				</span>
				<button className='btn btn-danger' onClick={removeTodo}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
