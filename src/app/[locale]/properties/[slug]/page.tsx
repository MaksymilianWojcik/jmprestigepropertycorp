'use client';

import { use } from "react";
import { useTranslations } from 'next-intl';
import { properties, siteInfo, getPropertyImages } from "../../../content";
import { notFound } from "next/navigation";
import { ImageCarousel, NavigationBar, SimpleFooter } from "../../../components";

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations();
  const resolvedParams = use(params);
  const property = properties.find((p) => p.slug === resolvedParams.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Navigation */}
      <NavigationBar />

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
                <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">{t('propertyDetail.aboutProperty')}</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {property.longDescription}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">{t('propertyDetail.amenities')}</h2>
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
                          sessionStorage.setItem('propertyInquiry', JSON.stringify({
                            propertyName: property.name,
                            type: 'booking'
                          }));
                          window.location.href = '/';
                        }}
                        className="block w-full text-center px-6 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all cursor-pointer"
                      >
                        {t('propertyDetail.contactToBook')}
                      </button>
                      
                      {property.airbnbLink && property.airbnbLink !== "#" && property.airbnbLink !== "" && (
                        <a
                          href={property.airbnbLink.startsWith('http') ? property.airbnbLink : `https://${property.airbnbLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all"
                        >
                          {t('propertyDetail.viewOnAirbnb')}
                        </a>
                      )}
                      
                      {property.bookingLink && property.bookingLink !== "#" && property.bookingLink !== "" && (
                        <a
                          href={property.bookingLink.startsWith('http') ? property.bookingLink : `https://${property.bookingLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all"
                        >
                          {t('propertyDetail.viewOnBooking')}
                        </a>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        sessionStorage.setItem('scrollToContact', 'true');
                        sessionStorage.setItem('propertyInquiry', JSON.stringify({
                          propertyName: property.name,
                          type: 'information'
                        }));
                        window.location.href = '/';
                      }}
                      className="block w-full text-center px-6 py-4 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all cursor-pointer"
                    >
                      {t('propertyDetail.requestInformation')}
                    </button>
                  )}
                </div>

                <div className="border-t border-[#D4AF37]/20 pt-6">
                  <h3 className="font-semibold mb-3 text-[#D4AF37]">{t('propertyDetail.propertyFeatures')}</h3>
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
