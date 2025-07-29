'use client';

import { useState } from 'react';
import { tools } from '@/lib/tools';
import { HeroSection } from '@/components/homepage/HeroSection';
import { FeaturedTools } from '@/components/homepage/FeaturedTools';
import { NewsletterSignup } from '@/components/homepage/NewsletterSignup';
import { ToolSearch } from '@/components/homepage/ToolSearch';
import { ToolGrid } from '@/components/homepage/ToolGrid';

const categories = [
  { name: 'All Tools', count: tools.length },
  {
    name: 'Financial',
    count: tools.filter(t => t.category === 'Financial').length,
  },
  { name: 'Health', count: tools.filter(t => t.category === 'Health').length },
  {
    name: 'Date & Time',
    count: tools.filter(t => t.category === 'Date & Time').length,
  },
  { name: 'Math', count: tools.filter(t => t.category === 'Math').length },
  {
    name: 'Conversion',
    count: tools.filter(t => t.category === 'Conversion').length,
  },
  {
    name: 'Planning',
    count: tools.filter(t => t.category === 'Planning').length,
  },
  {
    name: 'Utility',
    count: tools.filter(t => t.category === 'Utility').length,
  },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory =
      selectedCategory === 'All Tools' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTools = tools.filter(tool => tool.popular).slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeroSection />
      <FeaturedTools tools={featuredTools} />
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <ToolSearch
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <ToolGrid tools={filteredTools} />
        </div>
      </main>
      <NewsletterSignup />
    </div>
  );
}
