const container=document.getElementById('container')

const creatureElement = (type, title, className) => {
    const element = document.createElement(type);
    element.innerText = title;
    if(className) {
      element.classList.add(className);
    }

    return element
  }
const min= creatureElement('span','00');
container.appendChild(min)
container.appendChild(creatureElement('span',':'))
const sec= creatureElement('span','00');
container.appendChild(sec)
container.appendChild(creatureElement('span',':'))
const milli=creatureElement('span','00');
container.appendChild(milli);
const list=creatureElement('ul','', 'list');
container.appendChild(list)
const start=creatureElement('button','start', 'start')
container.appendChild(start)
const stop=creatureElement('button','stop', 'stop')
container.appendChild(stop)
const reset=creatureElement('button','reset', 'reset')
container.appendChild(reset)

const counter=()=>{
    const count={
        minute:0,
        seconds:0,
        milliseconds:0,
        reset(){
            count.milliseconds=0;
            count.seconds=0;
            count.minute=0;
        }
    }
   const incrementcount=()=>
    {
        count.milliseconds+=1;
        const onMilliseconds = (milliseconds) => {
            if(milliseconds >= 100) {
                        count.seconds+=1;
                      count.milliseconds=0;
            }
          }
         
          const onSeconds = (seconds) => {
            if(seconds >= 60) {
                        count.minute+=1;
                      count.seconds=0;
            }
          }
          onMilliseconds(count.milliseconds)
          onSeconds(count.seconds)
        return count;
    };
    return incrementcount
}
const incrementcounter=counter();

const handlecount=()=>{
    const {milliseconds,seconds,minute}=incrementcounter()

    const innerTextcounter=(elem, elem2)=>{
        elem.innerText=String(elem2).padStart(2,"0");
    }
 innerTextcounter(milli,milliseconds);
 innerTextcounter(sec,seconds);
 innerTextcounter(min,minute);
}

const obj={
    idInterval:null
}

const startInterval=()=>{
    
    return ()=>{
        obj.idInterval=setInterval(()=>handlecount(),10)
        start.setAttribute('disabled','disabled')
    stop.removeAttribute('disabled')
    }
  
}

const handleclearInterval=()=>{
    clearInterval(obj.idInterval)
    const li=document.createElement('li')
    li.innerHTML=`<span id="min">${min.innerHTML}</span>:
                  <span id="sec">${sec.innerHTML}</span>:
                  <span id="milli">${milli.innerHTML}</span>;`
                  list.append(li);
                  stop.setAttribute('disabled', 'disabled')
                  start.removeAttribute('disabled')
}


const handleReset=()=>{
    const {reset}=incrementcounter();
    reset()
    min.innerText='00'
    sec.innerText='00'
    milli.innerText='00'
}
const interval=startInterval();
start.addEventListener('click', interval)
reset.addEventListener('click',handleReset)
stop.addEventListener('click', handleclearInterval)