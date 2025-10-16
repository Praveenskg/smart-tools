'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='border-border/40 bg-gradient-to-br from-background to-background/95 relative z-10 border-t backdrop-blur-xl'
    >
      {/* Top gradient border */}
      <div className='absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

      {/* Background pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-30' />

      <div className='relative container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12'>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='lg:col-span-1'
          >
            <div className='flex flex-col space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg'>
                  <span className='text-white font-bold text-lg'>T</span>
                </div>
                <div>
                  <h3 className='text-lg font-bold text-foreground'>ToolifyLab</h3>
                  <p className='text-sm text-muted-foreground'>Professional Calculator Suite</p>
                </div>
              </div>

              <p className='text-muted-foreground text-sm leading-relaxed max-w-xs'>
                Your comprehensive toolkit for calculations, conversions, and productivity tools.
                Built with modern web technologies for the best user experience.
              </p>

              <div className='flex space-x-1'>
                {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className='rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='lg:col-span-1'
          >
            <h4 className='mb-4 text-sm font-semibold text-foreground uppercase tracking-wide'>
              Quick Links
            </h4>
            <div className='grid grid-cols-2 gap-3 sm:gap-4'>
              {[
                { href: '/bmi-calculator', label: 'BMI Calculator' },
                { href: '/currency-converter', label: 'Currency Converter' },
                { href: '/unit-converter', label: 'Unit Converter' },
                { href: '/percentage-calculator', label: 'Percentage Calc' },
                { href: '/gst-calculator', label: 'GST Calculator' },
                { href: '/emi-calculator', label: 'EMI Calculator' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className='text-muted-foreground hover:text-primary text-sm transition-colors duration-200 hover:underline'
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social & Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='lg:col-span-1'
          >
            <h4 className='mb-4 text-sm font-semibold text-foreground uppercase tracking-wide'>
              Connect & Support
            </h4>

            <div className='space-y-4'>
              {/* Social Links */}
              <div className='flex justify-start gap-3'>
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
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={label}
                      className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200'
                    >
                      <Icon className='h-5 w-5' />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Buy Me a Coffee */}
              <div className='flex flex-col space-y-2'>
                <p className='text-xs text-muted-foreground'>Support the project</p>
                <Link
                  href='https://www.buymeacoffee.com/praveenskg'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Buy Me a Coffee'
                  className='inline-block'
                >
                  <Image
                    src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'
                    alt='Buy Me a Coffee'
                    width={0}
                    height={0}
                    sizes='(max-width: 640px) 120px, 150px'
                    className='h-auto w-32 transition-transform duration-200 hover:scale-105 sm:w-40'
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mt-8 border-t border-border/50 pt-6'
        >
          <div className='flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>
                © {new Date().getFullYear()}{' '}
                <span className='text-foreground font-medium'>ToolifyLab</span>. Crafted with{' '}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='inline-block text-red-500'
                >
                  ❤️
                </motion.span>{' '}
                by{' '}
                <Link
                  href='https://www.linkedin.com/in/praveenskg'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline font-medium transition-colors'
                >
                  Praveen Singh
                </Link>
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-xs text-muted-foreground sm:justify-start'>
                <span>Privacy First</span>
                <span>•</span>
                <span>No Data Collection</span>
                <span>•</span>
                <span>Open Source</span>
                <span>•</span>
                <span>PWA Ready</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className='absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60' />
    </motion.footer>
  );
}

export default Footer;
