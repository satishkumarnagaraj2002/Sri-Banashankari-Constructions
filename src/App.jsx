import { useEffect, useState } from 'react'
import './App.css'

const currentYear = new Date().getFullYear()
const enquiryEmail = 'sribanashankariconstruct@gmail.com'
const contactNumbers = ['+919845729629', '+9174411647826', '+917022717365']
const mapQuery = 'AGS Layout, Bengaluru, Karnataka 560061'

const imageSources = {
  hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85',
  residence: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=82',
  city: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=82',
  craft: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=82',
}

const navigation = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Services', 'services'],
  ['Project types', 'project-types'],
  ['Process', 'process'],
  ['Contact', 'contact'],
]

const services = [
  { title: 'New construction', detail: 'End-to-end construction for new residential and commercial developments.' },
  { title: 'Demolition & site preparation', detail: 'Systematic demolition and preparation for what comes next.' },
  { title: 'Reconstruction', detail: 'Reimagining existing structures through considered reconstruction.' },
  { title: 'Alteration & modification', detail: 'Adapting buildings and spaces to changing requirements.' },
  { title: 'Renovation', detail: 'Thoughtful improvements to existing homes and properties.' },
  { title: 'Residential construction', detail: 'Independent homes, duplexes, apartments and residential developments.' },
  { title: 'Commercial construction', detail: 'Construction solutions for commercial properties and spaces.' },
]

const projectTypes = [
  { number: '01', name: 'Independent homes', image: imageSources.residence },
  { number: '02', name: 'Apartments & duplexes', image: imageSources.city },
  { number: '03', name: 'Commercial spaces', image: imageSources.hero },
  { number: '04', name: 'Alteration & renovation', image: imageSources.craft },
]

const processSteps = [
  'Site assessment',
  'Planning',
  'Demolition / preparation',
  'Structural work',
  'Construction',
  'Alteration / finishing',
  'Final delivery',
]

function ImagePanel({ src, alt, label, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className={`image-panel ${className}${imageFailed ? ' image-panel--fallback' : ''}`}>
      {!imageFailed && <img src={src} alt={alt} loading="lazy" onError={() => setImageFailed(true)} />}
      {label && <span className="image-caption">{label}</span>}
    </div>
  )
}

function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>{children}</p>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [formSending, setFormSending] = useState(false)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 32)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    return () => {
      window.removeEventListener('scroll', updateHeader)
      revealObserver.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  async function handleEnquiry(event) {
    event.preventDefault()
    const form = event.currentTarget
    setFormSending(true)
    setFormMessage('Sending your enquiry...')

    const formData = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${enquiryEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New construction enquiry | Sri Banashankari Constructions',
          _template: 'table',
        }),
      })
      const result = await response.json()

      if (!response.ok || result.success !== 'true' && result.success !== true) {
        throw new Error('Enquiry service did not accept the submission')
      }

      setFormMessage('Thank you. Your enquiry has been sent. We will be in touch soon.')
      form.reset()
    } catch {
      setFormMessage(`We could not send your enquiry. Please email ${enquiryEmail} or contact us on WhatsApp.`)
    } finally {
      setFormSending(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}${menuOpen ? ' site-header--menu-open' : ''}`}>
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Sri Banashankari Constructions home">
          <span className="brand-logo-badge" aria-hidden="true"><img className="brand-logo" src="/SBC-mark.png" alt="" /></span>
          <span className="wordmark-text">SRI BANASHANKARI<span>CONSTRUCTIONS</span></span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? 'Close' : 'Menu'}</span><span className="menu-lines" aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? ' primary-navigation--open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, target]) => <a key={target} href={`#${target}`} onClick={closeMenu}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Start a project <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <ImagePanel src={imageSources.hero} alt="Contemporary architectural residence shown as illustrative reference imagery" className="hero-image" label="Architectural reference imagery" />
          <div className="hero-shade" />
          <div className="hero-content">
            <Eyebrow light>Built on experience. Made for what comes next.</Eyebrow>
            <h1 id="hero-title">A legacy built.<br /><span>A future imagined.</span></h1>
            <div className="hero-bottom">
              <p>Construction expertise for homes, spaces and everything in between.</p>
              <a className="circle-link" href="#about" aria-label="Scroll to learn about Sri Banashankari Constructions"><span aria-hidden="true">↓</span></a>
              <div className="hero-proof"><span>30+ YEARS</span><b /> <span>800+ PROJECTS</span></div>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 / 06</div>
        </section>

        <section className="intro-band" id="about">
          <div className="intro-mark reveal"><Eyebrow>01 / A considered way to build</Eyebrow><span className="large-asterisk" aria-hidden="true">✳</span></div>
          <div className="intro-copy reveal">
            <h2>Three decades of experience.<br /><em>One project at a time.</em></h2>
            <p>Sri Banashankari Constructions brings more than 30 years of construction experience and over 800 successful projects to residential and commercial work. From demolition to delivery, our capability spans the full life of a build.</p>
            <a className="text-link" href="#experience">Get to know us <span aria-hidden="true">↗</span></a>
          </div>
          <div className="intro-image reveal"><ImagePanel src={imageSources.craft} alt="Construction professionals at work, used as illustrative imagery" label="Illustrative construction imagery" /></div>
        </section>

        <section className="proof-band" id="experience" aria-label="Experience and capability">
          <div className="proof-heading reveal"><Eyebrow light>Experience, in perspective</Eyebrow><p>Depth of experience.<br />Breadth of capability.</p></div>
          <div className="proof-stat reveal"><strong>30<span>+</span></strong><span>Years of experience</span></div>
          <div className="proof-stat reveal"><strong>800<span>+</span></strong><span>Successful projects</span></div>
          <div className="proof-stat proof-stat--words reveal"><strong>One<br />partner.</strong><span>Residential, commercial<br />and end-to-end capability</span></div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-heading reveal">
            <div><Eyebrow>02 / What we do</Eyebrow><h2>From first step<br /><em>to final detail.</em></h2></div>
            <p>One experienced team across the work that transforms a property. The right scope, considered from the start.</p>
          </div>
          <div className="services-layout">
            <div className="service-list" aria-label="Construction services">
              {services.map((service, index) => (
                <article className="service-row reveal" key={service.title}>
                  <span className="service-number">0{index + 1}</span>
                  <div><h3>{service.title}</h3><p>{service.detail}</p></div>
                  <span className="service-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
            <div className="services-visual reveal"><ImagePanel src={imageSources.residence} alt="Contemporary home exterior, used as illustrative architectural imagery" label="Illustrative architectural imagery" /><p>Considered work, from site preparation to the finishing details.</p></div>
          </div>
        </section>

        <section className="capability-section" aria-labelledby="capability-title">
          <div className="capability-image"><ImagePanel src={imageSources.city} alt="Modern commercial architecture, shown as illustrative reference imagery" label="Architectural reference imagery" /></div>
          <div className="capability-copy reveal">
            <Eyebrow light>03 / A range of experience</Eyebrow>
            <h2 id="capability-title">Different scales.<br /><em>One standard of care.</em></h2>
            <p>Our experience spans residential and commercial construction, new builds and existing properties. Every brief brings its own requirements; the work begins by understanding them.</p>
            <a className="text-link text-link--light" href="#project-types">Explore project types <span aria-hidden="true">↗</span></a>
          </div>
          <div className="capability-side-note">RESIDENTIAL <span>×</span> COMMERCIAL</div>
        </section>

        <section className="project-types section-pad" id="project-types">
          <div className="section-heading reveal">
            <div><Eyebrow>04 / Project types</Eyebrow><h2>Places to live.<br /><em>Spaces to work.</em></h2></div>
            <p>800+ successful projects across a range of property types. The images here are architectural references, not a portfolio of completed company projects.</p>
          </div>
          <div className="project-list">
            {projectTypes.map((project) => (
              <article className="project-type reveal" key={project.number}>
                <span className="project-number">{project.number}</span>
                <h3>{project.name}</h3>
                <ImagePanel src={project.image} alt={`${project.name}, illustrative architectural reference`} label="Illustrative reference" />
                <span className="project-cross" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <div className="project-footnote"><span className="footnote-rule" />No verified project photo archive is currently available. Project imagery can be added here as it becomes available.</div>
        </section>

        <section className="journey-section" id="process">
          <div className="journey-top section-pad">
            <div className="journey-title reveal"><Eyebrow light>05 / From ground to completion</Eyebrow><h2>A clear view<br />of the <em>journey.</em></h2></div>
            <p className="journey-intro reveal">An example of the stages our end-to-end capability can encompass. The sequence is shaped around each project's scope and needs.</p>
            <div className="journey-number reveal">30<span>+</span><small>YEARS IN THE MAKING</small></div>
          </div>
          <div className="process-track section-pad">
            {processSteps.map((step, index) => <div className="process-step reveal" key={step}><span>0{index + 1}</span><i aria-hidden="true" /><h3>{step}</h3></div>)}
          </div>
          <div className="timeline-line"><span>Experience</span><i /><span>Growth</span><i /><span>800+ projects</span><i /><span>What comes next</span></div>
        </section>

        <section className="craft-section">
          <div className="craft-copy section-pad reveal">
            <Eyebrow>06 / The work, well considered</Eyebrow>
            <h2>Built with care.<br /><em>Down to the detail.</em></h2>
            <p>Good construction is a series of thoughtful decisions. Structure, materials, workmanship and finish each have a part to play in making a building work beautifully.</p>
            <div className="craft-qualities"><span>STRUCTURE</span><span>PRECISION</span><span>CRAFTSMANSHIP</span><span>FINISH</span></div>
          </div>
          <div className="craft-photo"><ImagePanel src={imageSources.craft} alt="Construction work in progress, shown as illustrative imagery" label="Illustrative construction imagery" /></div>
          <div className="craft-caption">A commitment to considered execution at every stage.</div>
        </section>

        <section className="cta-section">
          <div className="cta-content reveal"><Eyebrow light>Have a project in mind?</Eyebrow><h2>Let's build<br /><em>something lasting.</em></h2><a className="button-link" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a></div>
          <div className="cta-image"><ImagePanel src={imageSources.residence} alt="Modern architectural detail, shown as illustrative imagery" label="Architectural reference imagery" /></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-intro reveal"><Eyebrow>07 / Start a conversation</Eyebrow><h2>Tell us what<br /><em>you're building.</em></h2><p>Share a little about your project. We can take it from there.</p>
            <div className="contact-details">
              <div className="contact-entry"><span>PHONE</span><div className="phone-links">{contactNumbers.map((number) => <a href={`tel:${number}`} key={number}>{number}</a>)}</div></div>
              <div className="contact-entry"><span>EMAIL</span><a className="contact-value" href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a></div>
              <div className="contact-entry contact-entry--whatsapp"><span>WHATSAPP</span><div className="whatsapp-links">{contactNumbers.map((number) => <a className="whatsapp-button" href={`https://wa.me/${number.slice(1)}`} key={number} target="_blank" rel="noreferrer"><span className="whatsapp-mark" aria-hidden="true">W</span>{number}<span aria-hidden="true">↗</span></a>)}</div></div>
              <div className="contact-entry"><span>OFFICE</span><strong>AGS Layout, Bengaluru 560061</strong></div>
              <div className="contact-entry"><span>BUSINESS HOURS</span><strong>Open 24 hours</strong></div>
            </div>
            <div className="contact-map">
              <div className="map-heading"><span>FIND US</span><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a></div>
              <iframe title="Map showing AGS Layout, Bengaluru 560061" src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <form className="enquiry-form reveal" onSubmit={handleEnquiry}>
            <div className="form-grid">
              <label>Your name<input autoComplete="name" name="name" placeholder="Name" required /></label>
              <label>Phone number<input autoComplete="tel" name="phone" placeholder="Phone" type="tel" required /></label>
              <label>Email address<input autoComplete="email" name="email" placeholder="Email" type="email" required /></label>
              <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select a project type</option><option>Residential construction</option><option>Commercial construction</option><option>Renovation or alteration</option><option>Demolition or reconstruction</option><option>Other</option></select></label>
              <label>Project location<input autoComplete="address-level2" name="location" placeholder="City / area" /></label>
              <label>Preferred contact method<select name="contactMethod" defaultValue=""><option value="" disabled>Select a preference</option><option>Phone</option><option>Email</option><option>WhatsApp</option></select></label>
              <label className="form-wide">A little about the project<textarea name="description" rows="4" placeholder="What would you like to build or change?" /></label>
            </div>
            <label className="form-honeypot" aria-hidden="true">Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
            <div className="form-submit"><p>Enquiries are delivered through FormSubmit. First use requires confirming its activation email.</p><button className="button-link button-link--dark" type="submit" disabled={formSending}>{formSending ? 'Sending...' : 'Send enquiry'} <span aria-hidden="true">↗</span></button></div>
            <p className="form-status" role="status" aria-live="polite">{formMessage}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#home" aria-label="Sri Banashankari Constructions home"><span className="brand-logo-badge" aria-hidden="true"><img className="brand-logo" src="/SBC-mark.png" alt="" /></span><span className="wordmark-text">SRI BANASHANKARI<span>CONSTRUCTIONS</span></span></a>
        <p>30+ YEARS <i /> 800+ PROJECTS</p>
        <nav aria-label="Footer navigation">{navigation.map(([label, target]) => <a href={`#${target}`} key={target}>{label}</a>)}</nav>
        <span className="copyright">© {currentYear} Sri Banashankari Constructions</span>
        <a className="back-top" href="#home" aria-label="Back to top">↑</a>
      </footer>
    </>
  )
}

export default App
