'use client';

import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { OfflineIndicator } from '@/components/offline-indicator';
import { MobilePWAMenu } from '@/components/mobile-pwa-menu';
import Link from 'next/link';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
const LiveClock = dynamic(() => import('./LiveClock'), {
  ssr: false,
});
interface HeaderProps {
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isHome?: boolean;
}

export default function Header({
  title = 'Smart Tools',
  icon: IconComponent = Sparkles,
  isHome = false,
}: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm "
    >
      <div className="absolute bottom-0 h-px w-full bg-linear-to-r from-transparent via-primary/50 to-transparent hover:via-primary hover:shadow-[0_0_8px_2px_var(--color-primary)] transition-all duration-300 animate-pulse" />
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isHome ? (
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-md">
                <IconComponent className="h-4 w-4 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-primary-foreground transition-transform duration-200 group-hover:rotate-12" />
              </div>
              <div className="flex flex-col leading-tight">
                <motion.span
                  className="text-lg sm:text-base lg:text-lg xl:text-xl font-bold tracking-tight truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  Smart Tools
                </motion.span>
                <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                  Professional Calculator Suite
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-md">
                  <IconComponent className="h-4 w-4 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-primary-foreground transition-transform duration-200 group-hover:rotate-12" />
                </div>
                <div className="flex flex-col leading-tight">
                  <motion.span
                    className="text-lg sm:text-base lg:text-lg xl:text-xl font-bold tracking-tight truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {title}
                  </motion.span>
                  <span className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">
                    Professional Calculator Suite
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <div className="hidden sm:block">
            <OfflineIndicator />
          </div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <LiveClock />
          </motion.div>
          <motion.div
            className="hidden sm:flex"
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
