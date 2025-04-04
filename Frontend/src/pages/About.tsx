import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 dark:text-white transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative py-20 bg-primary/10 dark:bg-primary/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 dark:text-white">Our Story</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto dark:text-neutral-300">
              For over two decades, we've been dedicated to crafting exceptional furniture
              that transforms houses into homes, combining timeless design with unparalleled comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm transition-colors duration-300">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Quality First</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We use only the finest materials and craftsmanship in every piece we create.
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm transition-colors duration-300">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Customer Focus</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Your satisfaction and comfort are at the heart of everything we do.
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm transition-colors duration-300">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Timeless Design</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Our pieces are designed to be cherished for generations.
              </p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm transition-colors duration-300">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Passion for Detail</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Every stitch, joint, and finish is crafted with meticulous attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-neutral-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              },
              {
                name: "Michael Chen",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              },
              {
                name: "Emma Williams",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              }
            ].map((member) => (
              <div key={member.name} className="text-center bg-neutral-50 dark:bg-neutral-700 p-6 rounded-lg shadow-sm transition-colors duration-300">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full ring-4 ring-white dark:ring-neutral-600 transition-colors duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{member.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;