'use client';

import { MobilePWAMenu } from '@/components/mobile-pwa-menu';
import { OfflineIndicator } from '@/components/offline-indicator';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const LiveClock = dynamic(() => import('./LiveClock'), {
  ssr: false,
});

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='border-border/50 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm'
    >
      <div className='via-primary/50 hover:via-primary absolute bottom-0 h-px w-full animate-pulse bg-linear-to-r from-transparent to-transparent transition-all duration-300 hover:shadow-[0_0_8px_2px_var(--color-primary)]' />
      <div className='container mx-auto flex h-14 items-center justify-between px-3 sm:h-16 sm:px-4 lg:px-6'>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <Link href='/' className='group flex items-center space-x-2 sm:space-x-3'>
            <div className='from-primary to-primary/80 flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br shadow-md sm:h-8 sm:w-8 lg:h-9 lg:w-9'>
              <Sparkles className='text-primary-foreground h-4 w-4 transition-transform duration-200 group-hover:rotate-12 sm:h-4 sm:w-4 lg:h-5 lg:w-5' />
            </div>
            <div className='flex flex-col leading-tight'>
              <motion.span
                className='max-w-[120px] truncate bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-lg font-bold tracking-tight text-transparent transition duration-300 group-hover:brightness-110 group-hover:saturate-150 sm:max-w-[200px] sm:text-base lg:max-w-none lg:text-lg xl:text-xl'
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                ToolifyLab
              </motion.span>
              <span className='text-muted-foreground text-[10px] sm:text-xs lg:text-sm'>
                Professional Calculator Suite
              </span>
            </div>
          </Link>
        </div>
        <div className='flex items-center gap-1 sm:gap-2 lg:gap-3'>
          <div className='hidden sm:block'>
            <OfflineIndicator />
          </div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <LiveClock />
          </motion.div>
          <motion.div
            className='hidden sm:flex'
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <ThemeToggle />
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <MobilePWAMenu />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
