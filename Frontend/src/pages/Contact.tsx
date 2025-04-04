import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Contact Us</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 transition-colors duration-300">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:ring-primary-light/20 dark:focus:border-primary-light dark:text-white transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:ring-primary-light/20 dark:focus:border-primary-light dark:text-white transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:ring-primary-light/20 dark:focus:border-primary-light dark:text-white transition-colors"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary-light dark:hover:bg-primary-light/90 dark:text-black font-medium py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary dark:text-primary-light" />
                  <div>
                    <h3 className="font-medium dark:text-white">Visit Us</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">123 Furniture Street, Los Angeles, CA 90012</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary dark:text-primary-light" />
                  <div>
                    <h3 className="font-medium dark:text-white">Call Us</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary dark:text-primary-light" />
                  <div>
                    <h3 className="font-medium dark:text-white">Email Us</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">contact@comfy.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary dark:text-primary-light" />
                  <div>
                    <h3 className="font-medium dark:text-white">Business Hours</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 dark:bg-primary/5 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">FAQs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 dark:text-white">What is your return policy?</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">We offer a 30-day return policy for all our products.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 dark:text-white">Do you offer assembly services?</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">Yes, we provide professional assembly services for all furniture purchases.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
