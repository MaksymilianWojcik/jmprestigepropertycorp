'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="J&M Prestige Property Corp"
                width={172}
                height={172}
                className="object-contain"
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-[#D4AF37] transition-colors">Services</a>
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
        <div className="absolute inset-0 z-0">
          <Image
            src="/jmbackground.jpg"
            alt="Luxury Property"
            fill
            className="object-cover object-top opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 from-0% via-transparent via-20% to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="#services" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all text-base sm:text-lg">
              Explore Services
            </a>
            <a href="#contact" className="px-6 py-3 sm:px-8 sm:py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all text-base sm:text-lg">
              Contact Us
            </a>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-black to-zinc-900">
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
            {/* Buy & Sell */}
            <div className="group relative bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#F4E4B0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="text-[#D4AF37] text-5xl mb-6">🏡</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Buy & Sell</h3>
              <p className="text-gray-400 leading-relaxed">
                Expert guidance through every step of your property transaction. We connect buyers and sellers with precision and professionalism.
              </p>
              <div className="mt-6 text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Learn More →
              </div>
            </div>

            {/* Investments */}
            <div className="group relative bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#F4E4B0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="text-[#D4AF37] text-5xl mb-6">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Investments</h3>
              <p className="text-gray-400 leading-relaxed">
                Strategic investment opportunities designed to maximize returns. Build your real estate portfolio with confidence.
              </p>
              <div className="mt-6 text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Learn More →
              </div>
            </div>

            {/* Development */}
            <div className="group relative bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#F4E4B0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="text-[#D4AF37] text-5xl mb-6">🏗️</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Development</h3>
              <p className="text-gray-400 leading-relaxed">
                From concept to completion, we bring visionary projects to life. Creating exceptional spaces that redefine luxury living.
              </p>
              <div className="mt-6 text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Learn More →
              </div>
            </div>

            {/* Property Management */}
            <div className="group relative bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#F4E4B0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="text-[#D4AF37] text-5xl mb-6">🔑</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Property Management</h3>
              <p className="text-gray-400 leading-relaxed">
                Comprehensive management services that protect and enhance your investment. Peace of mind for property owners.
              </p>
              <div className="mt-6 text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Learn More →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-[#D4AF37]">J&M Prestige</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                With years of excellence in the luxury real estate market, J&M Prestige Property Corp stands as a beacon of trust, expertise, and unparalleled service.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Expert Knowledge</h3>
                    <p className="text-gray-400">Deep understanding of luxury property markets and investment strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Personalized Service</h3>
                    <p className="text-gray-400">Tailored solutions that align with your unique goals and vision</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Proven Track Record</h3>
                    <p className="text-gray-400">Consistent results and satisfied clients across all service areas</p>
                  </div>
                </div>
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
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-zinc-900">
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
            {/* Testimonial 1 */}
            <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300">
              <div className="text-[#D4AF37] text-4xl mb-4">"</div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Working with J&M Prestige was exceptional. Their expertise in luxury real estate and attention to detail made our property acquisition seamless and stress-free.
              </p>
              <div className="border-t border-[#D4AF37]/20 pt-4">
                <p className="font-semibold text-white">Isandro M.</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300">
              <div className="text-[#D4AF37] text-4xl mb-4">"</div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                The team's professionalism and market knowledge are unmatched. They helped us find the perfect investment property and managed the entire development process flawlessly.
              </p>
              <div className="border-t border-[#D4AF37]/20 pt-4">
                <p className="font-semibold text-white">Karolina M.</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300">
              <div className="text-[#D4AF37] text-4xl mb-4">"</div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Outstanding service from start to finish. J&M Prestige's property management services have exceeded our expectations, maximizing returns while minimizing hassle.
              </p>
              <div className="border-t border-[#D4AF37]/20 pt-4">
                <p className="font-semibold text-white">Tomasz L.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-black border-t border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-[#D4AF37]">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Ready to elevate your real estate journey? Get in touch with our team of experts.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-zinc-900 rounded-lg border border-[#D4AF37]/20">
              <div className="text-[#D4AF37] text-3xl mb-4">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-400 text-sm">jmprestigepropertycorp@gmail.com</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg border border-[#D4AF37]/20">
              <div className="text-[#D4AF37] text-3xl mb-4">📞</div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">PH: +63 967 097 2465</p>
              <p className="text-gray-400 text-sm">PL: +48 662 993 676</p>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg border border-[#D4AF37]/20">
              <div className="text-[#D4AF37] text-3xl mb-4">📍</div>
              <h3 className="font-semibold mb-2">Office</h3>
              <p className="text-gray-400 text-sm">Swarozyca 15A<br />71-601 Szczecin, Poland</p>
            </div>
          </div>
          <a 
            href="mailto:jmprestigepropertycorp@gmail.com?subject=Inquiry from J%26M Prestige Website" 
            className="inline-block px-12 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all text-lg"
          >
            Send a Message
          </a>
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
              />
              <div>
                <h3 className="font-bold text-[#D4AF37] leading-tight text-xl">J&M PRESTIGE</h3>
                <p className="text-base text-gray-500 tracking-wider">PROPERTY CORP</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © 2023 J&M Prestige Property Corp. All rights reserved.
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
