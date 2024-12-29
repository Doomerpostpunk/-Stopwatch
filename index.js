const container=document.getElementById('container')

const scope=document.createElement('div');
scope.classList.add('scoper')
container.appendChild(scope);


const min=document.createElement('span');
min.textContent='00';
scope.appendChild(min);

const span1=document.createElement('span');
span1.textContent=':';
scope.appendChild(span1);

const sec=document.createElement('span');
sec.textContent='00';
scope.appendChild(sec);

const span2=document.createElement('span');
span2.textContent=':';
scope.appendChild(span2);

const milli=document.createElement('span');
milli.textContent='00';
scope.appendChild(milli);

const list=document.createElement('ul');
scope.appendChild(list);

const start=document.createElement('button');
start.textContent='Start';
start.classList.add('start')
scope.appendChild(start);

const stop=document.createElement('button');
stop.textContent='Stop';
stop.classList.add('stop')
scope.appendChild(stop);

const reset=document.createElement('button');
reset.textContent='Reset';
reset.classList.add('reset')
scope.appendChild(reset);



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
        if(count.milliseconds>=100)
        {
            count.seconds+=1;
            count.milliseconds=0;
        }
        if(count.seconds>=60)
        {
            count.minute+=1;
            count.seconds=0;
        }
        return count;
    };
    return incrementcount
}
const incrementcounter=counter();
const handlecount=()=>{
    const {milliseconds,seconds,minute}=incrementcounter()
    milli.innerText=String(milliseconds).padStart(2,"0");
    sec.innerText=String(seconds).padStart(2,"0");
    min.innerText=String(minute).padStart(2,"0");
}

const obj={
    idInterval:null
}

const startInterval=()=>{
    return ()=>{
        obj.idInterval=setInterval(()=>handlecount(),10)
    }
}

const handleclearInterval=()=>{
    clearInterval(obj.idInterval)
    const li=document.createElement('li')
    li.innerHTML=`<span id="min">${min.innerHTML}</span>:
                  <span id="sec">${sec.innerHTML}</span>:
                  <span id="milli">${milli.innerHTML}</span>;`
                  list.append(li)
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