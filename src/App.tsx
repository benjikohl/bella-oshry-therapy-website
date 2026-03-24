/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { ArrowRight, Check, Menu, X, Plus, Minus, Quote, MapPin, Mail, Phone } from "lucide-react";
import React, { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const stagger = {
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-ink/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-xl font-serif group-hover:italic transition-all">{question}</span>
        {isOpen ? <Minus size={20} className="opacity-40" /> : <Plus size={20} className="opacity-40" />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <p className="pt-4 text-brand-muted font-light leading-relaxed max-w-2xl">
            {answer}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Individual Therapy",
    otherSubject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = formData.subject === "Other" ? formData.otherSubject : formData.subject;
    const mailtoLink = `mailto:info@bellaoshrylmft.com?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen selection:bg-brand-clay/30">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-sage z-[60] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-clay/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-serif tracking-widest uppercase cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Bella Oshry <span className="text-xs font-sans tracking-normal opacity-60 ml-1">LMFT</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-medium opacity-70">
            <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
            <a href="#approach" className="hover:text-brand-gold transition-colors">Approach</a>
            <a href="#services" className="hover:text-brand-gold transition-colors">Services</a>
            <a href="#faq" className="hover:text-brand-gold transition-colors">FAQ</a>
            <a href="#contact" className="px-6 py-2.5 bg-brand-sage text-brand-cream rounded-full hover:bg-brand-moss transition-all">Connect</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-brand-cream border-b border-brand-clay/10 p-8 flex flex-col gap-8 text-center uppercase tracking-[0.2em] text-xs"
          >
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#approach" onClick={() => setIsMenuOpen(false)}>Approach</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-4 bg-brand-sage text-brand-cream rounded-full">Connect</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-[50rem] h-[50rem] bg-brand-blush rounded-full blur-[140px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 -right-20 w-[45rem] h-[45rem] bg-brand-clay/50 rounded-full blur-[140px] opacity-70 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-brand-petal/30 rounded-full blur-[160px] opacity-50" />
          <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-brand-sky/40 rounded-full blur-[120px] opacity-60" />
        </div>
        
        <div className="relative z-10 max-w-5xl text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[10px] uppercase tracking-[0.4em] mb-8 text-brand-gold font-medium bg-brand-cream/50 px-4 py-1 rounded-full backdrop-blur-sm"
          >
            Licensed Marriage & Family Therapist
          </motion.span>
          <motion.h1 
            {...fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.95] mb-10 text-balance"
          >
            Clarity in the <span className="italic text-brand-sage relative">
              unfolding.
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute bottom-2 left-0 h-1 bg-brand-clay/40 -z-10"
              />
            </span>
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-2xl text-brand-muted max-w-3xl mx-auto mb-14 font-light leading-relaxed"
          >
            Therapy that meets you where you are—and helps you move forward with deeper understanding and meaningful change.
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-4 px-10 py-5 bg-brand-sage text-brand-cream rounded-full text-xs uppercase tracking-[0.2em] hover:bg-brand-moss transition-all shadow-2xl shadow-brand-sage/20"
            >
              Schedule a Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="text-xs uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">Learn More</a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-6 bg-brand-blush/40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 aspect-[3/4] bg-brand-clay/20 rounded-[2.5rem] overflow-hidden relative shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=800" 
              alt="Serene minimalist interior" 
              className="w-full h-full object-cover brightness-105 transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blush/40 to-transparent" />
          </motion.div>
          
          <div className="lg:col-span-7 space-y-10">
            <motion.div {...fadeIn}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 block">The Practitioner</span>
              <h2 className="text-5xl md:text-7xl font-serif">Hi, I’m Bella.</h2>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-8 text-xl text-brand-muted font-light leading-relaxed">
              <p>
                I’m a Licensed Marriage and Family Therapist dedicated to helping individuals navigate life with more clarity, self-trust, and emotional balance.
              </p>
              <p>
                My work is grounded in the belief that meaningful change happens when you feel truly seen and understood. Therapy with me is collaborative, thoughtful, and tailored to who you are—not a one-size-fits-all approach.
              </p>
              <p className="italic font-serif text-brand-moss">
                "Whether you're feeling overwhelmed, stuck in patterns that no longer serve you, or simply wanting to understand yourself on a deeper level, this is a space where we can slow things down and make sense of it together."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="approach" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div {...fadeIn}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 block">The Journey</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 text-balance">How we work together.</h2>
              <p className="text-lg text-brand-muted font-light leading-relaxed">
                Therapy is a collaborative process of exploration and growth. We move at a pace that feels safe for you, while gently challenging the patterns that no longer serve your well-being.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-video bg-brand-blush rounded-3xl overflow-hidden shadow-xl relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200" 
                alt="Soft morning light" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-petal/10 mix-blend-soft-light" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Connection", desc: "A brief consultation to ensure we're a good fit and to discuss your goals for therapy." },
              { step: "02", title: "Discovery", desc: "We'll explore your history, current challenges, and the patterns that shape your life." },
              { step: "03", title: "Integration", desc: "Building new tools and perspectives that create lasting, sustainable change." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="relative p-10 bg-brand-blush/30 rounded-3xl border border-brand-clay/20 hover:bg-brand-blush/60 transition-colors"
              >
                <span className="text-6xl font-serif text-brand-clay/20 absolute top-6 right-8">{item.step}</span>
                <h3 className="text-2xl font-serif mb-6">{item.title}</h3>
                <p className="text-brand-muted font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 bg-gradient-to-br from-brand-moss via-brand-sage to-brand-moss text-brand-cream rounded-[3rem] mx-4 my-10 shadow-2xl shadow-brand-moss/20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-60 mb-4 block">Specializations</span>
              <h2 className="text-5xl md:text-7xl font-serif">Areas of Focus</h2>
            </div>
            <p className="max-w-md text-brand-cream/80 font-light leading-relaxed">
              A thoughtful, personalized approach to therapy, drawing from evidence-based modalities while staying attuned to your unique needs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Individual Therapy",
                desc: "A space to explore your thoughts, emotions, and experiences with care and intention. We’ll work together to better understand what you’re going through and develop tools that support you in your everyday life.",
                color: "bg-brand-cream/5"
              },
              {
                title: "Anxiety & Stress",
                desc: "For those feeling overwhelmed, constantly on edge, or struggling to slow down. Together, we’ll work on reducing anxiety, building resilience, and helping you feel more grounded and in control.",
                color: "bg-brand-cream/10"
              },
              {
                title: "Relationships & Life Transitions",
                desc: "Support through relationship challenges, breakups, or major life changes. We’ll navigate these moments with clarity and intention, helping you move forward in a way that feels aligned with you.",
                color: "bg-brand-cream/5"
              },
              {
                title: "Self-Esteem & Identity",
                desc: "For those wanting to feel more confident, secure, and connected to themselves. This work focuses on understanding your inner dialogue, shifting self-perception, and building a stronger sense of self.",
                color: "bg-brand-cream/10"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                whileHover={{ y: -5 }}
                className={`p-12 ${service.color} backdrop-blur-sm rounded-3xl border border-brand-cream/10 hover:bg-brand-cream hover:text-brand-ink transition-all duration-500 group`}
              >
                <h3 className="text-3xl font-serif mb-8 group-hover:italic transition-all">{service.title}</h3>
                <p className="opacity-70 font-light leading-relaxed group-hover:opacity-100">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-40 px-6 bg-gradient-to-b from-brand-blush/20 to-brand-petal/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg">
              <Quote size={32} className="text-brand-gold opacity-60" />
            </div>
            <p className="text-3xl md:text-4xl font-serif leading-relaxed italic mb-10 text-brand-ink/80">
              "Working with Bella has been a transformative experience. Her presence is grounding, and her insights have helped me navigate one of the most difficult transitions of my life with a new sense of clarity."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-brand-gold/30" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold opacity-60">Client Reflection</span>
              <div className="h-px w-10 bg-brand-gold/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <motion.div {...fadeIn} className="sticky top-32">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 block">Common Questions</span>
                <h2 className="text-5xl md:text-6xl font-serif mb-12">Understanding the process.</h2>
                <div className="aspect-square bg-brand-blush rounded-3xl overflow-hidden shadow-lg hidden lg:block relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
                    alt="Soft mountain landscape" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-sky/20 mix-blend-overlay" />
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                <FAQItem 
                  question="How do I know if therapy is right for me?" 
                  answer="Therapy is a valuable tool for anyone wanting to understand themselves better, navigate transitions, or manage stress. If you feel stuck, overwhelmed, or simply curious about your inner world, it's likely a good time to start."
                />
                <FAQItem 
                  question="What can I expect in our first session?" 
                  answer="Our first session is about getting to know each other. We'll discuss what brings you to therapy, your goals, and how we might work together. It's a space for you to share as much or as little as you feel comfortable with."
                />
                <FAQItem 
                  question="How long does the therapy process take?" 
                  answer="The duration of therapy is unique to each individual. Some find short-term support helpful for specific transitions, while others prefer longer-term work for deeper exploration. We will regularly check in on your progress and needs."
                />
                <FAQItem 
                  question="Do you offer remote sessions?" 
                  answer="Yes, I offer secure, HIPAA-compliant telehealth sessions for clients residing in New Jersey, providing flexibility and comfort from your own space."
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer Section */}
      <section id="contact" className="pt-40 pb-20 px-6 bg-gradient-to-br from-brand-blush/40 via-brand-sky/20 to-brand-petal/40 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 mb-32">
            <motion.div {...fadeIn}>
              <h2 className="text-6xl md:text-8xl font-serif mb-10">A space to begin.</h2>
              <p className="text-xl text-brand-muted font-light leading-relaxed mb-12">
                Starting therapy can feel like a big step—but it doesn’t have to feel overwhelming. If you’re ready to explore what this process could look like for you, I’d be happy to connect.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="p-8 bg-brand-cream/50 rounded-3xl backdrop-blur-sm border border-brand-clay/10">
                  <Mail size={24} className="text-brand-gold mb-4" />
                  <h4 className="text-sm uppercase tracking-widest mb-2">Email</h4>
                  <a href="mailto:info@bellaoshrylmft.com" className="text-sm text-brand-muted hover:text-brand-gold transition-colors">info@bellaoshrylmft.com</a>
                </div>
                <div className="p-8 bg-brand-cream/50 rounded-3xl backdrop-blur-sm border border-brand-clay/10">
                  <MapPin size={24} className="text-brand-gold mb-4" />
                  <h4 className="text-sm uppercase tracking-widest mb-2">Location</h4>
                  <span className="text-sm text-brand-muted">New Jersey (Telehealth Only)</span>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-brand-cream p-12 rounded-[3rem] shadow-xl border border-brand-clay/10">
              <h3 className="text-2xl font-serif mb-8">Inquire about a consultation</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-clay/20 py-4 text-sm focus:border-brand-gold outline-none transition-colors" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-clay/20 py-4 text-sm focus:border-brand-gold outline-none transition-colors" 
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-60">Subject of Inquiry</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-clay/20 py-4 text-sm focus:border-brand-gold outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Individual Therapy">Individual Therapy</option>
                    <option value="Anxiety & Stress">Anxiety & Stress</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Life Transitions">Life Transitions</option>
                    <option value="Self-Esteem">Self-Esteem</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.subject === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <input 
                      type="text" 
                      placeholder="Please specify subject" 
                      required
                      value={formData.otherSubject}
                      onChange={(e) => setFormData({ ...formData, otherSubject: e.target.value })}
                      className="w-full bg-transparent border-b border-brand-clay/20 py-4 text-sm focus:border-brand-gold outline-none transition-colors" 
                    />
                  </motion.div>
                )}

                <textarea 
                  placeholder="Message" 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-brand-clay/20 py-4 text-sm focus:border-brand-gold outline-none transition-colors resize-none" 
                />
                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-sage text-brand-cream rounded-full text-xs uppercase tracking-[0.3em] hover:bg-brand-moss transition-all"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-20 border-t border-brand-clay/10">
            <div className="text-2xl font-serif tracking-widest uppercase">
              Bella Oshry <span className="text-xs font-sans tracking-normal opacity-60 ml-1">LMFT</span>
            </div>
            
            <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] opacity-40">
              <a href="#" className="hover:text-brand-gold">Privacy</a>
              <a href="#" className="hover:text-brand-gold">Terms</a>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
