'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, useInView } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      ref={ref}
      id='tools'
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='py-8 sm:py-12'
    >
      <div className='container mx-auto px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='mx-auto mb-8 max-w-2xl'
        >
          <h2 className='mb-4 text-3xl font-bold sm:text-4xl md:text-5xl'>
            Discover Your{' '}
            <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
              Perfect Tool
            </span>
          </h2>
          <p className='text-muted-foreground text-lg sm:text-xl'>
            Search through our comprehensive collection of professional tools and calculators
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='relative mx-auto mb-8 max-w-lg'
        >
          <div className='relative'>
            <Search
              className={`absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transition-colors ${
                isFocused ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
            <Input
              type='search'
              placeholder='Search tools, calculators, converters...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`bg-background/50 hover:bg-background/80 border-2 pr-10 pl-10 text-base backdrop-blur-sm transition-all duration-300 ${
                isFocused
                  ? 'border-primary shadow-primary/20 shadow-lg'
                  : 'border-border hover:border-primary/50'
              }`}
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchTerm('')}
                className='text-muted-foreground hover:bg-muted hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1'
              >
                <X className='h-4 w-4' />
              </motion.button>
            )}
          </div>

          {/* Search suggestions */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='bg-card absolute top-full right-0 left-0 z-10 mt-2 rounded-lg border p-2 shadow-lg'
            >
              <div className='text-muted-foreground text-xs'>
                {categories.find((cat) =>
                  cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
                ) ? (
                  <span>Try filtering by category below</span>
                ) : (
                  <span>Search across all tools</span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className='flex flex-wrap justify-center gap-2 sm:gap-3'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedCategory('all')}
              className={`transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'from-primary to-primary/80 shadow-primary/25 bg-gradient-to-r shadow-lg'
                  : 'hover:bg-primary/10 hover:border-primary/50'
              }`}
            >
              <motion.span
                className='mr-2'
                animate={{ rotate: selectedCategory === 'all' ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                ✨
              </motion.span>
              All Tools
              <Badge variant='secondary' className='ml-2 text-xs'>
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </Badge>
            </Button>
          </motion.div>

          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                size='sm'
                onClick={() => setSelectedCategory(category.name)}
                className={`transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'from-primary to-primary/80 shadow-primary/25 bg-gradient-to-r shadow-lg'
                    : 'hover:bg-primary/10 hover:border-primary/50'
                }`}
              >
                {category.name}
                <Badge
                  variant={selectedCategory === category.name ? 'default' : 'secondary'}
                  className='ml-2 text-xs'
                >
                  {category.count}
                </Badge>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Results count */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-muted-foreground mt-6 text-sm'
          >
            {categories.some((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
              ? 'Filtering by search and category...'
              : 'Searching across all tools...'}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
