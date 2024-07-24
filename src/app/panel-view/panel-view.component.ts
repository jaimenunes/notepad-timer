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
  ringAlarm = new Audio('../../assets/ring.mp3')
  public timerInterval: any = null
  displayFocus: string = "25:00"
  displayShort: string = "05:00"
  displayLong: string = "15:00"
  isRunning: boolean = false

  public stop(display: string){
    this.isRunning = false
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

  public timer(minute: number, display: string) {
    let seconds: number = minute * 60;
    let statSeconds: number = seconds % 60;
    this.isRunning = true;
    
    this.timerInterval = setInterval(() => {
        seconds--;
        if (statSeconds != 0) {
            statSeconds--;
        } else {
            statSeconds = 59;
        }
        
        let textSeconds = statSeconds < 10 ? '0' + statSeconds : String(statSeconds);
        const minutes = Math.floor(seconds / 60);
        const displayMinutes = minutes < 10 ? '0' + minutes : String(minutes);
        
        switch(display) {
            case 'focus':
                this.displayFocus = `${displayMinutes}:${textSeconds}`;
                break;
            case 'short':
                this.displayShort = `${displayMinutes}:${textSeconds}`;
                break;
            case 'long':
                this.displayLong = `${displayMinutes}:${textSeconds}`;
                break;
        }
        
        if (seconds == 0) {
            clearInterval(this.timerInterval);
            this.ringAlarm.play();
            this.isRunning = false;
            this.stop(display)
            window.alert("The time is over!")
        }
    }, 1000);
  }
}
