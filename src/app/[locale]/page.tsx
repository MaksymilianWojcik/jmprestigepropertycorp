'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import { siteInfo, heroSection, services, aboutSection, testimonials, contactSection, properties, getPropertyImages } from "../content";
import { ServiceCard, TestimonialCard, FeatureItem, ContactInfoItem, PropertyCard } from "../components";
import { LanguageSwitcher } from "../LanguageSwitcher";

export default function Home() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [defaultMessage, setDefaultMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(contactSection.formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        setFormMessage(t('contact.form.successMessage'));
        form.reset();
        setDefaultMessage('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        setFormStatus('error');
        setFormMessage(t('contact.form.errorMessage'));
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage(t('contact.form.errorMessage'));
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Restore scroll position when returning to page
  useEffect(() => {
    // Check if we need to scroll to contact
    const shouldScrollToContact = sessionStorage.getItem('scrollToContact');
    if (shouldScrollToContact === 'true') {
      sessionStorage.removeItem('scrollToContact');
      
      // Check for property inquiry information
      const propertyInquiryData = sessionStorage.getItem('propertyInquiry');
      if (propertyInquiryData) {
        try {
          const inquiry = JSON.parse(propertyInquiryData);
          const { propertyName, type } = inquiry;
          
          // Set the default message based on inquiry type
          if (type === 'booking') {
            setDefaultMessage(contactSection.messageTemplates.booking(propertyName));
          } else if (type === 'information') {
            setDefaultMessage(contactSection.messageTemplates.information(propertyName));
          }
          
          sessionStorage.removeItem('propertyInquiry');
        } catch (e) {
          // Invalid JSON, just ignore and clear
          sessionStorage.removeItem('propertyInquiry');
        }
      }
      
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const savedPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem('homeScrollPosition');
    }

    // Save scroll position when leaving page
    const handleBeforeUnload = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Also save on navigation (for SPA routing)
    const links = document.querySelectorAll('a[href^="/"]');
    const handleLinkClick = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };
    
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, []);
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="J&M Prestige Property Corp"
                width={172}
                height={172}
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">{t('nav.services')}</a>
              <a href="#properties" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">{t('nav.properties')}</a>
              <a href="#about" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">{t('nav.about')}</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">{t('nav.testimonials')}</a>
              <a href="#contact" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">{t('nav.contact')}</a>
              <a href="#home" className="px-6 py-2 bg-[#D4AF37] text-black font-semibold text-sm rounded-sm hover:bg-[#F4E4B0] transition-all">
                {t('nav.getStarted')}
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#D4AF37]/20 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col gap-6 p-8">
          <a 
            href="#services" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.services')}
          </a>
          <a 
            href="#properties" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.properties')}
          </a>
          <a 
            href="#about" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.about')}
          </a>
          <a 
            href="#testimonials" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.testimonials')}
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.contact')}
          </a>
          <a 
            href="#home" 
            className="px-6 py-3 bg-[#D4AF37] text-black font-semibold text-center rounded-sm hover:bg-[#F4E4B0] transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.getStarted')}
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-end justify-center overflow-hidden pb-36 sm:pb-48 scroll-mt-20">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/jmbackground.jpg"
            alt="Luxury Property"
            fill
            className="object-cover object-top opacity-100"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 from-0% via-transparent via-20% to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-block border border-[#D4AF37]/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-3">
              <a 
                href={heroSection.ctaButtons[0].href} 
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all text-base sm:text-lg"
              >
                {t('hero.exploreServices')}
              </a>
              <a 
                href={heroSection.ctaButtons[1].href} 
                className="px-6 py-3 sm:px-8 sm:py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all text-base sm:text-lg border-2 border-[#D4AF37]"
              >
                {t('hero.contactUs')}
              </a>
            </div>
            <div className="flex justify-center">
              <Link
                href="/properties"
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#D4AF37]/50 text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all text-base sm:text-lg"
              >
                {t('hero.viewAllProperties')} →
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section id="services" className="py-12 px-6 bg-gradient-to-b from-black to-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('services.heading').split(' ')[0]} <span className="text-[#D4AF37]">{t('services.heading').split(' ')[1]}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('services.subheading')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                ctaText={service.ctaText}
                ctaLink={service.ctaLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className="py-12 px-6 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('properties.heading').split(' ')[0]} <span className="text-[#D4AF37]">{t('properties.heading').split(' ')[1]}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('properties.subheading')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {properties
              .filter(p => p.published !== false && p.featured === true)
              .slice(0, 2)
              .map((property) => (
              <PropertyCard
                key={property.id}
                slug={property.slug}
                name={property.name}
                location={property.location}
                category={property.category}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                price={property.price}
                priceUnit={property.priceUnit}
                description={property.description}
                features={property.features}
                images={getPropertyImages(property)}
                available={property.available}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/properties"
              className="inline-block px-8 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              {t('properties.viewAllProperties')} →
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 px-6 bg-black scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {aboutSection.heading.split('J&M Prestige')[0]}
                <span className="text-[#D4AF37]">J&M Prestige</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {aboutSection.description}
              </p>
              <div className="space-y-6">
                {aboutSection.features.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="J&M Prestige"
                  width={468}
                  height={468}
                  className="object-contain opacity-80"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 px-6 bg-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('testimonials.heading').split(' ')[0]} <span className="text-[#D4AF37]">{t('testimonials.heading').split(' ')[1]}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('testimonials.subheading')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                text={testimonial.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-6 bg-black border-t border-[#D4AF37]/20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('contact.heading').split(' ')[0]} <span className="text-[#D4AF37]">{t('contact.heading').split(' ')[1]}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('contact.subheading')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <ContactInfoItem icon="📧" title={t('contact.email')}>
                <p>{siteInfo.email}</p>
              </ContactInfoItem>
              
              <ContactInfoItem icon="📞" title={t('contact.phone')}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>PH: {siteInfo.phones.philippines}</span>
                    <a
                      href={`https://wa.me/${siteInfo.phones.philippines.replace(/[\s\+\-\(\)]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-sm text-green-400 hover:bg-green-500 hover:text-white transition-all text-xs"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>PL: {siteInfo.phones.poland}</span>
                    <a
                      href={`https://wa.me/${siteInfo.phones.poland.replace(/[\s\+\-\(\)]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-sm text-green-400 hover:bg-green-500 hover:text-white transition-all text-xs"
                      title="Chat on WhatsApp"
                    >
                      <FaWhatsapp size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </ContactInfoItem>
              
              <ContactInfoItem icon="📍" title={t('contact.office')}>
                <p>{siteInfo.address.street}<br />{siteInfo.address.city}</p>
              </ContactInfoItem>
              
              <ContactInfoItem icon="🌐" title={t('contact.followUs')}>
                <div className="flex gap-3">
                  <a 
                    href={siteInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                    aria-label="Facebook"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a 
                    href={siteInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a 
                    href={siteInfo.socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={20} />
                  </a>
                </div>
              </ContactInfoItem>
            </div>

            {/* Contact Form */}
            <div className="bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    {t('contact.form.name')}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    disabled={formStatus === 'submitting'}
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    {t('contact.form.email')}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    disabled={formStatus === 'submitting'}
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">
                    {t('contact.form.phone')}
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    disabled={formStatus === 'submitting'}
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    {t('contact.form.message')}
                  </label>
                  <textarea 
                    key={defaultMessage}
                    id="message" 
                    name="message" 
                    rows={4}
                    required
                    disabled={formStatus === 'submitting'}
                    defaultValue={defaultMessage}
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t('contact.form.messagePlaceholder')}
                  ></textarea>
                </div>
                
                {/* Status Messages */}
                {formMessage && (
                  <div className={`p-4 rounded-sm ${
                    formStatus === 'success' 
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}>
                    {formMessage}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#D4AF37]/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="J&M Prestige Property Corp"
                width={115}
                height={115}
                className="object-contain"
                priority
              />
              <div>
                <h3 className="font-bold text-[#D4AF37] leading-tight text-xl">J&M PRESTIGE</h3>
                <p className="text-base text-gray-500 tracking-wider">PROPERTY CORP</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {siteInfo.foundedYear} {siteInfo.companyName} {siteInfo.companySubtitle}. {t('footer.allRightsReserved')}.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-gray-400 text-sm font-semibold">{t('footer.followUs')}</p>
              <div className="flex gap-4">
                <a 
                  href={siteInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
                <a 
                  href={siteInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href={siteInfo.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                  aria-label="TikTok"
                >
                  <FaTiktok size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Language Switcher */}
          <div className="border-t border-[#D4AF37]/20 pt-6 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </div>
  );
}
