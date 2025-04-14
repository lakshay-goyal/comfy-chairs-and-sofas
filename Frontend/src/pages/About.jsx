import React from 'react';
import { Hammer, Leaf, Users, Handshake } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative z-10">
            <h1 className="text-5xl font-serif font-normal mb-6 text-neutral-800">
              Heeman Furniture 
            </h1>
            <div className="w-24 h-1 bg-amber-600 mb-8"></div>
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
              What began as a small workshop in Bhiwadi/Rajasthan has grown into a passion project that brings 
              handcrafted furniture to homes across India. Each piece tells a story of tradition 
              meeting modern living.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-neutral-100">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6" 
            alt="Woodworking tools"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl font-serif font-normal text-neutral-800">
              More Than Just Furniture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Craftsmanship */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                <Hammer className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-neutral-800">Artisan Craftsmanship</h3>
                <p className="text-neutral-600">
                  Each piece is handcrafted by skilled artisans using techniques perfected over generations.
                </p>
              </div>
            </div>

            {/* Sustainability */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                <Leaf className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-neutral-800">Sustainable Practices</h3>
                <p className="text-neutral-600">
                  We source materials responsibly and minimize waste at every stage of production.
                </p>
              </div>
            </div>

            {/* Teamwork */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-neutral-800">Family Values</h3>
                <p className="text-neutral-600">
                  As a family-run business, we treat our customers and craftsmen like extended family.
                </p>
              </div>
            </div>

            {/* Customer Service */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                <Handshake className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-neutral-800">Lifetime Support</h3>
                <p className="text-neutral-600">
                  We stand behind our products with exceptional after-sales service and maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-normal text-neutral-800 mb-4">
              Meet Our Family
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              The talented individuals who bring warmth and expertise to every creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Patel",
                role: "Founder & Master Craftsman",
                image: "/images/rajesh.jpg",
                bio: "With 40 years of woodworking experience, Rajesh oversees every design with an artisan's eye."
              },
              {
                name: "Priya Sharma",
                role: "Design Director",
                image: "/images/priya.jpg",
                bio: "Blending traditional techniques with contemporary aesthetics since joining in 2010."
              },
              {
                name: "Arjun Mehta",
                role: "Customer Relations",
                image: "/images/arjun.jpg",
                bio: "Ensuring every client receives personalized attention throughout their journey with us."
              }
            ].map((member) => (
              <div key={member.name} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-neutral-800 mb-1">{member.name}</h3>
                  <p className="text-amber-600 mb-3">{member.role}</p>
                  <p className="text-neutral-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-600 text-white rounded-full mb-4">
                OUR WORKSHOP
              </span>
              <h2 className="text-3xl font-serif font-normal mb-6">Where the Magic Happens</h2>
              <p className="text-neutral-300 mb-8 leading-relaxed">
                Visit our 10,000 sq ft workshop in Jaipur where traditional techniques meet modern 
                precision. We welcome visitors by appointment to see craftsmanship in action.
              </p>
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                Schedule a Visit
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-video bg-neutral-800 rounded-lg overflow-hidden">
                <img 
                  src="/images/workshop.jpg" 
                  alt="Workshop interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
