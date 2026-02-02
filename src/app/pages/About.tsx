import { Award, Target, Users2, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About DriveNow</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your trusted partner in premium car rentals since 2010. We're committed to providing exceptional service and unforgettable driving experiences.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide accessible, premium transportation solutions for every journey
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Quality First</h3>
              <p className="text-gray-600">
                Every vehicle in our fleet meets the highest standards of safety and comfort
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority with personalized service every time
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Community</h3>
              <p className="text-gray-600">
                We're proud to serve and support our local communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 2010, DriveNow began with a simple vision: to make premium car rentals accessible to everyone. What started as a small operation with just 10 vehicles has grown into one of the most trusted names in the car rental industry.
              </p>
              <p>
                Today, we operate in over 50 locations across the country, managing a diverse fleet of more than 500 vehicles ranging from practical economy cars to luxurious sports cars. Our success is built on a foundation of trust, quality, and exceptional customer service.
              </p>
              <p>
                We believe that the journey is just as important as the destination. That's why we've carefully curated our fleet to include only the best vehicles, each maintained to the highest standards and equipped with modern features to ensure your comfort and safety.
              </p>
              <p>
                Our team of dedicated professionals works around the clock to ensure that your rental experience is seamless from start to finish. Whether you're renting for a business trip, a family vacation, or just need a reliable vehicle for the day, we're here to help make your journey memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">14+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Vehicles</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Locations</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
