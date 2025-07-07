'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  popular: boolean;
}

export function FeaturedTools({ tools }: { tools: Tool[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Featured Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <Link key={tool.id} href={`/${tool.id}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer group hover:scale-105">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs sm:text-sm group-hover:text-foreground transition-colors duration-300">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
