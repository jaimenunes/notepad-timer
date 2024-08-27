import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-panel-view',
  standalone: true,
  imports: [CommonModule, TabViewModule, ButtonModule],
  templateUrl: './panel-view.component.html',
  styleUrl: './panel-view.component.sass'
})

export class PanelViewComponent implements OnInit {
  ringAlarm = new Audio('../../assets/ring.mp3')
  public timerInterval: any = null
  displayFocus: string = "25:00"
  displayShort: string = "05:00"
  displayLong: string = "15:00"
  timerDisplay: string

  activeTab: number
  isRunning: boolean = false

  worker: Worker

  ngOnInit(): void {
    if(typeof(this.worker) != undefined){
      if(this.worker){
        this.worker.terminate()
      }
      this.worker = new Worker(new URL('../worker.worker', import.meta.url))
      
      this.worker.onmessage = ({data}) => {
        if(data != 'start' && data != 'end'){
          if(data.tab == 'short'){
            this.displayShort = data.time
          }
          if(data.tab == 'focus'){
            this.displayFocus = data.time
          }
          if(data.tab == 'long'){
            this.displayLong = data.time
          }
        }
        if(data === 'finish' ){
          this.ringAlarm.play()
        }
      }

    }
  }
  public stop(display: string){
    this.worker.postMessage({message: 'stop', time: null, tabView: null})
    this.isRunning = false
    switch(display){
      case 'focus':
        this.displayFocus = `25:00`
        break
      case 'short':
        this.displayShort = `05:00`;
        break
      case 'long':
        this.displayLong = `15:00`;
        break
    }
  }

  public timer(minute: number, display: string) {
    this.isRunning = true;
    this.activeTab = minute
    this.worker.postMessage({message: 'start', time: minute, tabView: display})
  }

}
