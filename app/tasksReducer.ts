import { Reducer } from "react";
import { Task } from "./Task";

export const enum TasksActionType {
    UPDATE_STATE,
    ADD,
    DELETE,
    CLEAN
}

export type TasksAction = {
    type: TasksActionType,
    task: Task
}

export const tasksReducer: Reducer<Task[], TasksAction> = (tasks, action) => {
    switch (action.type) {
        case TasksActionType.UPDATE_STATE: {

            const elem = tasks.find((it) => it.id === action.task.id)
            if (!elem) return tasks

            const newElem = { 
                ...elem,
                isDone: !elem?.isDone,
                doneDate: elem?.isDone ? null : new Date()
            }

            return tasks.map(it => {
                if (it.id === action.task.id) {
                    return newElem
                }
                return it
            })
        }
    
        case TasksActionType.ADD: {
            return [
                action.task,
                ...tasks
            ]
        }

        case TasksActionType.CLEAN: {
            return tasks.filter((task) => !task.isDone)
        }

        default: {
            return tasks
        }
    }
}