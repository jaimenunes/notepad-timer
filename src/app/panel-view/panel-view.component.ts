import { Component } from '@angular/core';
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

export class PanelViewComponent {
  public timerInterval: any = null
  displayFocus: string = "25:00"
  displayShort: string = "05:00"
  displayLong: string = "15:00"
  isRunnig: boolean = false

  stop(display: string){
    this.isRunnig = false
    clearInterval(this.timerInterval)
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
  timer(minute: number, display: string) {
    let seconds: number = minute * 60;
    let textSeconds: any = '0';
    let statSeconds: number = 60;

    const prefix = minute < 10 ? '0' : '';
    this.isRunnig = true

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSeconds != 0){
        statSeconds--;
      } 
      else{
        statSeconds = 59;
      };

      if (statSeconds < 10) {
        textSeconds = '0' + statSeconds;
      } else {
        textSeconds = statSeconds
      };
      switch(display){
        case 'focus':
          this.displayFocus = `${prefix}${Math.floor(seconds / 60)}:${textSeconds}`;
          break
        case 'short':
          this.displayShort = `${prefix}${Math.floor(seconds / 60)}:${textSeconds}`;
          break
        case 'long':
          this.displayLong = `${prefix}${Math.floor(seconds / 60)}:${textSeconds}`;
          break
      }
      if (seconds == 0) {
        clearInterval(this.timerInterval);
        this.isRunnig = false
      }
    }, 1000);
  }

  
}
