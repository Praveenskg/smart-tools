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
      className='border-border/50 bg-background relative z-10 border-t backdrop-blur-sm'
    >
      <div className='via-primary/40 absolute top-0 h-[0.5px] w-full animate-pulse bg-linear-to-r from-transparent to-transparent' />
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-12'>
        <div className='text-muted-foreground flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left'>
          <div className='space-y-1'>
            <p className='text-xs sm:text-sm'>
              © {new Date().getFullYear()}{' '}
              <span className='text-foreground font-medium'>Smart Tools</span>. Built with{' '}
              <span className='text-destructive'>❤️</span> by{' '}
              <Link
                href='https://www.linkedin.com/in/praveenskg'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary focus-visible:ring-primary/60 rounded-sm hover:underline focus:outline-none focus-visible:ring-2'
              >
                Praveen Singh
              </Link>
            </p>
            <p className='text-muted-foreground/70 text-xs'>
              Professional Calculator Suite for modern workflows
            </p>
          </div>

          <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-end sm:gap-5'>
            <div className='flex justify-center gap-3 sm:gap-4'>
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
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='hover:bg-primary/10 text-muted-foreground hover:text-primary focus-visible:ring-primary/40 group rounded-md p-2 transition-all duration-200 focus:outline-none focus-visible:ring-2'
                >
                  <Icon className='text-lg transition-transform duration-200 group-hover:scale-110 sm:text-xl' />
                </Link>
              ))}
            </div>
            <div className='mt-2 flex flex-col items-center sm:mt-0'>
              <Link
                href='https://www.buymeacoffee.com/praveenskg'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Buy Me a Coffee'
              >
                <Image
                  src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png'
                  alt='Buy Me a Coffee'
                  width={0}
                  height={0}
                  sizes='(max-width: 640px) 80vw, 150px'
                  className='h-auto w-[162px] transition-transform duration-200 hover:scale-105 sm:w-[217px]'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
