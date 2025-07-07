'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ToolSearchProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: { name: string; count: number }[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function ToolSearch({
  selectedCategory,
  setSelectedCategory,
  categories,
  searchTerm,
  setSearchTerm,
}: ToolSearchProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  return (
    <motion.div
      ref={ref}
      id="tools"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-md mx-auto mb-6 sm:mb-8">
        <input
          type="search"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.01] transition duration-200 ease-in-out bg-background text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 sm:mb-8 justify-center">
        {categories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          >
            <Button
              variant={
                selectedCategory === category.name ? 'default' : 'outline'
              }
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="text-xs sm:text-sm"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
