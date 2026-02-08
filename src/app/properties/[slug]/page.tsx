'use client';

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { properties, siteInfo, getPropertyImages } from "../../content";
import { notFound } from "next/navigation";
import { ImageCarousel, SimpleFooter } from "../../components";

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const property = properties.find((p) => p.slug === resolvedParams.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 text-[#D4AF37] hover:text-[#F4E4B0] transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <span className="text-xl">←</span>
                <span className="hidden sm:inline text-sm font-medium">Back</span>
              </button>
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="J&M Prestige Property Corp"
                  width={115}
                  height={115}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Property Detail */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Image Gallery */}
          <div className="mb-8">
            <ImageCarousel 
              images={getPropertyImages(property)}
              altPrefix={property.name}
              showIndicators={true}
              indicatorsOutside={true}
              className="relative h-96 md:h-[500px] w-full rounded-lg overflow-hidden group bg-black"
              imageClassName="object-contain"
              buttonSize="lg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.name}</h1>
              <p className="text-gray-400 text-lg mb-6 flex items-center gap-2">
                <span>📍</span> {property.location}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8 text-lg">
                <span className="text-gray-300">🛏️ {property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                <span className="text-gray-300">🚿 {property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                {property.category === 'short-term-rental' && (
                  <span className="text-gray-300">👥 {property.maxGuests} Guest{property.maxGuests > 1 ? 's' : ''}</span>
                )}
                <span className="text-gray-300">📐 {property.area}</span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">About This Property</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {property.longDescription}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Amenities</h2>
                <div className="space-y-6">
                  {property.amenities.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-lg font-semibold mb-3 text-white">{category.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2 text-gray-300">
                            <span className="text-[#D4AF37] mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking/Contact Card */}
            <div className="md:col-span-1">
              <div className="bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-6 sticky top-28">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                    {property.price}
                    {property.priceUnit && (
                      <span className="text-lg font-normal text-gray-400"> {property.priceUnit}</span>
                    )}
                  </div>
                  {property.category === 'short-term-rental' ? (
                    property.available ? (
                      <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
                        Booked
                      </span>
                    )
                  ) : (
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                      For Sale
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  {property.category === 'short-term-rental' ? (
                    <>
                      <button
                        onClick={() => {
                          sessionStorage.setItem('scrollToContact', 'true');
                          window.location.href = '/';
                        }}
                        className="block w-full text-center px-6 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all cursor-pointer"
                      >
                        Contact to Book
                      </button>
                      
                      {property.airbnbLink && property.airbnbLink !== "#" && property.airbnbLink !== "" && (
                        <a
                          href={property.airbnbLink.startsWith('http') ? property.airbnbLink : `https://${property.airbnbLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all"
                        >
                          View on Airbnb
                        </a>
                      )}
                      
                      {property.bookingLink && property.bookingLink !== "#" && property.bookingLink !== "" && (
                        <a
                          href={property.bookingLink.startsWith('http') ? property.bookingLink : `https://${property.bookingLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all"
                        >
                          View on Booking.com
                        </a>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        sessionStorage.setItem('scrollToContact', 'true');
                        window.location.href = '/';
                      }}
                      className="block w-full text-center px-6 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all cursor-pointer"
                    >
                      Request Information
                    </button>
                  )}
                </div>

                <div className="border-t border-[#D4AF37]/20 pt-6">
                  <h3 className="font-semibold mb-3 text-[#D4AF37]">Property Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs rounded-full border border-[#D4AF37]/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SimpleFooter />
    </div>
  );
}
