'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { properties, getPropertyImages } from "../content";
import { PropertyCard, SimpleFooter } from "../components";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL without adding to browser history
    if (category === "all") {
      router.replace("/properties");
    } else {
      router.replace(`/properties?category=${category}`);
    }
  };

  const filteredProperties = (selectedCategory === "all" 
    ? properties 
    : properties.filter(p => p.category === selectedCategory)
  ).filter(p => p.published !== false); // Only show published properties

  const categories = [
    { id: "all", label: "All Properties" },
    { id: "short-term-rental", label: "Short-Term Rentals" },
    { id: "for-sale", label: "For Sale" },
  ];

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

      {/* Properties Listing */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our <span className="text-[#D4AF37]">Properties</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse our exclusive collection of luxury properties
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-[#D4AF37] text-black"
                    : "border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
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

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No properties available in this category. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <SimpleFooter />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-gray-400">Loading properties...</div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
