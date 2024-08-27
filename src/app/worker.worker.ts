/// <reference lib="webworker" />

let myInterval: any

addEventListener('message', ({ data }) => {
  const {message, time, tabView} = data
  if(data.message === 'start'){
    let seconds: number = time * 60;
    let statSeconds: number = seconds % 60;
    myInterval = setInterval(() => {
          seconds--;
          if (statSeconds != 0) {
              statSeconds--;
          } else {
              statSeconds = 59;
          }
          
          let textSeconds = statSeconds < 10 ? '0' + statSeconds : String(statSeconds);
          const minutes = Math.floor(seconds / 60);
          const displayMinutes = minutes < 10 ? '0' + minutes : String(minutes);
          postMessage({time:`${displayMinutes}:${textSeconds}`, tab: tabView})         
          if (seconds == 0) {
              clearInterval(myInterval)
              postMessage("finish")
          }
      }, 1000);
  }
  if(data.message === 'stop'){
    clearInterval(myInterval)
  }
});

