'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { siteInfo, heroSection, services, aboutSection, testimonials, contactSection, properties, getPropertyImages } from "./content";
import { ServiceCard, TestimonialCard, FeatureItem, ContactInfoItem, PropertyCard } from "./components";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <a href="#services" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">Services</a>
              <a href="#properties" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">Properties</a>
              <a href="#about" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">About</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">Testimonials</a>
              <a href="#contact" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">Contact</a>
              <a href="#home" className="px-6 py-2 bg-[#D4AF37] text-black font-semibold text-sm rounded-sm hover:bg-[#F4E4B0] transition-all">
                Get Started
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
            Services
          </a>
          <a 
            href="#properties" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Properties
          </a>
          <a 
            href="#about" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#testimonials" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            href="#contact" 
            className="text-lg font-medium hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
          <a 
            href="#home" 
            className="px-6 py-3 bg-[#D4AF37] text-black font-semibold text-center rounded-sm hover:bg-[#F4E4B0] transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href={heroSection.ctaButtons[0].href} 
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all text-base sm:text-lg"
              >
                {heroSection.ctaButtons[0].text}
              </a>
              <a 
                href={heroSection.ctaButtons[1].href} 
                className="px-6 py-3 sm:px-8 sm:py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all text-base sm:text-lg border-2 border-[#D4AF37]"
              >
                {heroSection.ctaButtons[1].text}
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section id="services" className="py-12 px-6 bg-gradient-to-b from-black to-zinc-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#D4AF37]">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your success
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
              Featured <span className="text-[#D4AF37]">Properties</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties for rent and sale
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
              View All Properties →
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
              Client <span className="text-[#D4AF37]">Testimonials</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience with J&M Prestige
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
              {contactSection.heading.split(' ')[0]} <span className="text-[#D4AF37]">{contactSection.heading.split(' ')[1]}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {contactSection.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <ContactInfoItem icon="📧" title="Email">
                <p>{siteInfo.email}</p>
              </ContactInfoItem>
              
              <ContactInfoItem icon="📞" title="Phone">
                <p>PH: {siteInfo.phones.philippines}</p>
                <p>PL: {siteInfo.phones.poland}</p>
              </ContactInfoItem>
              
              <ContactInfoItem icon="📍" title="Office">
                <p>{siteInfo.address.street}<br />{siteInfo.address.city}</p>
              </ContactInfoItem>
            </div>

            {/* Contact Form */}
            <div className="bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8">
              <form action={`mailto:${siteInfo.email}`} method="post" encType="text/plain" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    {contactSection.formLabels.name}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder={contactSection.placeholders.name}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    {contactSection.formLabels.email}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder={contactSection.placeholders.email}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    {contactSection.formLabels.message}
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-black border border-[#D4AF37]/20 rounded-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    placeholder={contactSection.placeholders.message}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all text-lg"
                >
                  {contactSection.formLabels.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#D4AF37]/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
                © {siteInfo.foundedYear} {siteInfo.companyName} {siteInfo.companySubtitle}. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
