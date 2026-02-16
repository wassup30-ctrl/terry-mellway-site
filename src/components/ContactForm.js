'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:6artist6@gmail.com?subject=${subject}&body=${body}`;
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
          value={name}
          onChange={e => setName(e.target.value)}
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
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors resize-vertical"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        className="px-8 py-2.5 bg-brown text-white text-sm tracking-wide uppercase rounded-md hover:bg-brown-light transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
