import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './App.css'

type FormErrors = Record<string, string>

type Marker = {
  id: number
  name: string
  students: string
  x: number
  y: number
}

const slides = [
  {
    headline: 'Turning Waste Into Opportunities',
    body: 'We transform discarded materials into durable school bags that open doors for young learners.',
    background: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
    ctas: [
      { label: 'Request Bags', href: '#request' },
      { label: 'Discover Our Impact', href: '#impact' },
    ],
  },
  {
    headline: 'Waste Today. Opportunity Tomorrow.',
    body: 'Every bag tells a story of circular design, dignified work, and renewed purpose.',
    background: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    ctas: [
      { label: 'Explore Our Process', href: '#timeline' },
      { label: 'Become a Partner', href: '#partners' },
    ],
  },
  {
    headline: 'Sustainable Bags Designed With Purpose',
    body: 'Thoughtful craftsmanship meets local impact through community-led production.',
    background: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    ctas: [
      { label: 'Shop Tote Bags', href: 'https://wa.me/233500000000', target: '_blank' },
      { label: 'Customize a Bag', href: '#request' },
    ],
  },
  {
    headline: 'Help Equip The Next Generation',
    body: 'Support school communities across Ghana with a practical, premium resource.',
    background: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1600&q=80',
    ctas: [
      { label: 'Submit A Request', href: '#request' },
      { label: 'View Supported Schools', href: '#schools' },
    ],
  },
]

const solutionCards = [
  {
    emoji: '♻️',
    title: 'Recycling Innovation',
    description: 'We recover waste materials and turn them into reusable products with lasting social value.',
  },
  {
    emoji: '🎒',
    title: 'Educational Support',
    description: 'Each bag supports students by helping schools meet practical learning needs.',
  },
  {
    emoji: '🌍',
    title: 'Community Impact',
    description: 'Our work strengthens communities through local partnerships and dependable delivery.',
  },
]

const productCategories = [
  {
    title: 'Community School Bags',
    ctaLabel: 'Request Bags',
    products: [
      { name: 'Classroom Pack Tote', description: 'Built for daily use and school readiness.', image: '👜' },
      { name: 'Learning Essentials Bag', description: 'Sturdy storage for books and supplies.', image: '🎒' },
    ],
  },
  {
    title: 'Lifestyle Tote Collection',
    ctaLabel: 'Shop Collection',
    products: [
      { name: 'Urban Carry Tote', description: 'Premium everyday style with recycled texture.', image: '🛍️' },
      { name: 'Market Day Tote', description: 'A bold practical option for city and campus life.', image: '🧺' },
    ],
  },
]

const schoolCards = [
  {
    name: 'Asempanaye Basic School',
    location: 'Western Region',
    students: '120 Students',
    year: '2026',
  },
  {
    name: 'Kumasi Learning Centre',
    location: 'Ashanti Region',
    students: '85 Students',
    year: '2025',
  },
]

const partnerCards = [
  {
    title: 'Schools',
    description: 'Support a school-led delivery and equip learners through tailored bag requests.',
  },
  {
    title: 'NGOs',
    description: 'Join a trusted network and help communities access essential educational tools.',
  },
  {
    title: 'Companies',
    description: 'Sponsor production and amplify local impact through measurable partnerships.',
  },
  {
    title: 'Individuals',
    description: 'Become a changemaker by funding bags and sharing the story of circular impact.',
  },
]

const timelineSteps = [
  {
    title: 'Waste Collection',
    description: 'Discarded materials are collected from homes, institutions, and partner networks.',
  },
  {
    title: 'Material Processing',
    description: 'The materials are cleaned, sorted, and prepared into durable fabric components.',
  },
  {
    title: 'Bag Creation',
    description: 'Skilled makers produce school bags and lifestyle totes with strong craftsmanship.',
  },
  {
    title: 'Community Distribution',
    description: 'Bags reach schools, families, and communities who rely on them every day.',
  },
]

const mapMarkers: Marker[] = [
  { id: 1, name: 'Asempanaye', students: '120 Students', x: 28, y: 60 },
  { id: 2, name: 'Kumasi Learning Centre', students: '85 Students', x: 48, y: 48 },
  { id: 3, name: 'Cape Coast Hub', students: '70 Students', x: 38, y: 74 },
]

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
]

const involvedLinks = [
  { label: 'Schools', href: '#schools' },
  { label: 'Partner With Us', href: '#partners' },
  { label: 'Request Bags', href: '#request' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter/X', href: 'https://x.com' },
]

const initialFormState = {
  organization: '',
  contactName: '',
  email: '',
  phone: '',
  location: '',
  bags: '',
  message: '',
}

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMarker, setActiveMarker] = useState<number | null>(null)
  const [formData, setFormData] = useState(initialFormState)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const reducedMotion = useReducedMotion()
  const [impactValues, setImpactValues] = useState({ bags: 0, schools: 0, waste: 0, communities: 0 })

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image()
      img.src = slide.background
    })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setImpactValues({ bags: 10000, schools: 50, waste: 5, communities: 20 })
      return
    }

    const targets = { bags: 10000, schools: 50, waste: 5, communities: 20 }
    const start = window.performance.now()
    const duration = 2000

    let frame = 0
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setImpactValues({
        bags: Math.round(progress * targets.bags),
        schools: Math.round(progress * targets.schools),
        waste: Math.round(progress * targets.waste),
        communities: Math.round(progress * targets.communities),
      })
      if (progress < 1) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    frame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frame)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [reducedMotion])

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setFormErrors((current) => ({ ...current, [name]: '' }))
    setSubmitState('idle')
  }

  const validateForm = () => {
    const errors: FormErrors = {}
    if (!formData.organization.trim()) errors.organization = 'Organization or school name is required.'
    if (!formData.contactName.trim()) errors.contactName = 'Contact person name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Enter a valid email address.'
    if (!/^\d{7,15}$/.test(formData.phone)) errors.phone = 'Phone number must contain 7–15 digits.'
    if (!formData.location.trim()) errors.location = 'Location or region is required.'
    const bagCount = Number(formData.bags)
    if (!formData.bags || !Number.isInteger(bagCount) || bagCount < 1 || bagCount > 10000) {
      errors.bags = 'Enter an integer between 1 and 10,000.'
    }
    return errors
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setSubmitState('error')
      setMessage('Please correct the highlighted fields before submitting.')
      return
    }

    setIsSubmitting(true)
    setSubmitState('idle')
    setMessage('')

    try {
      const response = await fetch('https://formspree.io/f/mzdnpaej', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitState('success')
        setMessage('Request received. Our team will be in touch soon.')
        setFormData(initialFormState)
        setFormErrors({})
      } else {
        setSubmitState('error')
        setMessage('The request could not be sent. Please try again or contact us directly on WhatsApp.')
      }
    } catch {
      setSubmitState('error')
      setMessage('The request could not be sent. Please try again or contact us directly on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-shell">
      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection('home') }}>
          Enactus
        </a>
        <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['home', 'story', 'products', 'impact', 'schools', 'partners'].map((id) => {
            const label = {
              home: 'Home',
              story: 'Our Story',
              products: 'Products',
              impact: 'Impact',
              schools: 'Schools',
              partners: 'Partner With Us',
            }[id]
            return (
              <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(id) }}>
                {label}
              </a>
            )
          })}
          <a className="nav-cta" href="#request" onClick={(event) => { event.preventDefault(); scrollToSection('request') }}>
            Request Bags
          </a>
        </div>
      </nav>

      <main>
        <section
          id="home"
          className="hero-section"
          style={{ backgroundImage: `url(${slides[activeSlide].background})` }}
        >
          <div className="hero-overlay" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide}
              className="hero-content"
              initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeInOut' }}
            >
              <div className="hero-copy">
                <h1>{slides[activeSlide].headline}</h1>
              </div>
              <div className="hero-support">
                <p className="hero-body">{slides[activeSlide].body}</p>
                <div className="hero-actions">
                  {slides[activeSlide].ctas.map((cta) => (
                    <a key={cta.label} className={cta.label === 'Request Bags' || cta.label === 'Submit A Request' ? 'btn btn-primary' : 'btn btn-secondary'} href={cta.href} target={cta.target} rel="noreferrer" onClick={(event) => {
                      if (cta.href.startsWith('#')) {
                        event.preventDefault();
                        scrollToSection(cta.href.replace('#', ''))
                      }
                    }}>
                      {cta.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="stats-bar">
            <div><strong>500+</strong><span>Students Supported</span></div>
            <div><strong>10+</strong><span>Communities Reached</span></div>
            <div><strong>1000kg+</strong><span>Waste Repurposed</span></div>
          </div>
        </section>

        <motion.section id="story" className="section story-section" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}>
          <div className="story-shell">
            <div className="story-copy">
              <p className="eyebrow">Our Story</p>
              <h2>Where waste becomes dignity, purpose, and opportunity.</h2>
              <p>
                In communities where resources are scarce, everyday waste is often treated as a burden. We see it differently. With careful design and local craftsmanship, discarded materials are transformed into dependable school bags that carry more than books—they carry confidence, readiness, and hope.
              </p>
              <p>
                Every bag tells a story of circular thinking, practical impact, and a future shaped by community-led innovation.
              </p>
            </div>
            <div className="story-visual">
              <div className="story-card glass-card">
                <span className="story-badge">Crafted with care</span>
                <h3>From discarded materials to meaningful tools for learning.</h3>
                <p>Built through a process rooted in sustainability, local pride, and long-term community value.</p>
              </div>
              <div className="story-image" aria-hidden="true" />
            </div>
          </div>
        </motion.section>

        <motion.section id="solution" className="section solutions-section" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}>
          <div className="solutions-shell">
            <div className="solutions-panel">
              <p className="eyebrow">Our Solution</p>
              <h2>Practical innovation shaped by community needs.</h2>
              <p>
                We turn discarded materials into durable products that support learning, uplift local economies, and build a stronger sense of possibility.
              </p>
              <div className="solution-pill-row">
                <span>Reusable</span>
                <span>Community-led</span>
                <span>Built to last</span>
              </div>
            </div>
            <div className="solutions-quote glass-card">
              <span className="story-badge">Designed with purpose</span>
              <h3>Every solution is created to serve both people and place.</h3>
              <p>From waste recovery to real-world impact, each step is intentional and measurable.</p>
            </div>
          </div>
          <div className="solution-grid">
            {solutionCards.map((card, index) => (
              <motion.article key={card.title} className="solution-card premium-card" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}>
                <div className="solution-icon">{card.emoji}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="products" className="section" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}>
          <div className="section-heading">
            <p className="eyebrow">Products</p>
            <h2>Choose the collection that fits your need</h2>
          </div>
          <div className="product-columns">
            {productCategories.map((category, categoryIndex) => (
              <div key={category.title} className="category-block">
                <h3>{category.title}</h3>
                <div className="product-grid">
                  {category.products.map((product, productIndex) => (
                    <motion.article key={product.name} className="card product-card" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: categoryIndex * 0.15 + productIndex * 0.15, ease: 'easeOut' }}>
                      <div className="product-icon">{product.image}</div>
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                      <a className="btn btn-primary" href="#request" onClick={(event) => { event.preventDefault(); scrollToSection('request') }}>
                        {category.ctaLabel}
                      </a>
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="customization" className="section customization-section" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}>
          <div className="section-heading">
            <p className="eyebrow">Customization Experience</p>
            <h2>Brand a bag that reflects your school identity</h2>
          </div>
          <div className="customization-layout">
            <motion.div className="compare-card" initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}>
              <div className="compare-panel">
                <h3>Before</h3>
                <div className="bag-preview plain" />
              </div>
              <div className="compare-panel">
                <h3>After</h3>
                <div className="bag-preview branded" />
              </div>
            </motion.div>
            <div className="feature-list">
              {['School branding', 'Logos', 'Colors', 'Community identity'].map((feature) => (
                <div key={feature} className="feature-item">
                  <span>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
              <a className="btn btn-primary" href="#request" onClick={(event) => { event.preventDefault(); scrollToSection('request') }}>
                Customize Your Order
              </a>
            </div>
          </div>
        </motion.section>

        <section id="request" className="section request-section">
          <div className="section-heading">
            <p className="eyebrow">Request Portal</p>
            <h2>Submit a request for bags or support</h2>
          </div>
          <div className="request-layout">
            <div className="process-card">
              <h3>How it works</h3>
              <ol>
                <li>Submit Request</li>
                <li>Team Reviews</li>
                <li>Production Begins</li>
                <li>Community Receives Bags</li>
              </ol>
            </div>
            <form className="request-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label>
                  <span>Organization/School Name</span>
                  <input name="organization" value={formData.organization} onChange={handleFieldChange} aria-invalid={Boolean(formErrors.organization)} />
                  {formErrors.organization && <small>{formErrors.organization}</small>}
                </label>
                <label>
                  <span>Contact Person Name</span>
                  <input name="contactName" value={formData.contactName} onChange={handleFieldChange} aria-invalid={Boolean(formErrors.contactName)} />
                  {formErrors.contactName && <small>{formErrors.contactName}</small>}
                </label>
                <label>
                  <span>Email Address</span>
                  <input name="email" type="email" value={formData.email} onChange={handleFieldChange} aria-invalid={Boolean(formErrors.email)} />
                  {formErrors.email && <small>{formErrors.email}</small>}
                </label>
                <label>
                  <span>Phone Number</span>
                  <input name="phone" value={formData.phone} onChange={handleFieldChange} aria-invalid={Boolean(formErrors.phone)} />
                  {formErrors.phone && <small>{formErrors.phone}</small>}
                </label>
                <label>
                  <span>Location/Region</span>
                  <input name="location" value={formData.location} onChange={handleFieldChange} aria-invalid={Boolean(formErrors.location)} />
                  {formErrors.location && <small>{formErrors.location}</small>}
                </label>
                <label>
                  <span>Number of Bags Requested</span>
                  <input name="bags" type="number" min="1" max="10000" value={formData.bags} onChange={handleFieldChange} aria-invalid={Boolean(formErrors.bags)} />
                  {formErrors.bags && <small>{formErrors.bags}</small>}
                </label>
              </div>
              <label className="full-width">
                <span>Message/Additional Details</span>
                <textarea name="message" value={formData.message} onChange={handleFieldChange} rows={4} />
              </label>
              {message && <div className={`form-message ${submitState === 'success' ? 'success' : 'error'}`}>{message}</div>}
              <button className="btn btn-primary submit-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Submit Request'}
              </button>
            </form>
          </div>
        </section>

        <motion.section id="schools" className="section" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}>
          <div className="section-heading">
            <p className="eyebrow">Supported Schools</p>
            <h2>Schools already receiving support</h2>
          </div>
          <div className="school-grid">
            {schoolCards.map((school, index) => (
              <motion.article key={school.name} className="card school-card" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}>
                <h3>{school.name}</h3>
                <p><strong>Location:</strong> {school.location}</p>
                <p><strong>Students Supported:</strong> {school.students}</p>
                <p><strong>Year Supported:</strong> {school.year}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="impact" className="section impact-dashboard" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}>
          <div className="section-heading">
            <p className="eyebrow">Impact</p>
            <h2>Measurable outcomes at scale</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-tile"><strong>{impactValues.bags.toLocaleString()}+</strong><span>Bags Produced</span></div>
            <div className="impact-tile"><strong>{impactValues.schools}+</strong><span>Schools Supported</span></div>
            <div className="impact-tile"><strong>{impactValues.waste} Tons</strong><span>Waste Recycled</span></div>
            <div className="impact-tile"><strong>{impactValues.communities}+</strong><span>Communities Impacted</span></div>
          </div>
        </motion.section>

        <section id="partners" className="section">
          <div className="section-heading">
            <p className="eyebrow">Partners &amp; Sponsors</p>
            <h2>Support the journey in a way that fits you</h2>
          </div>
          <div className="partner-grid">
            {partnerCards.map((card) => (
              <article key={card.title} className="card partner-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a className="btn btn-secondary" href="#request" onClick={(event) => { event.preventDefault(); scrollToSection('request') }}>
                  Partner With Us
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section map-section">
          <div className="section-heading">
            <p className="eyebrow">Interactive Impact Map</p>
            <h2>Where the work reaches</h2>
          </div>
          <div className="map-wrapper" onClick={() => setActiveMarker(null)}>
            {mapMarkers.length > 0 ? (
              <svg viewBox="0 0 100 100" className="map-svg" role="img" aria-label="Map of Ghana with supported communities">
                <rect x="5" y="5" width="90" height="90" rx="12" className="map-bg" />
                <path d="M21 37c4-7 9-12 15-15 3-2 8-4 9-2 2 3-3 8-1 12 2 4 10 3 15 5 4 2 6 9 10 11 4 2 10 3 13 7 2 3 4 7 1 10-2 3-5 4-8 5-5 1-10-1-16 1-5 2-8 8-13 9-4 1-8 0-12-2-6-3-10-9-13-14-4-5-6-10-6-16 0-6 2-11 5-15z" className="map-region" />
                {mapMarkers.map((marker) => (
                  <g key={marker.id} onClick={(event) => { event.stopPropagation(); setActiveMarker(marker.id) }} onMouseEnter={() => setActiveMarker(marker.id)} onMouseLeave={() => setActiveMarker(null)}>
                    <circle cx={marker.x} cy={marker.y} r="3.5" className="map-marker" />
                    <circle cx={marker.x} cy={marker.y} r="1.8" className="map-marker-core" />
                  </g>
                ))}
              </svg>
            ) : (
              <div className="map-fallback">Impact location data is currently unavailable.</div>
            )}
            {activeMarker !== null && (
              <div className="map-tooltip">
                <strong>{mapMarkers.find((marker) => marker.id === activeMarker)?.name}</strong>
                <span>{mapMarkers.find((marker) => marker.id === activeMarker)?.students}</span>
              </div>
            )}
          </div>
        </section>

        <motion.section className="section" initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}>
          <div className="section-heading">
            <p className="eyebrow">Storytelling Timeline</p>
            <h2>From waste to opportunity</h2>
          </div>
          <div className="timeline-row">
            {timelineSteps.map((step, index) => (
              <motion.article key={step.title} className="timeline-step" initial={reducedMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.2, ease: 'easeOut' }}>
                <div className="timeline-number">0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>

      <a className="whatsapp-button" href="https://wa.me/233500000000" target="_blank" rel="noreferrer">
        <span>💬</span>
        <span>Chat With Us</span>
      </a>

      <footer className="site-footer">
        <div className="footer-brand">
          <h3>Enactus</h3>
          <p>Transforming waste into opportunities, one bag at a time.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <ul>{quickLinks.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
          </div>
          <div>
            <h4>Get Involved</h4>
            <ul>{involvedLinks.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
          </div>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <ul>{socialLinks.map((link) => <li key={link.label}><a href={link.href} target="_blank" rel="noreferrer">{link.label}</a></li>)}</ul>
          <p>Email: impact@enactus.org</p>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Enactus. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
