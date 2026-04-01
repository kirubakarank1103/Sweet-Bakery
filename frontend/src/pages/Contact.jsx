// ─── Contact Page ────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulated send
    toast.success('Message sent! We\'ll reply within 24 hours 📬');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div className="page-enter" style={{ paddingTop: 70 }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', textAlign: 'center', background: 'linear-gradient(180deg,#0f0c07,#0a0a0a)' }}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: 'Playfair Display, serif' }}>
            Get in <span className="gold-text">Touch</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: '#a89878', marginTop: '1rem' }}>
            We'd love to hear from you — orders, custom cakes, or just to say hello!
          </motion.p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {[
                { icon: FiMapPin, label: 'Address',   text: '12 Gold Street, Tiruppur, Tamil Nadu – 641001', href: null },
                { icon: FiPhone,  label: 'Phone',     text: '+91 98765 43210',   href: 'tel:+919876543210' },
                { icon: FiMail,   label: 'Email',     text: 'hello@sweetvenom.in', href: 'mailto:hello@sweetvenom.in' },
                { icon: FiClock,  label: 'Hours',     text: 'Mon – Sat: 8 AM – 9 PM\nSun: 9 AM – 6 PM', href: null },
              ].map(({ icon: Icon, label, text, href }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(212,162,76,0.1)', border: '1px solid rgba(212,162,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color: '#d4a24c' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#665c4a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{label}</p>
                    {href
                      ? <a href={href} style={{ color: '#a89878', fontSize: '0.95rem', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#d4a24c'}
                          onMouseLeave={e => e.currentTarget.style.color = '#a89878'}
                        >{text}</a>
                      : <p style={{ color: '#a89878', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{text}</p>
                    }
                  </div>
                </div>
              ))}

              {/* Social */}
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #1e1e1e' }}>
                <p style={{ fontSize: '0.75rem', color: '#665c4a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Follow Us</p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['Instagram', 'Facebook', 'Twitter'].map(s => (
                    <a key={s} href="#" style={{
                      padding: '0.4rem 1rem', borderRadius: 8, fontSize: '0.82rem',
                      border: '1px solid #2a2a2a', color: '#665c4a', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4a24c'; e.currentTarget.style.color = '#d4a24c'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#665c4a'; }}
                    >{s}</a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 20, padding: '2.5rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#f0ead6', marginBottom: '1.75rem' }}>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="form-input" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="form-input" placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="form-input" placeholder="What's this about?" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="form-textarea" placeholder="Tell us more..." required />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
                  {sending ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}