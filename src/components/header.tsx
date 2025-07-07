'use client';

import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LiveClock } from '@/components/clock';
import { PWAInstallButton } from '@/components/pwa-install-button';
import { OfflineIndicator } from '@/components/offline-indicator';
import { MobilePWAMenu } from '@/components/mobile-pwa-menu';
import Link from 'next/link';
import { motion } from 'motion/react';

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
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md shadow-sm"
    >
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
                <span className="text-base sm:text-lg lg:text-xl font-semibold tracking-tight">
                  Smart Tools
                </span>
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
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 shadow-md"
                >
                  <IconComponent className="h-4 w-4 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-primary-foreground" />
                </motion.div>

                <div className="flex flex-col leading-tight">
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold tracking-tight truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none">
                    {title}
                  </span>
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
          <div className="hidden sm:block">
            <PWAInstallButton />
          </div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <LiveClock />
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
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
