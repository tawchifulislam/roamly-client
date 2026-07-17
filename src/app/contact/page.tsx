'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-16 space-y-6">
      <h1 className="font-heading text-3xl font-bold">Contact Us</h1>
      <p className="text-gray-600 text-sm">
        Have a question or need help planning a trip? Send us a message.
      </p>

      {submitted ? (
        <p className="text-teal-700 font-medium">
          Thanks, {form.name || 'traveler'}! We&apos;ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <button
            type="submit"
            className="bg-black text-white rounded px-5 py-2"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="pt-6 border-t text-sm text-gray-500 space-y-1">
        <p>support@roamly.com</p>
        <p>+880 1XXX-XXXXXX</p>
        <p>Chattogram, Bangladesh</p>
      </div>
    </div>
  );
}
