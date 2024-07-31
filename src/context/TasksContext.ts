import { createContext, Dispatch } from 'react';
import { TasksAction } from '../reducer/tasksReducer';
import { Task } from '../model/Task';

export const TasksContext = createContext<Task[]>([])

export const TasksDispatchContext = createContext<Dispatch<TasksAction>>(() => {})