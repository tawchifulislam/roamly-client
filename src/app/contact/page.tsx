'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Container from '@/components/Container';
import { toast } from 'sonner';

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
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-3">
          Have a question or need help planning a trip? Send us a message,
          we&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
        <div className="lg:col-span-3 rounded-xl border border-gray-200 p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-10 gap-3">
              <CheckCircle2 size={40} className="text-teal-700" />
              <p className="font-heading font-semibold text-lg text-gray-900">
                Thanks, {form.name || 'traveler'}!
              </p>
              <p className="text-gray-500 text-sm">
                We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-teal-700"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-teal-700"
              />
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-teal-700"
              />
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg px-5 py-2.5 font-medium transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-gray-200 p-5 flex items-start gap-3">
            <Mail size={18} className="text-teal-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-500">support@roamly.com</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 p-5 flex items-start gap-3">
            <Phone size={18} className="text-teal-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-500">+880 1XXX-XXXXXX</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 p-5 flex items-start gap-3">
            <MapPin size={18} className="text-teal-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-500">Chattogram, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
