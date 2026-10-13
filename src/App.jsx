import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, BarChart3, BriefcaseBusiness, Check,
  ChevronDown, Clock3, FileText, Figma, Layers3, Monitor, Send,
  Smartphone, Sparkles, TimerReset, WalletCards
} from 'lucide-react'

const businessData = {
  small: { label: 'Малый', sub: 'до 50 сотрудников', value: 320000, percent: 24, bars: [72, 66, 62, 58, 52, 48, 42, 40, 39, 38, 36, 34] },
  medium: { label: 'Средний', sub: '50–250 сотрудников', value: 640000, percent: 40, bars: [82, 79, 74, 65, 64, 58, 51, 49, 50, 47, 45, 42] },
  large: { label: 'Крупный', sub: 'от 250 сотрудников', value: 1280000, percent: 48, bars: [90, 86, 83, 80, 72, 66, 61, 56, 53, 50, 47, 44] }
}

const criteria = [
  { title: 'Логика и UI/UX', text: 'Понятный сценарий, честные данные и минимум лишних шагов.', checks: ['Ясная структура и навигация', 'Продуманный пользовательский поток', 'Интерфейс решает задачу аудитории'], icon: Layers3 },
  { title: 'Аккуратность', text: 'Чистота макета, сетка, компоненты и внимание к состояниям.', checks: ['Auto Layout и компоненты', 'Единая система отступов', 'Все состояния описаны'], icon: Sparkles },
  { title: 'Адаптивность', text: 'Решение уверенно работает на 1440 и 375 пикселях.', checks: ['Смысл не теряется', 'Контент не переполняется', 'Touch-цели не меньше 44 px'], icon: Smartphone },
  { title: 'Визуальный стиль', text: 'Строгая современная B2B-подача без декоративного шума.', checks: ['Типографика держит иерархию', 'Контраст доступен', 'Акцент используется осмысленно'], icon: Monitor }
]

const checklistItems = [
  'Desktop-версия блока · 1440 px', 'Мобильная версия · 375 px',
  'Состояния Default / Hover / Active', 'Доступ к Figma открыт', 'Ссылка скопирована'
]

const money = new Intl.NumberFormat('ru-RU').format

function useCountdown() {
  const key = 'designa-react-timer-end'
  const [end, setEnd] = useState(() => Number(localStorage.getItem(key) || 0))
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!end || end <= Date.now()) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [end])
  const start = () => {
    const next = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem(key, String(next)); setEnd(next); setNow(Date.now())
  }
  const remaining = Math.max(0, end - now)
  const total = Math.floor(remaining / 1000)
  return { running: end > now, start, h: Math.floor(total / 3600), m: Math.floor(total % 3600 / 60), s: total % 60 }
}

function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.visible = 'true'; observer.disconnect() }
    }, { threshold: .12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>
}

function IconButton({ children, ...props }) {
  return <button className="icon-button" {...props}>{children}</button>
}

function App() {
  const [business, setBusiness] = useState('medium')
  const [openCriterion, setOpenCriterion] = useState(0)
  const [checked, setChecked] = useState([])
  const timer = useCountdown()
  const selected = businessData[business]
  const done = checked.length
  const telegramUrl = useMemo(() => 'https://t.me/antirko?text=' + encodeURIComponent('Здравствуйте! Я выполнил(а) тестовое задание. Ссылка на Figma: '), [])
  const toggleCheck = index => setChecked(current => current.includes(index) ? current.filter(i => i !== index) : [...current, index])

  return <>
    <a className="skip" href="#task">К заданию</a>
    <header className="topbar">
      <a className="logo" href="#top">Designa</a>
      <nav aria-label="Навигация">
        <a href="#task">Задание</a><a href="#criteria">Критерии</a><a href="#submit">Сдача</a>
      </nav>
      <a className="top-cta" href="#task">Начать <ArrowDownRight size={17} /></a>
    </header>

    <main id="top">
      <section className="hero shell">
        <Reveal className="hero-copy">
          <p className="kicker">Тестовое задание · UI/UX</p>
          <h1>Сделай сложное <span>понятным.</span></h1>
          <p className="hero-text">Спроектируй промо-блок и калькулятор для финансового консалтинга. Покажи, как объяснить ценность продукта без лишнего шума.</p>
          <a className="btn btn-lime" href="#task">Открыть задание <ArrowRight size={20} /></a>
          <div className="hero-metrics">
            <MiniMetric icon={WalletCards} value="1 100 ₽" label="Вознаграждение" />
            <MiniMetric icon={Clock3} value="24 часа" label="На выполнение" />
            <MiniMetric icon={Figma} value="Figma" label="Формат результата" />
          </div>
        </Reveal>
        <Reveal className="hero-ui-stack">
          <div className="hero-card savings-card">
            <div className="card-row"><span>Потенциальная экономия</span><small>12 месяцев</small></div>
            <strong>1 248 000 ₽</strong>
            <div className="growth"><span>↑ 27%</span> к текущим расходам</div>
            <div className="mini-bars">{[22,32,29,42,48,55,62,73,86,96].map((v,i)=><i key={i} style={{height:`${v}%`}} />)}</div>
          </div>
          <div className="hero-card size-card">
            <p>Размер бизнеса</p>
            {Object.entries(businessData).map(([key,item],i)=><div key={key} className={i===0?'selected':''}><BriefcaseBusiness size={19}/><span><b>{item.label}</b><small>{item.sub}</small></span></div>)}
          </div>
          <div className="hero-card progress-card">
            <div className="card-row"><span>Прогресс</span><b>2 из 4</b></div>
            <div className="tiny-progress"><i /></div>
            {['Изучить задание','Спроектировать решение','Оформить в Figma','Сдать работу'].map((t,i)=><p key={t} className={i<2?'done':''}><span>{i<2?<Check size={15}/>:i+1}</span>{t}</p>)}
          </div>
        </Reveal>
      </section>

      <section className="section shell" id="task">
        <SectionHeading index="01" eyebrow="Задача" title={<>Покажи выгоду<br/>за несколько секунд</>} text="Главный блок должен быстро объяснить ценность финансового консалтинга и привести предпринимателя к плану действий." />
        <div className="task-grid">
          <Reveal className="card narrative-card">
            <span className="card-label">Контекст</span>
            <h3>Не просто цифра.<br/>Понятный результат.</h3>
            <p>Строгая бизнес-тематика, ясная иерархия, убедительные данные и спокойный интерфейс без визуального шума.</p>
            <dl><div><dt>100+</dt><dd>компаний</dd></div><div><dt>до 40%</dt><dd>экономии</dd></div><div><dt>10 мин</dt><dd>до плана</dd></div></dl>
          </Reveal>
          <Reveal className="card calculator-card">
            <div className="card-row"><span className="card-label">Калькулятор выгоды</span><small>расчёт за 30 секунд</small></div>
            <div className="business-options" role="radiogroup" aria-label="Размер бизнеса">
              {Object.entries(businessData).map(([key,item])=><label key={key} className={business===key?'active':''}><input type="radio" name="business" checked={business===key} onChange={()=>setBusiness(key)}/><span><b>{item.label}</b><small>{item.sub}</small></span></label>)}
            </div>
            <div className="calc-main">
              <div><span>Возможная экономия в год</span><strong>{money(selected.value)} ₽</strong></div>
              <div className="percent"><BarChart3 size={22}/><b>до {selected.percent}%</b><small>от текущих затрат</small></div>
            </div>
            <div className="chart" aria-label="Диаграмма экономии">{selected.bars.map((v,i)=><i key={i} className={i>5?'active':''} style={{height:`${v}%`}} />)}</div>
            <a className="btn btn-blue" href="#submit">Получить финансовый план <FileText size={19}/></a>
          </Reveal>
          <Reveal className="card compact-card"><FileText/><div><span className="card-label">Нужно от тебя</span><h3>Минимум данных — точный результат</h3></div></Reveal>
          <Reveal className="card compact-card"><BarChart3/><div><span className="card-label">Что получит клиент</span><h3>План экономии под свой бизнес</h3></div></Reveal>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading index="02" eyebrow="Что сделать" title={<>Один блок.<br/>Три доказательства.</>} text="Покажи, что решение работает на ключевых носителях и в реальных интерактивных состояниях." />
        <div className="deliverables-grid">
          <Reveal className="deliver-card featured">
            <div className="deliver-title"><Check/><h3>Desktop · 1440</h3><p>Полноценный интерфейс для большого экрана.</p></div>
            <DesktopPreview />
          </Reveal>
          <Reveal className="deliver-card mobile-card">
            <div className="deliver-title"><Check/><h3>Mobile · 375</h3><p>Тот же смысл в вертикальном сценарии.</p></div>
            <PhonePreview />
          </Reveal>
          <Reveal className="deliver-card states-card">
            <div className="deliver-title"><Check/><h3>Default / Hover / Active</h3><p>Поведение должно быть предсказуемым и живым.</p></div>
            <div className="state-buttons"><button>Default</button><button>Hover</button><button>Active</button></div>
          </Reveal>
        </div>
      </section>

      <section className="section shell" id="criteria">
        <SectionHeading index="03" eyebrow="Что оцениваем" title={<>Решение видно<br/>в деталях.</>} text="Смотрим не только на результат, но и на то, как ты к нему пришёл." />
        <div className="accordion">
          {criteria.map((item,index)=>{
            const Icon=item.icon, open=openCriterion===index
            return <Reveal key={item.title} className={`criterion ${open?'open':''}`}>
              <button onClick={()=>setOpenCriterion(open?-1:index)} aria-expanded={open}>
                <span className="criterion-index">0{index+1}</span><Icon/><b>{item.title}</b><p>{item.text}</p><ChevronDown className="chevron"/>
              </button>
              <div className="criterion-panel" inert={!open?"":undefined} aria-hidden={!open}>
                <div className="criterion-checks">{item.checks.map(t=><span key={t}><Check/>{t}</span>)}</div>
                <InterfacePreview />
              </div>
            </Reveal>
          })}
        </div>
      </section>

      <section className="section shell terms-section">
        <div className="terms-grid">
          <Reveal className="term-card"><span>Награждение</span><strong>1 100 ₽</strong><p>за успешное выполнение</p><WalletCards/></Reveal>
          <Reveal className="term-card"><span>Срок</span><strong>24 часа</strong><p>с момента получения</p><Clock3/></Reveal>
          <Reveal className="term-card"><span>Инструмент</span><strong>Figma</strong><p>ссылка с доступом</p><Figma/></Reveal>
          <Reveal className="timer-card">
            <div className="card-row"><span>До конца осталось</span><TimerReset/></div>
            <div className="countdown"><strong>{String(timer.running?timer.h:24).padStart(2,'0')}</strong><i>:</i><strong>{String(timer.running?timer.m:0).padStart(2,'0')}</strong><i>:</i><strong>{String(timer.running?timer.s:0).padStart(2,'0')}</strong></div>
            <button className="btn btn-lime" onClick={timer.start} disabled={timer.running}>{timer.running?'Отсчёт идёт':'Начать отсчёт'} <ArrowRight/></button>
          </Reveal>
        </div>
      </section>

      <section className="section shell submit-section" id="submit">
        <SectionHeading index="04" eyebrow="Финальная проверка" title={<>Готов<br/>к сдаче?</>} text="Проверь комплектность работы — и только после этого переходи к отправке." />
        <div className="submit-grid">
          <Reveal className="checklist-card">
            <div className="check-head"><div><span>Готовность</span><strong>{done} из 5</strong></div><b>{done*20}%</b></div>
            <div className="main-progress"><i style={{transform:`scaleX(${done/5})`}} /></div>
            <div className="checklist">
              {checklistItems.map((item,index)=><label key={item}><input type="checkbox" checked={checked.includes(index)} onChange={()=>toggleCheck(index)}/><span><Check/></span><b>{item}</b></label>)}
            </div>
          </Reveal>
          <Reveal className="send-card">
            <span className="card-label">Отправка работы</span>
            <h2>Отправить<br/>в Telegram</h2>
            <p>Добавь ссылку на Figma-файл и пару слов о своём решении. Ответим в течение двух рабочих дней.</p>
            <a className={`btn btn-blue ${done<5?'disabled':''}`} href={done===5?telegramUrl:undefined} target="_blank" rel="noreferrer" aria-disabled={done<5}><Send/> {done===5?'Отправить работу':'Сначала заверши чек-лист'}</a>
            <div className="next"><FileText/><span><b>Что будет дальше?</b><small>Проверим работу и вернёмся с ответом.</small></span></div>
          </Reveal>
        </div>
      </section>
    </main>
    <footer className="footer shell"><a className="logo" href="#top">Designa</a><span>UI/UX тестовое задание</span><p>Покажи, на что ты способен.</p><a href="#task">Наверх ↑</a></footer>
  </>
}

function MiniMetric({ icon: Icon, value, label }) { return <div className="mini-metric"><Icon/><span><b>{value}</b><small>{label}</small></span></div> }
function SectionHeading({ index, eyebrow, title, text }) { return <Reveal className="section-heading"><div><span>{index}</span><p>{eyebrow}</p></div><h2>{title}</h2><p>{text}</p></Reveal> }
function DesktopPreview(){return <div className="desktop-preview"><div className="preview-nav"><b>Designa</b><span/><span/><span/><i/></div><div className="preview-body"><div><i/><b/><b/><button/></div><div className="preview-chart">{[30,42,51,68,80].map((v,i)=><i key={i} style={{height:`${v}%`}}/>)}</div></div></div>}
function PhonePreview(){return <div className="phone-preview"><div className="notch"/><b>Designa</b><span/><span/><span/><button>Начать проект</button><div/></div>}
function InterfacePreview(){return <div className="interface-preview"><aside><b>Designa</b>{[1,2,3,4].map(i=><span key={i}/>)}</aside><main><header/><h4>Рабочее пространство</h4><div>{[1,2,3].map(i=><i key={i}/>)}</div><footer/></main></div>}

export default App
