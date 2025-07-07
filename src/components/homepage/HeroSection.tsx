'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full py-12 sm:py-20 lg:py-24 bg-gradient-to-br from-muted/50 via-background to-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          🔥 15+ Tools. One Smart Suite.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-snug"
        >
          All-in-One <span className="text-primary">Calculator Suite</span> for
          Everyday Use
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
        >
          From finance to health, productivity to planning—Smart Tools gives you
          everything you need in one fast, privacy-first app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex flex-col sm:flex-row justify-center gap-3"
        >
          <Link href="#tools">
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">
              Explore Tools
            </button>
          </Link>
        </motion.div>
      </div>
      <div
        className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] opacity-30 rounded-full pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
