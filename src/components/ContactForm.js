'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xpwdjvkl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors resize-vertical"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-8 py-2.5 bg-brown text-white text-sm tracking-wide uppercase rounded-md hover:bg-brown-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'sent' && (
        <p className="text-sage text-sm">Thank you! Your message has been sent.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm">Something went wrong. Please try emailing directly at 6artist6@gmail.com</p>
      )}
    </form>
  );
}
