// Reusable Components

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { siteInfo, FALLBACK_IMAGE } from "./content";

// Image Carousel Component
interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
  showIndicators?: boolean;
  indicatorsOutside?: boolean;  // New prop: place indicators below image
  className?: string;
  imageClassName?: string;
  buttonSize?: 'sm' | 'lg';
}

export function ImageCarousel({ 
  images, 
  altPrefix, 
  showIndicators = true,
  indicatorsOutside = false,
  className = "relative h-64 w-full group",
  imageClassName = "object-cover",
  buttonSize = 'sm'
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>(images);
  const [isLoading, setIsLoading] = useState(false);

  // If images prop changes, reset validImages
  useEffect(() => {
    setValidImages(images.length > 0 ? images : [FALLBACK_IMAGE]);
    setCurrentImageIndex(0);
    setIsLoading(false);
  }, [images]);

  // Reset current index if it's out of bounds
  useEffect(() => {
    if (currentImageIndex >= validImages.length && validImages.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [validImages, currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const buttonSizeClass = buttonSize === 'lg' ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl';

  const handleImageError = () => {
    // If current image fails to load, remove it and use fallback if no valid images remain
    const currentImage = validImages[currentImageIndex];
    const newValidImages = validImages.filter(img => img !== currentImage);
    
    if (newValidImages.length === 0) {
      // No valid images left, use fallback logo
      setValidImages([FALLBACK_IMAGE]);
      setCurrentImageIndex(0);
    } else {
      // Update valid images list and adjust index if needed
      setValidImages(newValidImages);
      if (currentImageIndex >= newValidImages.length) {
        setCurrentImageIndex(newValidImages.length - 1);
      }
    }
  };

  return (
    <>
      <div className={className}>
        <Image
          src={validImages[currentImageIndex]}
          alt={`${altPrefix} - Image ${currentImageIndex + 1}`}
          fill
          className={imageClassName}
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
          onError={handleImageError}
        />
        
        {validImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              className={`absolute ${buttonSize === 'lg' ? 'left-4' : 'left-2'} top-1/2 -translate-y-1/2 bg-black/90 text-[#D4AF37] ${buttonSizeClass} rounded-full hover:bg-black transition-all ${buttonSize === 'sm' ? 'opacity-0 group-hover:opacity-100' : ''} flex items-center justify-center font-bold border border-[#D4AF37]/30 cursor-pointer`}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              className={`absolute ${buttonSize === 'lg' ? 'right-4' : 'right-2'} top-1/2 -translate-y-1/2 bg-black/90 text-[#D4AF37] ${buttonSizeClass} rounded-full hover:bg-black transition-all ${buttonSize === 'sm' ? 'opacity-0 group-hover:opacity-100' : ''} flex items-center justify-center font-bold border border-[#D4AF37]/30 cursor-pointer`}
              aria-label="Next image"
            >
              →
            </button>
            
            {showIndicators && !indicatorsOutside && (
              <div className={`absolute ${buttonSize === 'lg' ? 'bottom-6' : 'bottom-4'} left-1/2 -translate-x-1/2 flex ${buttonSize === 'lg' ? 'gap-3' : 'gap-2'}`}>
                {validImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                    }}
                    className={`${buttonSize === 'lg' ? 'w-3 h-3' : 'w-2 h-2'} rounded-full transition-all cursor-pointer ${
                      index === currentImageIndex
                        ? `bg-[#D4AF37] ${buttonSize === 'lg' ? 'w-12' : 'w-8'}`
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* External indicators (below image) */}
      {showIndicators && indicatorsOutside && validImages.length > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentImageIndex(index);
              }}
              className={`${buttonSize === 'lg' ? 'w-3 h-3' : 'w-2 h-2'} rounded-full transition-all cursor-pointer ${
                index === currentImageIndex
                  ? `bg-[#D4AF37] ${buttonSize === 'lg' ? 'w-12' : 'w-8'}`
                  : "bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export function ServiceCard({ icon, title, description, ctaText, ctaLink }: ServiceCardProps) {
  const isExternal = ctaLink.startsWith('#');
  
  return (
    <div className="group relative bg-zinc-900 border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20 flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8941E] via-[#D4AF37] to-[#F4E4B0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      <div className="text-[#D4AF37] text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed flex-grow">{description}</p>
      {isExternal ? (
        <a href={ctaLink} className="mt-6 text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform inline-block">
          {ctaText} →
        </a>
      ) : (
        <Link href={ctaLink} className="mt-6 text-[#D4AF37] font-semibold group-hover:translate-x-2 transition-transform inline-block">
          {ctaText} →
        </Link>
      )}
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  text: string;
}

export function TestimonialCard({ name, text }: TestimonialCardProps) {
  return (
    <div className="bg-black border border-[#D4AF37]/20 rounded-lg p-8 hover:border-[#D4AF37] transition-all duration-300 flex flex-col">
      <div className="text-[#D4AF37] text-4xl mb-4">"</div>
      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{text}</p>
      <div className="border-t border-[#D4AF37]/20 pt-4">
        <p className="font-semibold text-white">{name}</p>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
}

export function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
        <span className="text-[#D4AF37] text-xl">✓</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

interface ContactInfoItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export function ContactInfoItem({ icon, title, children }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-[#D4AF37] text-3xl">{icon}</div>
      <div>
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        <div className="text-gray-400">{children}</div>
      </div>
    </div>
  );
}

interface PropertyCardProps {
  slug: string;
  name: string;
  location: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  price: string;
  priceUnit: string;
  description: string;
  features: string[];
  images: string[];
  available: boolean;
}

export function PropertyCard({
  slug,
  name,
  location,
  category,
  bedrooms,
  bathrooms,
  area,
  price,
  priceUnit,
  description,
  features,
  images,
  available,
}: PropertyCardProps) {
  return (
    <div className="bg-zinc-900 border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/20 flex flex-col">
      <div className="relative">
        <ImageCarousel 
          images={images}
          altPrefix={name}
          showIndicators={true}
          className="relative h-64 w-full group"
          imageClassName="object-cover"
          buttonSize="sm"
        />
        {/* Status Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          {category === 'short-term-rental' ? (
            available ? (
              <span className="inline-block px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-sm shadow-lg">
                Available
              </span>
            ) : (
              <span className="inline-block px-3 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-sm shadow-lg">
                Booked
              </span>
            )
          ) : (
            <span className="inline-block px-3 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-sm shadow-lg">
              For Sale
            </span>
          )}
        </div>
        {/* Price Badge - Top Right */}
        <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-4 py-2 rounded-sm font-bold shadow-lg">
          {price} {priceUnit && <span className="text-sm font-normal">{priceUnit}</span>}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
          <span>📍</span> {location}
        </p>
        <div className="flex gap-4 mb-4 text-sm text-gray-400">
          <span>🛏️ {bedrooms} Bed</span>
          <span>🚿 {bathrooms} Bath</span>
          <span>📐 {area}</span>
        </div>
        <p className="text-gray-400 mb-4 leading-relaxed flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs rounded-full border border-[#D4AF37]/20"
            >
              {feature}
            </span>
          ))}
        </div>
        <Link
          href={`/properties/${slug}`}
          className="w-full text-center px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-sm hover:bg-[#F4E4B0] transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

// Simple Footer Component (used on property pages)
export function SimpleFooter() {
  return (
    <footer className="bg-black border-t border-[#D4AF37]/20 py-12 px-6 mt-24">
      <div className="max-w-7xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <Image
            src="/logo.png"
            alt="J&M Prestige Property Corp"
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>
        <p className="text-gray-500 text-sm">
          © {siteInfo.foundedYear} {siteInfo.companyName} {siteInfo.companySubtitle}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
