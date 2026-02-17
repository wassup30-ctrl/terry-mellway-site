'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send message.');
        return;
      }

      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setError('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="max-w-lg rounded-md border border-sage/30 bg-sage/10 px-6 py-8 text-center">
        <p className="text-lg font-medium text-charcoal">Thank you!</p>
        <p className="mt-2 text-sm text-charcoal/70">
          Your message has been sent. Terry will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 px-6 py-2 text-sm text-brown underline underline-offset-2 hover:text-brown-light transition-colors"
        >
          Send another message
        </button>
      </div>
    );
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
          disabled={sending}
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors disabled:opacity-50"
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
          disabled={sending}
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors disabled:opacity-50"
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
          disabled={sending}
          className="w-full px-4 py-2.5 bg-white border border-warm-gray rounded-md text-charcoal text-sm focus:outline-none focus:border-brown focus:ring-1 focus:ring-brown transition-colors resize-vertical disabled:opacity-50"
          placeholder="Your message..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="px-8 py-2.5 bg-brown text-white text-sm tracking-wide uppercase rounded-md hover:bg-brown-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
