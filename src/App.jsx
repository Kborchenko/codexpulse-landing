import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, Menu, X } from 'lucide-react'

const services = [
  { id: '01', title: 'Продуктовая\nстратегия', text: 'Разбираем задачу, пользователей и ограничения. Собираем позиционирование, структуру и короткий план первого релиза.', deliverable: 'На выходе — карта продукта и приоритеты' },
  { id: '02', title: 'Дизайн\nинтерфейсов', text: 'Проектируем сценарии и визуальную систему, которая помогает продукту быть понятным — без шаблонных экранов и лишнего декора.', deliverable: 'На выходе — кликабельный прототип' },
  { id: '03', title: 'AI и\nразработка', text: 'Собираем фронтенд, интеграции и AI-функции. Показываем рабочие версии по ходу, а не один большой сюрприз в конце.', deliverable: 'На выходе — работающий продукт' },
  { id: '04', title: 'Запуск\nи рост', text: 'Настраиваем аналитику, проверяем ключевые сценарии и выпускаем продукт. После релиза остаёмся рядом для следующей итерации.', deliverable: 'На выходе — релиз и список улучшений' },
]

const steps = [
  { id: '01', title: 'Разбор', time: '1–2 дня', text: 'Цели, аудитория, ограничения' },
  { id: '02', title: 'Прототип', time: '2–4 дня', text: 'Структура, сценарии, направление' },
  { id: '03', title: 'Сборка', time: '3–10 дней', text: 'Интерфейс, код, интеграции' },
  { id: '04', title: 'Релиз', time: '1–2 дня', text: 'Проверка, оптимизация, запуск' },
]

function PulseMark() {
  return <svg aria-hidden="true" className="pulse-mark" viewBox="0 0 34 24" fill="none"><path d="M2 13h5l3-8 5 17 5-20 4 11h8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="CodexPulse — наверх"><PulseMark /><span>Codex<span>Pulse</span></span></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Основная навигация">
          <a href="#services" onClick={() => setMenuOpen(false)}>Что делаем</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Как работаем</a>
          <a href="#principles" onClick={() => setMenuOpen(false)}>Подход</a>
          <a className="nav-cta mobile-only" href="https://t.me/antirko" target="_blank" rel="noreferrer">Обсудить задачу</a>
        </nav>
        <div className="nav-side">
          <span className="availability"><i />Берём новые проекты</span>
          <a className="nav-cta" href="https://t.me/antirko" target="_blank" rel="noreferrer">Обсудить задачу <ArrowUpRight size={16} /></a>
          <button className="menu-button" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">AI product engineering studio <span /></p>
            <h1>Продукты,<br />которые доходят<br />до релиза<span>.</span></h1>
            <p className="hero-lead">CodexPulse проектирует и собирает лендинги, интерфейсы и AI-инструменты — от первой гипотезы до работающего продукта.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://t.me/antirko" target="_blank" rel="noreferrer">Обсудить идею <ArrowUpRight size={19} /></a>
              <a className="button button-ghost" href="#process">Посмотреть процесс <ArrowDownRight size={19} /></a>
            </div>
          </div>
          <div className="hero-system" aria-label="Схема пути от идеи до релиза">
            <div className="system-topline"><span>release pipeline</span><span>CP / 01</span></div>
            <div className="pulse-graph">
              <svg viewBox="0 0 760 260" preserveAspectRatio="none" aria-hidden="true">
                <defs><filter id="glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
                <path className="pulse-path-muted" d="M0 218 C105 218 118 153 217 153 S330 103 410 112 S522 154 585 101 S684 71 760 52" />
                <path className="pulse-path" d="M0 218 C105 218 118 153 217 153 S330 103 410 112 S522 154 585 101 S684 71 760 52" pathLength="1" />
              </svg>
              {steps.map((step, index) => <div className={`pulse-node node-${index + 1}`} key={step.id}><span className="node-dot" /><small>{step.id}</small><strong>{step.title}</strong><em>{step.time}</em></div>)}
            </div>
            <div className="build-log">
              <div><span className="log-state done"><Check size={14} /> discovery</span><span>структура согласована</span></div>
              <div><span className="log-state done"><Check size={14} /> prototype</span><span>ключевой сценарий готов</span></div>
              <div><span className="log-state active"><i /> build</span><span>интерфейс в сборке</span></div>
              <div><span className="log-state"><i /> release</span><span>следующий этап</span></div>
            </div>
          </div>
          <div className="hero-foot"><span>01</span><i /><span>От идеи к работающему продукту</span></div>
        </section>

        <section className="services light-section" id="services">
          <div className="section-kicker"><span>Что делаем</span><i /><span>Стратегия · Дизайн · Инженерия · Рост</span></div>
          <div className="services-intro"><h2>От гипотезы до<br />работающего продукта</h2><p>Не продаём набор разрозненных услуг. Под задачу собираем нужный маршрут и отвечаем за целый результат.</p></div>
          <div className="service-list">
            {services.map((service, index) => (
              <article className={activeService === index ? 'service-row is-active' : 'service-row'} key={service.id} onMouseEnter={() => setActiveService(index)}>
                <button type="button" onClick={() => setActiveService(index)} aria-expanded={activeService === index}>
                  <span className="service-id">{service.id}</span>
                  <h3>{service.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
                  <p>{service.text}</p><span className="service-arrow"><ArrowDownRight /></span>
                </button>
                <div className="service-detail" aria-hidden={activeService !== index}><span>{service.deliverable}</span><div className="artifact-lines"><i /><i /><i /></div></div>
              </article>
            ))}
          </div>
          <div className="service-notes">
            <p><strong>Гибкий состав</strong>Подключаем только нужные роли — от дизайнера до AI-инженера.</p>
            <p><strong>Прозрачный процесс</strong>Показываем промежуточные версии и честно говорим о рисках.</p>
            <p><strong>Фокус на результате</strong>Каждое решение привязано к задаче продукта, а не к тренду.</p>
          </div>
        </section>

        <section className="process" id="process">
          <div className="section-kicker section-kicker-dark"><span>Как работаем</span><i /><span>Понятные этапы вместо чёрного ящика</span></div>
          <div className="process-head"><h2>Ритм работы виден<br />с первого дня.</h2><p>Делим проект на короткие этапы. На каждом есть конкретный результат, который можно посмотреть, проверить и скорректировать.</p></div>
          <div className="timeline"><div className="timeline-line"><span /></div>{steps.map((step, index) => <article className="timeline-step" key={step.id}><span className="step-index">{step.id}</span><i className={`step-dot dot-${index + 1}`} /><h3>{step.title}</h3><strong>{step.time}</strong><p>{step.text}</p></article>)}</div>
          <div className="proof-grid">
            <div className="metric-block"><p>Типичный объём</p><strong>7–14</strong><span>дней до первого релиза небольшого веб-продукта*</span></div>
            <div className="metric-block"><p>Ориентир качества</p><strong>90<span>+</span></strong><span>целевая оценка Lighthouse по ключевым категориям*</span></div>
            <div className="build-window">
              <div className="window-bar"><span><i /><i /><i /></span><em>codexpulse / current-build</em><b>live preview</b></div>
              <div className="window-body"><div className="code-pane" aria-hidden="true"><span>01&nbsp; const idea = analyze(task)</span><span>02&nbsp; const flow = prototype(idea)</span><span>03&nbsp; const product = build(flow)</span><span className="code-active">04&nbsp; ship(product)</span><span>05&nbsp; measure(real_usage)</span></div><div className="preview-pane"><small>Текущая сборка</small><h3>Смысл →<br />интерфейс →<br /><span>релиз.</span></h3><div className="preview-status"><i /> build passed <b>00:42</b></div></div></div>
            </div>
          </div>
          <p className="fineprint">* Это ориентиры для лендинга или небольшого веб-продукта, а не гарантия. Точные сроки и показатели зависят от задачи, контента и интеграций.</p>
        </section>

        <section className="principles light-section" id="principles">
          <div className="section-kicker"><span>Принципы</span><i /><span>Как принимаем решения</span></div>
          <div className="principles-layout">
            <h2>Сначала<br />работает.<br /><span>Потом сияет.</span></h2>
            <div className="principle-list">
              <article><span>01</span><div><h3>Смысл раньше визуала</h3><p>Сначала выясняем, что человек должен понять и сделать. Потом выбираем форму.</p></div></article>
              <article><span>02</span><div><h3>Рабочая версия раньше презентации</h3><p>Проверяем решения на живом прототипе, а не защищаем их сотней слайдов.</p></div></article>
              <article><span>03</span><div><h3>Качество без театра</h3><p>Типографика, скорость, доступность и детали — часть продукта, а не «финальный полиш».</p></div></article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow contact-eyebrow">Создадим <span /> рабочее, а не просто красивое</p>
          <h2>Есть задача?<br />Соберём первый<br />рабочий релиз.</h2>
          <p className="contact-copy">Напишите пару слов о задаче. Разберём контекст, предложим следующий шаг и честно скажем, чем можем помочь.</p>
          <div className="contact-actions"><a className="button button-light" href="https://t.me/antirko" target="_blank" rel="noreferrer">Обсудить проект <ArrowUpRight size={20} /></a><a className="text-link" href="https://t.me/antirko" target="_blank" rel="noreferrer">Написать в Telegram</a></div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><a className="brand" href="#top"><PulseMark /><span>Codex<span>Pulse</span></span></a><p>Цифровые продукты, которые<br />доходят до релиза.</p></div>
        <div className="footer-nav"><a href="#services">Что делаем</a><a href="#process">Процесс</a><a href="#principles">Подход</a></div>
        <div className="footer-contact"><span className="availability"><i />Берём новые проекты</span><a href="https://t.me/antirko" target="_blank" rel="noreferrer">Telegram <ArrowUpRight size={16} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} CodexPulse</span><span>Vladivostok · Remote</span></div>
      </footer>
    </div>
  )
}

export default App
