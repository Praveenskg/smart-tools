'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
      id='tools'
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className='mx-auto mb-6 max-w-md sm:mb-8'>
        <input
          type='search'
          placeholder='Search tools...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border px-4 py-2 shadow-sm transition duration-200 ease-in-out focus:scale-[1.01] focus:ring-2 focus:outline-none'
        />
      </div>

      <div className='mb-6 flex flex-wrap justify-center gap-1 sm:mb-8 sm:gap-2'>
        {categories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          >
            <Button
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedCategory(category.name)}
              className='text-xs sm:text-sm'
            >
              {category.name}
              <Badge variant='secondary' className='ml-1 text-xs sm:ml-2'>
                {category.count}
              </Badge>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
