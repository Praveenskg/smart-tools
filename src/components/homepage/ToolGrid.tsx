'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      <AnimatePresence>
        {tools
          .sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1))
          .map(tool => {
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
                  <Card className="h-full hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer group hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                        <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                          {tool.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs sm:text-sm mb-3 group-hover:text-foreground/80 transition-colors duration-300">
                        {tool.description}
                      </CardDescription>
                      <div className="flex gap-1 sm:gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className="text-xs group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300"
                        >
                          {tool.category}
                        </Badge>
                        {tool.popular && (
                          <Badge
                            variant="secondary"
                            className="text-xs group-hover:bg-secondary/80 transition-all duration-300"
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
