import { useParams, Link } from 'react-router';
import { ArrowLeft, MapPin, Navigation, Calendar, Clock, Users, DollarSign, Star } from 'lucide-react';
import { useData } from '@/app/context/DataContext';
import { useState } from 'react';

// Mock location data
const mockLocations = [
  { id: 1, location: 'Downtown Location - 123 Main St', date: '2026-02-01 09:30 AM', type: 'pickup' },
  { id: 2, location: 'Airport Terminal 2', date: '2026-02-01 11:45 AM', type: 'transit' },
  { id: 3, location: 'Hotel District - 456 Park Ave', date: '2026-02-01 02:15 PM', type: 'transit' },
  { id: 4, location: 'Shopping Mall - 789 Commerce Blvd', date: '2026-02-01 04:30 PM', type: 'transit' },
  { id: 5, location: 'Downtown Location - 123 Main St', date: '2026-02-01 06:00 PM', type: 'return' },
];

const mockRouteHistory = [
  { date: '2026-01-28', from: 'Downtown Location', to: 'Beach Resort', distance: '85 miles', duration: '2h 15m' },
  { date: '2026-01-25', from: 'Airport Terminal', to: 'City Center', distance: '12 miles', duration: '25m' },
  { date: '2026-01-22', from: 'Downtown Location', to: 'Mountain Lodge', distance: '120 miles', duration: '3h 10m' },
  { date: '2026-01-18', from: 'Business District', to: 'Convention Center', distance: '8 miles', duration: '15m' },
];

export function DashboardCarDetails() {
  const { id } = useParams();
  const { getCar, bookings } = useData();
  const car = getCar(id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'location' | 'history'>('overview');

  if (!car) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Car not found</h2>
        <Link to="/dashboard/cars" className="text-blue-600 hover:underline">
          Back to Fleet Management
        </Link>
      </div>
    );
  }

  // Filter bookings for this car
  const carBookings = bookings.filter(b => b.carId === car.id);
  const currentLocation = mockLocations[mockLocations.length - 1];

  // Calculate stats
  const totalRevenue = carBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const totalBookings = carBookings.length;
  const activeBookings = carBookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard/cars"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Fleet Management
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <p className="text-gray-600">{car.brand} • {car.category}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/dashboard/cars/${car.id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Vehicle
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">MMK{totalRevenue}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{totalBookings}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{activeBookings}</div>
          <div className="text-sm text-gray-600">Active Bookings</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{car.rating}</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'location'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Location & Routes
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Booking History
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Vehicle Image */}
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Vehicle Specs */}
              <div>
                <h3 className="text-xl font-bold mb-4">Vehicle Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Seats</div>
                    <div className="font-semibold">{car.seats} Passengers</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Transmission</div>
                    <div className="font-semibold">{car.transmission}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Fuel Type</div>
                    <div className="font-semibold">{car.fuel}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Daily Rate</div>
                    <div className="font-semibold">${car.price}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Reviews */}
              <div>
                <h3 className="text-xl font-bold mb-4">Customer Ratings</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-1">{car.rating}</div>
                    <div className="flex items-center gap-1 justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(car.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{car.reviews} reviews</div>
                  </div>
                  <div className="flex-1 border-l pl-4">
                    <p className="text-gray-600">
                      This vehicle has received excellent feedback from customers, with high ratings for comfort,
                      cleanliness, and overall driving experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location & Routes Tab */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              {/* Current Location */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Current Location
                </h3>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">{currentLocation.location}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Last updated: {currentLocation.date}
                      </div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {currentLocation.type === 'return' ? 'Available' : 'In Use'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Route History */}
              <div>
                <h3 className="text-xl font-bold mb-4">Recent Route History</h3>
                <div className="space-y-3">
                  {mockRouteHistory.map((route, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {route.date}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">{route.distance}</span>
                          <span className="text-gray-600">{route.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{route.from}</div>
                        <div className="text-gray-400">→</div>
                        <div className="font-medium">{route.to}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Timeline */}
              <div>
                <h3 className="text-xl font-bold mb-4">Today's Location Timeline</h3>
                <div className="space-y-4">
                  {mockLocations.map((loc, index) => (
                    <div key={loc.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${loc.type === 'pickup'
                            ? 'bg-green-100 text-green-600'
                            : loc.type === 'return'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                          <MapPin className="w-5 h-5" />
                        </div>
                        {index < mockLocations.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="font-medium">{loc.location}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4" />
                          {loc.date}
                        </div>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${loc.type === 'pickup'
                            ? 'bg-green-100 text-green-700'
                            : loc.type === 'return'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {loc.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Booking History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Booking History</h3>
              {carBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Booking ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Dates</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Duration</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carBookings.map((booking) => {
                        const pickup = new Date(booking.pickupDate);
                        const returnDate = new Date(booking.returnDate);
                        const duration = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));

                        return (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm">#{booking.id}</td>
                            <td className="py-4 px-4">
                              <div className="font-medium">{booking.customerName}</div>
                              <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                            </td>
                            <td className="py-4 px-4 text-sm">
                              <div>{pickup.toLocaleDateString()}</div>
                              <div className="text-gray-600">to {returnDate.toLocaleDateString()}</div>
                            </td>
                            <td className="py-4 px-4 text-sm">{duration} days</td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : booking.status === 'completed'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-medium">${booking.totalPrice}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No booking history for this vehicle yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
