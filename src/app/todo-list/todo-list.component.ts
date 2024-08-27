import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.sass'
})
export class TodoListComponent{
  todoList: string[]= []
  visible: boolean = false
  editTask: string = ''
  isEdit: boolean = false
  editIndex: number;

  constructor(private taskService: TaskService){
    this.taskService.taskList$.subscribe((items)=>{
      this.todoList = items
    })
  }

  showDialog(){
    this.visible = !this.visible
  }

  checkFunction(input: HTMLInputElement){
    if(!this.isEdit){
      this.addTask(input)
    }else{
      this.onEditTask(input, this.editIndex)
    }

  }
  addTask(input: HTMLInputElement){
    const newTask = input.value
    if(newTask){
      this.taskService.addNewTask(newTask)
    }
    input.value = ''
  }

  onCancel(input: HTMLInputElement){
    if(input.value){
      input.value = ''
    }
    this.visible = false
    this.isEdit = false
  }

  onDone(item: HTMLTableCellElement){
    if(item.style.textDecoration == 'line-through'){
      item.style.textDecoration='none'
      return
    }
    item.style.textDecoration='line-through'
  }

  onDelete(index: number){
    this.taskService.deleteTask(index);
  }

  onEditTask(input: HTMLInputElement, index: number){
    const editTask = input.value
    if(editTask){
      this.taskService.editTask(editTask, index)
    }
    input.value = ''
    this.isEdit = false
    this.visible = false
  }
  editMode(editTask: string, index: number){
    this.editTask = editTask
    this.isEdit = true
    this.editIndex = index
    this.showDialog()
  }
}
