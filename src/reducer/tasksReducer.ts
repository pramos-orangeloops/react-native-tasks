import { Reducer } from "react";
import { Task } from "../model/Task";
import { randomUUID } from "expo-crypto"

export const enum TasksActionType {
    UPDATE_STATE,
    ADD,
    DELETE,
    CLEAN
}

export type TasksAction = 
    {
        type: TasksActionType.UPDATE_STATE,
        taskId: string
    }
    | {
        type: TasksActionType.ADD,
        taskDescription: string
    }
    | {
        type: TasksActionType.DELETE,
        taskId: string
    }
    | {
        type: TasksActionType.CLEAN
    }

export const tasksReducer: Reducer<Task[], TasksAction> = (tasks, action) => {
    switch (action.type) {
        case TasksActionType.UPDATE_STATE: {

            const elem = tasks.find((it) => it.id === action.taskId)
            if (!elem) return tasks

            const newElem = { 
                ...elem,
                isDone: !elem?.isDone,
                doneDate: elem?.isDone ? null : new Date()
            }

            return tasks.map(it => {
                if (it.id === action.taskId) {
                    return newElem
                }
                return it
            })
        }
    
        case TasksActionType.ADD: {
            return [
                new Task(randomUUID(), action.taskDescription, false, new Date(), null),
                ...tasks
            ]
        }

        case TasksActionType.CLEAN: {
            return tasks.filter((task) => !task.isDone)
        }

        case TasksActionType.DELETE: {
            return tasks.filter((task) => task.id !== action.taskId)
        }
    }
}