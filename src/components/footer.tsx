'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative border-t border-border/50 bg-background/95 backdrop-blur-sm z-10"
    >
      {/* Decorative top line */}
      <div className="absolute top-0 h-[0.5px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm">
              © {new Date().getFullYear()}{' '}
              <span className="font-medium text-foreground">Smart Tools</span>.
              Built with <span className="text-destructive">❤️</span> by{' '}
              <Link
                href="https://www.linkedin.com/in/praveenskg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
              >
                Praveen Singh
              </Link>
            </p>
            <p className="text-xs text-muted-foreground/70">
              Professional Calculator Suite for modern workflows
            </p>
          </div>

          {/* Right Social Icons */}
          <div className="flex gap-3 sm:gap-4">
            {[
              {
                href: 'https://github.com/Praveenskg',
                label: 'GitHub',
                icon: FaGithub,
              },
              {
                href: 'https://www.linkedin.com/in/praveenskg',
                label: 'LinkedIn',
                icon: FaLinkedin,
              },
              {
                href: 'https://twitter.com/its_praveen_s',
                label: 'Twitter',
                icon: FaXTwitter,
              },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 group"
              >
                <Icon className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
