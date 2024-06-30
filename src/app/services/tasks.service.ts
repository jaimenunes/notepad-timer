import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, of, race } from "rxjs"

@Injectable({
    providedIn: 'root'
  })
export class TaskService{
    private tasks = new BehaviorSubject<string[]>(['test'])
    taskList$ = this.tasks.asObservable()

    addNewTask(task: string){
        const currentTaskList = this.tasks.value
        this.tasks.next([...currentTaskList, task])
    }

    deleteTask(index: number){
        let currentTaskList = this.tasks.value
        currentTaskList.splice(index, 1)
        this.tasks.next([...currentTaskList])
    }

    editTask(task:string, index: number){
        let currentTaskList = this.tasks.value
        currentTaskList[index] = task
        this.tasks.next([...currentTaskList])
    }
}