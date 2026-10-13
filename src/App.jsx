import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, BarChart3, BriefcaseBusiness, Check,
  ChevronDown, Clock3, ExternalLink, FileText, Figma, Layers3, Monitor, Send,
  Settings2, ShoppingCart, Smartphone, Sparkles, TimerReset, Users, WalletCards
} from 'lucide-react'

const businessData = {
  small: {
    label: 'Малый', sub: 'до 50 сотрудников', value: 320000, percent: 24,
    employees: 35, procurement: '36 млн ₽', operations: '24 млн ₽',
    base: [12000,26000,41000,58000,76000,96000,117000,139000,162000,186000,211000,238000],
    optimized: [22000,50000,82000,118000,158000,202000,250000,301000,356000,418000,486000,558000],
    breakdown: [{label:'ФОТ',value:140000,share:44},{label:'Подрядчики',value:110000,share:34},{label:'Операционные',value:70000,share:22}]
  },
  medium: {
    label: 'Средний', sub: '50–250 сотрудников', value: 640000, percent: 40,
    employees: 150, procurement: '120 млн ₽', operations: '80 млн ₽',
    base: [20000,38000,57000,79000,101000,124000,151000,180000,211000,245000,281000,320000],
    optimized: [30000,72000,128000,174000,238000,318000,405000,510000,612000,718000,820000,960000],
    breakdown: [{label:'ФОТ',value:280000,share:44},{label:'Подрядчики',value:220000,share:34},{label:'Операционные',value:140000,share:22}]
  },
  large: {
    label: 'Крупный', sub: 'от 250 сотрудников', value: 1280000, percent: 48,
    employees: 420, procurement: '310 млн ₽', operations: '190 млн ₽',
    base: [40000,76000,114000,158000,202000,248000,302000,360000,422000,490000,562000,640000],
    optimized: [60000,144000,256000,348000,476000,636000,810000,1020000,1224000,1436000,1640000,1920000],
    breakdown: [{label:'ФОТ',value:560000,share:44},{label:'Подрядчики',value:440000,share:34},{label:'Операционные',value:280000,share:22}]
  }
}

const expenseRows = [
  { category: 'Закупки и материалы', current: 420, potential: -180, next: 240, change: '−42,9%', priority: 'Высокий' },
  { category: 'IT и лицензии', current: 160, potential: -36, next: 124, change: '−22,5%', priority: 'Средний' },
  { category: 'Административные расходы', current: 180, potential: -54, next: 126, change: '−30,0%', priority: 'Высокий' },
  { category: 'Персонал и аутсорсинг', current: 150, potential: -40, next: 110, change: '−26,7%', priority: 'Средний' },
  { category: 'Логистика и услуги', current: 90, potential: -18, next: 72, change: '−20,0%', priority: 'Низкий' }
]

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
            <div className="forecast-head">
              <div><span>Потенциальная экономия</span><strong>{money(selected.value)} ₽</strong><small>в год после внедрения рекомендаций</small></div>
              <div className="percent"><BarChart3 size={22}/><b>до {selected.percent}%</b><small>от управляемых затрат</small></div>
            </div>
            <div className="forecast-layout">
              <div className="assumptions-panel">
                <h3>Исходные допущения</h3>
                <Assumption icon={Users} label="Численность" value={`${selected.employees} чел.`} note="штат и регулярный аутсорсинг" />
                <Assumption icon={ShoppingCart} label="Закупки и подрядчики" value={selected.procurement} note="годовой объём" />
                <Assumption icon={Settings2} label="Операционные расходы" value={selected.operations} note="без ФОТ и CAPEX" />
                <p>Расчёт носит ориентировочный характер и уточняется после диагностики процессов.</p>
              </div>
              <ForecastChart data={selected} />
            </div>
            <div className="savings-breakdown">
              <div className="breakdown-title"><span>Структура экономии</span><small>вклад категорий в годовой эффект</small></div>
              {selected.breakdown.map((item,index)=><div className="breakdown-item" key={item.label}>
                <span><i>{String(index+1).padStart(2,'0')}</i>{item.label}</span>
                <strong>{money(item.value)} ₽</strong>
                <div><i style={{transform:`scaleX(${item.share/100})`}}/><small>{item.share}%</small></div>
              </div>)}
              <div className="breakdown-total"><span>Итого</span><strong>{money(selected.value)} ₽</strong></div>
            </div>
            <a className="btn btn-blue" href="#submit">Получить финансовый план <FileText size={19}/></a>
          </Reveal>
          <Reveal className="brief-evidence">
            <span className="card-label">Что должно быть доказано интерфейсом</span>
            {[['01','Источник результата','Понятно, какие категории расходов формируют эффект.'],['02','Логика расчёта','Пользователь видит допущения и различает сценарии.'],['03','Следующий шаг','Расчёт естественно ведёт к получению финансового плана.']].map(row=><div key={row[0]}><b>{row[0]}</b><strong>{row[1]}</strong><p>{row[2]}</p></div>)}
          </Reveal>
        </div>
        <Reveal className="impact-analysis">
          <div className="impact-heading"><span className="card-label">Финансовая модель · пример наполнения</span><h3>Структура эффекта</h3><p>Покажите не только итоговую сумму, но и путь от текущего бюджета к целевой модели расходов.</p></div>
          <div className="impact-grid">
            <WaterfallChart />
            <div className="benchmark"><span>Бенчмарк отрасли</span><p>Доля расходов в выручке</p>{[['35%','Пиковое значение'],['28%','Выше среднего'],['22%','Среднее по отрасли'],['16%','После оптимизации'],['10%','Лучшие в отрасли']].map((item,index)=><div className={index===3?'active':''} key={item[0]}><i style={{width:`${Number(item[0].replace('%',''))/35*100}%`}}/><b>{item[0]}</b><small>{item[1]}</small></div>)}</div>
            <aside className="impact-summary"><span>Экономия за 12 месяцев</span><strong>−32,8%</strong><b>или 328 млн ₽</b><p>при сохранении текущего объёма бизнеса</p><blockquote>Наибольший контролируемый эффект даёт консолидация закупок — без изменения качества услуги.</blockquote></aside>
          </div>
          <ExpenseTable />
        </Reveal>
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

function Assumption({ icon: Icon, label, value, note }) { return <div className="assumption"><Icon/><span><b>{label}</b><small>{note}</small></span><strong>{value}</strong></div> }

function ForecastChart({ data }) {
  const [hovered, setHovered] = useState(5)
  const months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
  const width = 900, height = 360, left = 74, right = 26, top = 38, bottom = 54
  const maxValue = Math.ceil(Math.max(...data.optimized) / 200000) * 200000
  const x = index => left + index * ((width - left - right) / 11)
  const y = value => top + (height - top - bottom) * (1 - value / maxValue)
  const line = values => values.map((value,index)=>`${index?'L':'M'} ${x(index)} ${y(value)}`).join(' ')
  const area = values => `${line(values)} L ${x(11)} ${height-bottom} L ${x(0)} ${height-bottom} Z`
  const ticks = [0,.25,.5,.75,1]
  const currentDiff = data.optimized[hovered] - data.base[hovered]
  return <div className="forecast-chart">
    <div className="chart-toolbar"><div><span>Накопительный эффект, ₽</span><small>прогноз на 12 месяцев</small></div><div className="chart-legend"><span className="base">Базовый сценарий</span><span className="optimized">После оптимизации</span></div></div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="forecast-title forecast-desc">
      <title id="forecast-title">Сравнение базового сценария и результата после оптимизации</title>
      <desc id="forecast-desc">Помесячный накопительный эффект. Разница к декабрю составляет {money(data.value)} рублей.</desc>
      <defs><linearGradient id="lime-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c7ff4a" stopOpacity=".24"/><stop offset="1" stopColor="#c7ff4a" stopOpacity="0"/></linearGradient><linearGradient id="blue-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5267ff" stopOpacity=".2"/><stop offset="1" stopColor="#5267ff" stopOpacity="0"/></linearGradient></defs>
      {ticks.map(tick=>{const value=maxValue*tick;return <g key={tick}><line className="gridline" x1={left} x2={width-right} y1={y(value)} y2={y(value)}/><text className="axis-y" x={left-14} y={y(value)+4} textAnchor="end">{value===0?'0':`${Math.round(value/1000)}k`}</text></g>})}
      {months.map((month,index)=><text key={month} className="axis-x" x={x(index)} y={height-20} textAnchor="middle">{month}</text>)}
      <path className="chart-area optimized" d={area(data.optimized)}/><path className="chart-area base" d={area(data.base)}/>
      <path className="chart-line base" d={line(data.base)}/><path className="chart-line optimized" d={line(data.optimized)}/>
      <line className="hover-line" x1={x(hovered)} x2={x(hovered)} y1={top} y2={height-bottom}/>
      {data.base.map((value,index)=><circle key={`b${index}`} className="point base" cx={x(index)} cy={y(value)} r={index===hovered?6:4} tabIndex="0" onMouseEnter={()=>setHovered(index)} onFocus={()=>setHovered(index)} aria-label={`${months[index]}, базовый сценарий ${money(value)} рублей`}/>) }
      {data.optimized.map((value,index)=><circle key={`o${index}`} className="point optimized" cx={x(index)} cy={y(value)} r={index===hovered?7:4.5} tabIndex="0" onMouseEnter={()=>setHovered(index)} onFocus={()=>setHovered(index)} aria-label={`${months[index]}, после оптимизации ${money(value)} рублей`}/>) }
      <g className="chart-tooltip" transform={`translate(${Math.min(x(hovered)+18,width-240)} ${Math.max(48,y(data.optimized[hovered])-96)})`}><rect width="208" height="84" rx="12"/><text x="14" y="24" className="tooltip-month">{months[hovered]}</text><text x="14" y="48" className="tooltip-label">После оптимизации</text><text x="194" y="48" textAnchor="end" className="tooltip-value optimized">{money(data.optimized[hovered])} ₽</text><text x="14" y="69" className="tooltip-label">Дополнительный эффект</text><text x="194" y="69" textAnchor="end" className="tooltip-value">+{money(currentDiff)} ₽</text></g>
    </svg>
    <table className="sr-only"><caption>Помесячные данные прогноза</caption><thead><tr><th>Месяц</th><th>Базовый сценарий</th><th>После оптимизации</th></tr></thead><tbody>{months.map((month,index)=><tr key={month}><td>{month}</td><td>{data.base[index]}</td><td>{data.optimized[index]}</td></tr>)}</tbody></table>
  </div>
}

function WaterfallChart(){
  const width=780,height=340,left=52,bottom=58,top=24,max=1200
  const y=value=>top+(height-top-bottom)*(1-value/max)
  const bars=[
    {label:'Текущие расходы',start:0,end:1000,value:'1 000',kind:'total'},
    {label:'Оптимизация закупок',start:1000,end:820,value:'−180',kind:'delta'},
    {label:'Автоматизация',start:820,end:750,value:'−70',kind:'delta'},
    {label:'Новая модель',start:750,end:672,value:'−78',kind:'delta'},
    {label:'После оптимизации',start:0,end:672,value:'672',kind:'total'}
  ]
  const barWidth=106,gap=38
  const bx=index=>left+26+index*(barWidth+gap)
  return <div className="waterfall"><div className="analysis-title"><span>Декомпозиция, млн ₽</span><small>12 месяцев</small></div><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="waterfall-title waterfall-desc"><title id="waterfall-title">Структура снижения расходов</title><desc id="waterfall-desc">Расходы снижаются с одной тысячи до 672 миллионов рублей за счёт закупок, автоматизации и новой операционной модели.</desc>
    {[0,200,400,600,800,1000,1200].map(value=><g key={value}><line className="gridline" x1={left} x2={width-16} y1={y(value)} y2={y(value)}/><text className="axis-y" x={left-10} y={y(value)+4} textAnchor="end">{value}</text></g>)}
    {bars.map((bar,index)=>{const topY=y(Math.max(bar.start,bar.end)),bottomY=y(Math.min(bar.start,bar.end));return <g key={bar.label}><rect className={`waterfall-bar ${bar.kind}`} x={bx(index)} y={topY} width={barWidth} height={Math.max(3,bottomY-topY)} rx="2"/><text className="waterfall-value" x={bx(index)+barWidth/2} y={topY-10} textAnchor="middle">{bar.value}</text><text className="waterfall-label" x={bx(index)+barWidth/2} y={height-34} textAnchor="middle">{bar.label.split(' ').map((word,i)=><tspan key={word+i} x={bx(index)+barWidth/2} dy={i?14:0}>{word}</tspan>)}</text>{index<bars.length-1&&index<4?<line className="connector" x1={bx(index)+barWidth} x2={bx(index+1)} y1={y(bar.end)} y2={y(bar.end)}/>:null}</g>})}
  </svg></div>
}

function ExpenseTable(){
  const totals=expenseRows.reduce((acc,row)=>({current:acc.current+row.current,potential:acc.potential+row.potential,next:acc.next+row.next}),{current:0,potential:0,next:0})
  return <div className="expense-table-wrap"><div className="expense-table-head"><h4>Детализация по категориям расходов</h4><span>все суммы указаны в млн ₽, за 12 месяцев</span></div><div className="expense-scroll"><table className="expense-table"><thead><tr><th>Категория</th><th>Текущий бюджет</th><th>Потенциал</th><th>Новый бюджет</th><th>Изменение</th><th>Приоритет</th></tr></thead><tbody>{expenseRows.map(row=><tr key={row.category}><td>{row.category}</td><td>{row.current}</td><td>{row.potential}</td><td>{row.next}</td><td className="positive">{row.change}</td><td><span className={`priority ${row.priority.toLowerCase()}`}>{row.priority}</span></td></tr>)}<tr className="total"><td>Итого</td><td>{totals.current}</td><td>{totals.potential}</td><td>{totals.next}</td><td className="positive">−32,8%</td><td>—</td></tr></tbody></table></div></div>
}

function MiniMetric({ icon: Icon, value, label }) { return <div className="mini-metric"><Icon/><span><b>{value}</b><small>{label}</small></span></div> }
function SectionHeading({ index, eyebrow, title, text }) { return <Reveal className="section-heading"><div><span>{index}</span><p>{eyebrow}</p></div><h2>{title}</h2><p>{text}</p></Reveal> }
function DesktopPreview(){return <div className="desktop-preview"><div className="preview-nav"><b>Designa</b><span/><span/><span/><i/></div><div className="preview-body"><div><i/><b/><b/><button/></div><div className="preview-chart">{[30,42,51,68,80].map((v,i)=><i key={i} style={{height:`${v}%`}}/>)}</div></div></div>}
function PhonePreview(){return <div className="phone-preview"><div className="notch"/><b>Designa</b><span/><span/><span/><button>Начать проект</button><div/></div>}
function InterfacePreview(){return <div className="interface-preview"><aside><b>Designa</b>{[1,2,3,4].map(i=><span key={i}/>)}</aside><main><header/><h4>Рабочее пространство</h4><div>{[1,2,3].map(i=><i key={i}/>)}</div><footer/></main></div>}
function ReferencePreview({ tone, name }){return <div className={`reference-preview ${tone}`} aria-hidden="true"><div className="reference-browser"><span/><span/><span/><b>{name}</b></div><div className="reference-stage"><div><i/><strong/><strong/><button/></div><aside><span/><span/><span/><span/></aside></div></div>}

export default App
