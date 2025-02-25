
import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Our Story</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              For over two decades, we've been dedicated to crafting exceptional furniture
              that transforms houses into homes, combining timeless design with unparalleled comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-neutral-600">
                We use only the finest materials and craftsmanship in every piece we create.
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-neutral-600">
                Your satisfaction and comfort are at the heart of everything we do.
              </p>
            </div>
            <div className="text-center p-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timeless Design</h3>
              <p className="text-neutral-600">
                Our pieces are designed to be cherished for generations.
              </p>
            </div>
            <div className="text-center p-6">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Passion for Detail</h3>
              <p className="text-neutral-600">
                Every stitch, joint, and finish is crafted with meticulous attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
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
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
