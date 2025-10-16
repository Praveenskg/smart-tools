'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='from-background via-primary/5 to-background relative w-full overflow-hidden bg-linear-to-br py-16 sm:py-24 lg:py-32'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10' />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/15 blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [180, 360, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-500/10 to-indigo-500/10 blur-3xl'
        />
      </div>

      <div className='relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          className='text-primary border-primary/20 mb-6 inline-flex items-center justify-center gap-2 rounded-full border bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm'
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            🔬
          </motion.div>
          18+ Tools. One Professional Lab.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className='from-foreground via-foreground to-foreground bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
        >
          Your Professional{' '}
          <motion.span
            className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Tool Laboratory
          </motion.span>{' '}
          for Everything
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className='text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl md:text-2xl'
        >
          From finance to health, productivity to planning—ToolifyLab gives you everything you need
          in one fast, privacy-first laboratory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href='#tools'>
              <button className='hover:shadow-primary/25 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 hover:shadow-xl'>
                Explore Lab
                <motion.span
                  className='ml-2 inline-block'
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href='/bmi-calculator'>
              <button className='border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 rounded-xl border px-6 py-4 text-lg font-medium transition-all duration-300'>
                Try BMI Calculator
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
          className='mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12'
        >
          {[
            { number: '18+', label: 'Tools' },
            { number: '100%', label: 'Free' },
            { number: 'PWA', label: 'Ready' },
            { number: '24/7', label: 'Available' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className='text-center'
            >
              <div className='text-primary text-2xl font-bold sm:text-3xl md:text-4xl'>
                {stat.number}
              </div>
              <div className='text-muted-foreground mt-1 text-sm sm:text-base'>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
