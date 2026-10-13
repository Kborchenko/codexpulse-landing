const savings={small:{value:'320 000 ₽',note:'в год для малого бизнеса'},medium:{value:'640 000 ₽',note:'в год для среднего бизнеса'},large:{value:'1 280 000 ₽',note:'в год для крупного бизнеса'}};

document.querySelectorAll('input[name="business"]').forEach((radio)=>{
  radio.addEventListener('change',()=>{
    document.querySelectorAll('.segment-option').forEach((item)=>item.classList.remove('is-active'));
    radio.closest('.segment-option').classList.add('is-active');
    const result=savings[radio.value];
    const value=document.getElementById('saving-value');
    value.animate([{opacity:.2,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:280,easing:'ease-out'});
    value.textContent=result.value;
    document.getElementById('saving-note').textContent=result.note;
  });
});

const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach((item)=>revealObserver.observe(item));

const timerKey='designaTimerEnd';
const startButton=document.getElementById('timer-start');
const timerFields={hours:document.getElementById('hours'),minutes:document.getElementById('minutes'),seconds:document.getElementById('seconds')};
let timerInterval;
function renderTimer(){
  const end=Number(localStorage.getItem(timerKey)||0);
  const remaining=Math.max(0,end-Date.now());
  const total=Math.floor(remaining/1000);
  timerFields.hours.textContent=String(Math.floor(total/3600)).padStart(2,'0');
  timerFields.minutes.textContent=String(Math.floor((total%3600)/60)).padStart(2,'0');
  timerFields.seconds.textContent=String(total%60).padStart(2,'0');
  if(!remaining&&end){clearInterval(timerInterval);startButton.textContent='Время вышло';startButton.disabled=true}
}
function runTimer(){clearInterval(timerInterval);renderTimer();timerInterval=setInterval(renderTimer,1000);startButton.textContent='Отсчёт идёт';startButton.disabled=true}
startButton.addEventListener('click',()=>{localStorage.setItem(timerKey,String(Date.now()+24*60*60*1000));runTimer()});
if(Number(localStorage.getItem(timerKey))>Date.now())runTimer();

const boxes=[...document.querySelectorAll('#checklist input[type="checkbox"]')];
const bar=document.getElementById('progress-bar');
const progress=document.querySelector('.progress-track');
const sendLink=document.getElementById('send-link');
function updateChecklist(){
  const count=boxes.filter((box)=>box.checked).length;
  const percent=count*20;
  document.getElementById('done-count').textContent=count;
  document.getElementById('progress-percent').textContent=`${percent}%`;
  bar.style.width=`${percent}%`;
  progress.setAttribute('aria-valuenow',String(count));
  const ready=count===boxes.length;
  sendLink.classList.toggle('is-disabled',!ready);
  sendLink.setAttribute('aria-disabled',String(!ready));
  if(ready){sendLink.href='https://t.me/antirko?text='+encodeURIComponent('Здравствуйте! Я выполнил(а) тестовое задание. Ссылка на Figma: ')}
}
boxes.forEach((box)=>box.addEventListener('change',updateChecklist));
updateChecklist();

sendLink.addEventListener('click',(event)=>{if(sendLink.getAttribute('aria-disabled')==='true')event.preventDefault()});
