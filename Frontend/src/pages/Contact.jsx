import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);
    
  //   try {
  //     // Replace with your actual backend URL
  //     const response = await fetch('http://localhost:8000/api/contact/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formState),
  //     });
      
  //     if (!response.ok) {
  //       throw new Error('Failed to submit form');
  //     }
      
  //     setFormSubmitted(true);
  //     setIsLoading(false);
      
  //     // Reset form after 5 seconds
  //     setTimeout(() => {
  //       setFormSubmitted(false);
  //       setFormState({ name: '', email: '', subject: '', message: '' });
  //     }, 5000);
      
  //   } catch (err) {
  //     setError('There was an error sending your message. Please try again later.');
  //     setIsLoading(false);
  //     console.error('Error submitting form:', err);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }
      
      if (data.status === 'verification_sent') {
        setFormSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
      }
      
    } catch (err) {
      setError(err.message || 'There was an error sending your message. Please try again later.');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-800">
      {/* Hero Section */}
      <div className="bg-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Get in Touch</h1>
          <p className="text-amber-100 text-center max-w-2xl mx-auto text-lg">
            Have questions or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Sidebar - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-semibold mb-6 text-amber-600">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Visit Us</h3>
                    <p className="text-neutral-600">123 Furniture Street, Los Angeles, CA 90012</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Call Us</h3>
                    <p className="text-neutral-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Us</h3>
                    <p className="text-neutral-600">contact@comfy.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Business Hours</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-neutral-200 rounded-lg h-48 flex items-center justify-center">
                <p className="text-neutral-500">Interactive Map</p>
              </div>
            </div>
          </div>

          {/* Right Section - Form and FAQs */}
          <div className="lg:col-span-2 space-y-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-amber-600">Send Us a Message</h2>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-green-800">Verification Email Sent!</h3>
                  <p className="text-green-600 mt-2">
                    Please check your email and click the verification link to complete your submission.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-neutral-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-amber-600">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium text-lg mb-2">What is your return policy?</h4>
                  <p className="text-neutral-600">We offer a 30-day return policy for all our products. Items must be in original condition with all packaging and tags intact. Shipping costs for returns are the responsibility of the customer unless the item was received damaged or defective.</p>
                </div>
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium text-lg mb-2">Do you offer assembly services?</h4>
                  <p className="text-neutral-600">Yes, we provide professional assembly services for all furniture purchases. Our expert team ensures your furniture is properly assembled and positioned in your desired location. Assembly services can be added during checkout for a nominal fee.</p>
                </div>
                <div className="border-b border-neutral-200 pb-4">
                  <h4 className="font-medium text-lg mb-2">How long does shipping take?</h4>
                  <p className="text-neutral-600">Standard shipping typically takes 3-7 business days depending on your location. Express shipping options are available at checkout for faster delivery. Once your order ships, you'll receive a tracking number via email to monitor your delivery status.</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Do you ship internationally?</h4>
                  <p className="text-neutral-600">Currently, we ship to the United States and Canada. We're working on expanding our shipping options to more countries. Please contact our customer service team for any special international shipping inquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-amber-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-neutral-600 mb-8">Stay updated with our latest products, promotions, and interior design tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                className="flex-grow px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your email address"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;