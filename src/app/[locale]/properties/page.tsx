'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { properties, getPropertyImages } from "../../content";
import { PropertyCard, NavigationBar, SimpleFooter } from "../../components";

function PropertiesContent() {
  const t = useTranslations();
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
    { id: "all", label: t('properties.all') },
    { id: "short-term-rental", label: t('properties.shortTermRental') },
    { id: "for-sale", label: t('properties.forSaleCategory') },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Navigation */}
      <NavigationBar />

      {/* Properties Listing */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('properties.allProperties').split(' ')[0]} <span className="text-[#D4AF37]">{t('properties.allProperties').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('properties.subheading')}
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
                key={`${property.id}-${selectedCategory}`}
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
              <p className="text-gray-400 text-lg">{t('properties.noProperties')}</p>
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
