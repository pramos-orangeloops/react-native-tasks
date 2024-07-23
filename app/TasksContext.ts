import { createContext, Dispatch } from 'react';
import { Task } from './Task';
import { TasksAction } from './tasksReducer';

export const TasksContext = createContext<Task[]>([])

export const TasksDispatchContext = createContext<Dispatch<TasksAction>>(() => {})