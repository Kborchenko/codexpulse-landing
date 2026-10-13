import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, BarChart3, BriefcaseBusiness, Check,
  ChevronDown, Clock3, ExternalLink, FileText, Figma, Layers3, Monitor, Send,
  Smartphone, Sparkles, TimerReset, WalletCards
} from 'lucide-react'

const businessData = {
  small: { label: 'Малый', sub: 'до 50 сотрудников', value: 320000, percent: 24, bars: [72, 66, 62, 58, 52, 48, 42, 40, 39, 38, 36, 34] },
  medium: { label: 'Средний', sub: '50–250 сотрудников', value: 640000, percent: 40, bars: [82, 79, 74, 65, 64, 58, 51, 49, 50, 47, 45, 42] },
  large: { label: 'Крупный', sub: 'от 250 сотрудников', value: 1280000, percent: 48, bars: [90, 86, 83, 80, 72, 66, 61, 56, 53, 50, 47, 44] }
}

const criteria = [
  { title: 'Сценарий и UX-логика', text: 'Последовательный путь от исходных данных к понятному результату.', checks: ['Ясная структура и навигация', 'Аргументированный пользовательский поток', 'Интерфейс решает задачу аудитории'], icon: Layers3 },
  { title: 'Системность макета', text: 'Компонентный подход, единая сетка и проработанные состояния.', checks: ['Auto Layout и компоненты', 'Единая система отступов', 'Ключевые состояния зафиксированы'], icon: Sparkles },
  { title: 'Адаптивность', text: 'Сценарий сохраняет приоритеты на разрешениях 1440 и 375 px.', checks: ['Смысл и иерархия сохранены', 'Контент не переполняется', 'Touch-цели не меньше 44 px'], icon: Smartphone },
  { title: 'Визуальная аргументация', text: 'Современная B2B-подача, в которой стиль поддерживает доверие.', checks: ['Типографика удерживает иерархию', 'Контраст соответствует задаче', 'Акценты используются осмысленно'], icon: Monitor }
]

const checklistItems = [
  'Desktop-версия блока · 1440 px', 'Мобильная версия · 375 px',
  'Состояния Default / Hover / Active', 'Доступ к Figma открыт', 'Ссылка скопирована'
]

const references = [
  {
    name: 'Stripe', url: 'https://stripe.com', label: 'Value proposition', tone: 'violet',
    title: 'Сложный продукт — в одном ясном тезисе',
    text: 'Ориентир для первого экрана: конкретная ценность, продуктовый интерфейс и доказательства масштаба без перегруженного объяснения.',
    cues: ['Иерархия', 'Продуктовый UI', 'Доверие']
  },
  {
    name: 'Ramp', url: 'https://ramp.com', label: 'Financial impact', tone: 'lime',
    title: 'Финансовый эффект как главный аргумент',
    text: 'Пример того, как говорить о времени и деньгах на языке результата, поддерживая обещание цифрами и реальными сценариями.',
    cues: ['Метрики', 'Экономия', 'Социальное доказательство']
  },
  {
    name: 'Wise Business', url: 'https://wise.com/business', label: 'Clarity at scale', tone: 'white',
    title: 'Прозрачность вместо банковской сложности',
    text: 'Референс для спокойной типографики, понятного сравнения выгод и последовательного раскрытия финансового продукта.',
    cues: ['Простота', 'Комиссии', 'Сценарий']
  },
  {
    name: 'Linear', url: 'https://linear.app', label: 'Product craft', tone: 'blue',
    title: 'Интерфейс как часть коммуникации бренда',
    text: 'Ориентир для аккуратных состояний, плотного продуктового UI и визуальной системы, в которой детали работают на доверие.',
    cues: ['Состояния', 'Компоненты', 'Ритм']
  }
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
        <a href="#task">Бриф</a><a href="#references">Референсы</a><a href="#criteria">Критерии</a><a href="#submit">Сдача</a>
      </nav>
      <a className="top-cta" href="#task">Начать <ArrowDownRight size={17} /></a>
    </header>

    <main id="top">
      <section className="hero shell">
        <Reveal className="hero-copy">
          <p className="kicker">Design exercise · Product design</p>
          <h1>Ценность, которую <span>видно в цифрах.</span></h1>
          <p className="hero-text">Разработайте промо-модуль финансового консалтинга: от первого аргумента до персонального расчёта экономии. Решение должно быть убедительным для бизнеса и понятным без дополнительного объяснения.</p>
          <a className="btn btn-lime" href="#task">Перейти к брифу <ArrowRight size={20} /></a>
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
        <SectionHeading index="01" eyebrow="Проектный бриф" title={<>Сформируйте убедительный<br/>сценарий оценки выгоды</>} text="Пользователь должен понять ценность консультации, выбрать масштаб бизнеса и получить персонализированный ориентир по экономии — в одном последовательном сценарии." />
        <div className="task-grid">
          <Reveal className="card narrative-card">
            <span className="card-label">Коммуникационная задача</span>
            <h3>От исходных данных —<br/>к аргументированному решению.</h3>
            <p>Сохраните деловой тон, выстройте ясную информационную иерархию и покажите финансовый эффект так, чтобы цифры усиливали доверие, а не выглядели декоративно.</p>
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
          <Reveal className="card compact-card"><FileText/><div><span className="card-label">Входные данные</span><h3>Минимум полей для релевантного расчёта</h3></div></Reveal>
          <Reveal className="card compact-card"><BarChart3/><div><span className="card-label">Результат сценария</span><h3>Персональный ориентир и следующий шаг</h3></div></Reveal>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading index="02" eyebrow="Состав результата" title={<>Один сценарий.<br/>Три обязательных представления.</>} text="Продемонстрируйте целостность решения на ключевых разрешениях и зафиксируйте поведение основных интерактивных элементов." />
        <div className="deliverables-grid">
          <Reveal className="deliver-card featured">
            <div className="deliver-title"><Check/><h3>Desktop · 1440</h3><p>Основной сценарий с полной информационной иерархией.</p></div>
            <DesktopPreview />
          </Reveal>
          <Reveal className="deliver-card mobile-card">
            <div className="deliver-title"><Check/><h3>Mobile · 375</h3><p>Адаптированный сценарий без потери смысла и приоритетов.</p></div>
            <PhonePreview />
          </Reveal>
          <Reveal className="deliver-card states-card">
            <div className="deliver-title"><Check/><h3>Default / Hover / Active</h3><p>Состояния ключевых элементов и понятная обратная связь.</p></div>
            <div className="state-buttons"><button>Default</button><button>Hover</button><button>Active</button></div>
          </Reveal>
        </div>
      </section>

      <section className="section shell references-section" id="references">
        <SectionHeading index="03" eyebrow="Визуальные ориентиры" title={<>Референсы с<br/>понятной ролью.</>} text="Не копируйте стилистику буквально. Используйте примеры как ориентиры для иерархии, аргументации и качества продуктовых состояний." />
        <div className="references-grid">
          {references.map((reference, index) => <Reveal key={reference.name} className={`reference-card ${reference.tone}`}>
            <a href={reference.url} target="_blank" rel="noreferrer" aria-label={`Открыть референс ${reference.name}`}>
              <div className="reference-top"><span>0{index + 1}</span><small>{reference.label}</small><ExternalLink /></div>
              <ReferencePreview tone={reference.tone} name={reference.name} />
              <div className="reference-copy">
                <p>{reference.name}</p>
                <h3>{reference.title}</h3>
                <span>{reference.text}</span>
                <div>{reference.cues.map(cue => <i key={cue}>{cue}</i>)}</div>
              </div>
            </a>
          </Reveal>)}
        </div>
        <p className="reference-note">Все ссылки ведут на официальные сайты компаний. Референсы предназначены для анализа принципов, а не для прямого копирования интерфейса.</p>
      </section>

      <section className="section shell" id="criteria">
        <SectionHeading index="04" eyebrow="Критерии оценки" title={<>Качество решения<br/>проявляется в деталях.</>} text="Оцениваем логику пользовательского сценария, системность макета, адаптивность и аргументированность визуальных решений." />
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
          <Reveal className="term-card"><span>Вознаграждение</span><strong>1 100 ₽</strong><p>после принятия работы</p><WalletCards/></Reveal>
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
        <SectionHeading index="05" eyebrow="Перед отправкой" title={<>Проверьте<br/>комплектность работы.</>} text="Убедитесь, что все обязательные экраны, состояния и доступы подготовлены для просмотра без дополнительных запросов." />
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
            <p>Приложите ссылку на Figma-файл и кратко опишите ключевую логику решения. Обратная связь поступит в течение двух рабочих дней.</p>
            <a className={`btn btn-blue ${done<5?'disabled':''}`} href={done===5?telegramUrl:undefined} target="_blank" rel="noreferrer" aria-disabled={done<5}><Send/> {done===5?'Отправить работу':'Сначала заверши чек-лист'}</a>
            <div className="next"><FileText/><span><b>Что будет дальше?</b><small>Проверим работу и вернёмся с ответом.</small></span></div>
          </Reveal>
        </div>
      </section>
    </main>
    <footer className="footer shell"><a className="logo" href="#top">Designa</a><span>Product design exercise</span><p>Финансовый продукт, объяснённый через интерфейс.</p><a href="#top">Наверх ↑</a></footer>
  </>
}

function MiniMetric({ icon: Icon, value, label }) { return <div className="mini-metric"><Icon/><span><b>{value}</b><small>{label}</small></span></div> }
function SectionHeading({ index, eyebrow, title, text }) { return <Reveal className="section-heading"><div><span>{index}</span><p>{eyebrow}</p></div><h2>{title}</h2><p>{text}</p></Reveal> }
function DesktopPreview(){return <div className="desktop-preview"><div className="preview-nav"><b>Designa</b><span/><span/><span/><i/></div><div className="preview-body"><div><i/><b/><b/><button/></div><div className="preview-chart">{[30,42,51,68,80].map((v,i)=><i key={i} style={{height:`${v}%`}}/>)}</div></div></div>}
function PhonePreview(){return <div className="phone-preview"><div className="notch"/><b>Designa</b><span/><span/><span/><button>Начать проект</button><div/></div>}
function InterfacePreview(){return <div className="interface-preview"><aside><b>Designa</b>{[1,2,3,4].map(i=><span key={i}/>)}</aside><main><header/><h4>Рабочее пространство</h4><div>{[1,2,3].map(i=><i key={i}/>)}</div><footer/></main></div>}
function ReferencePreview({ tone, name }){return <div className={`reference-preview ${tone}`} aria-hidden="true"><div className="reference-browser"><span/><span/><span/><b>{name}</b></div><div className="reference-stage"><div><i/><strong/><strong/><button/></div><aside><span/><span/><span/><span/></aside></div></div>}

export default App
