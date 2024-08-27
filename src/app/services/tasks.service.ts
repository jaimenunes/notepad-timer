import { Injectable, OnInit } from "@angular/core"
import { BehaviorSubject, Observable, of, race } from "rxjs"

@Injectable({
    providedIn: 'root'
  })
export class TaskService {
    private tasks = new BehaviorSubject<string[]>([])
    taskList$ = this.tasks.asObservable()

    constructor(){
        const list = localStorage.getItem('tasks')
            if(list){
               this.tasks.next([...JSON.parse(list)])
            }
    }

    addNewTask(task: string){
        const currentTaskList = this.tasks.value
        this.tasks.next([...currentTaskList, task])
        localStorage.setItem('tasks', JSON.stringify(this.tasks.value))
    }

    deleteTask(index: number){
        let currentTaskList = this.tasks.value
        currentTaskList.splice(index, 1)
        this.tasks.next([...currentTaskList])
        localStorage.setItem('tasks', JSON.stringify(this.tasks.value))
    }

    editTask(task:string, index: number){
        let currentTaskList = this.tasks.value
        currentTaskList[index] = task
        this.tasks.next([...currentTaskList])
    }
}