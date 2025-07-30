'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  popular: boolean;
}

export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <motion.div
      layout
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'
    >
      <AnimatePresence>
        {tools
          .sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1))
          .map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Link href={`/${tool.id}`}>
                  <Card className='hover:border-primary group h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <CardHeader className='pb-3'>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <Icon className='text-primary h-5 w-5 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-6 sm:w-6' />
                        <CardTitle className='group-hover:text-primary text-base transition-colors duration-300 sm:text-lg'>
                          {tool.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='group-hover:text-foreground/80 mb-3 text-xs transition-colors duration-300 sm:text-sm'>
                        {tool.description}
                      </CardDescription>
                      <div className='flex flex-wrap gap-1 sm:gap-2'>
                        <Badge
                          variant='outline'
                          className='group-hover:bg-primary/10 group-hover:border-primary text-xs transition-all duration-300'
                        >
                          {tool.category}
                        </Badge>
                        {tool.popular && (
                          <Badge
                            variant='secondary'
                            className='group-hover:bg-secondary/80 text-xs transition-all duration-300'
                          >
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </motion.div>
  );
}
