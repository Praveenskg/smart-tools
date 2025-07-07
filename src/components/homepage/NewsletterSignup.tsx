'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Subscribed Successfully', {
      description: 'You’ll now receive new tool updates & tips in your inbox!',
    });
    setEmail('');
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-muted/50 py-12 px-4 sm:px-6 lg:px-8 text-center"
    >
      <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
      <p className="text-muted-foreground mb-6 text-sm sm:text-base max-w-xl mx-auto">
        Get the latest updates, new tools, and productivity tips straight to
        your inbox.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
          required
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition"
        >
          Subscribe
        </button>
      </form>
    </motion.section>
  );
}
