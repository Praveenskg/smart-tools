'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='from-muted/50 via-background to-background relative w-full overflow-hidden bg-linear-to-br py-12 sm:py-20 lg:py-24'>
      <div className='relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className='bg-primary/10 text-primary mb-4 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-sm font-medium'
        >
          🔬 18+ Tools. One Professional Lab.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-foreground mx-auto max-w-4xl text-3xl leading-snug font-bold tracking-tight sm:text-4xl lg:text-5xl'
        >
          Your Professional <span className='text-primary'>Tool Laboratory</span> for Everything
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='text-muted-foreground mx-auto mt-4 max-w-xl text-base sm:text-lg'
        >
          From finance to health, productivity to planning—ToolifyLab gives you everything you need
          in one fast, privacy-first laboratory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='mt-6 flex flex-col justify-center gap-3 sm:flex-row'
        >
          <Link href='#tools'>
            <button className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition'>
              Explore Lab
            </button>
          </Link>
        </motion.div>
      </div>
      <div
        className='bg-primary/20 pointer-events-none absolute -top-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 transform rounded-full opacity-30 blur-[120px]'
        aria-hidden='true'
      />
    </section>
  );
}
