import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Users, Gauge, Fuel, Star, CheckCircle, Calendar } from 'lucide-react';
import { useData } from '@/app/context/DataContext';
import { toast } from 'sonner';

export function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCar } = useData();
  const car = getCar(id || '');

  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [days, setDays] = useState(1);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Car not found</h2>
          <Link to="/cars" className="text-blue-600 hover:underline">
            Back to cars
          </Link>
        </div>
      </div>
    );
  }

  const calculateDays = (pickup: string, returnD: string) => {
    if (!pickup || !returnD) return 1;
    const start = new Date(pickup);
    const end = new Date(returnD);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleDateChange = (type: 'pickup' | 'return', value: string) => {
    if (type === 'pickup') {
      setPickupDate(value);
      if (returnDate) {
        setDays(calculateDays(value, returnDate));
      }
    } else {
      setReturnDate(value);
      if (pickupDate) {
        setDays(calculateDays(pickupDate, value));
      }
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      toast.error('Please select pickup and return dates');
      return;
    }
    toast.success('Booking confirmed! Redirecting to payment...');
    setTimeout(() => {
      navigate('/cars');
    }, 2000);
  };

  const totalPrice = car.price * days;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to all cars
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="aspect-[16/9]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-2">
                    {car.category}
                  </span>
                  <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                  <p className="text-gray-600">{car.brand}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{car.rating}</span>
                  <span className="text-gray-600">({car.reviews} reviews)</span>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600 mb-1">Passengers</p>
                  <p className="font-semibold">{car.seats} Seats</p>
                </div>
                <div className="text-center">
                  <Gauge className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600 mb-1">Transmission</p>
                  <p className="font-semibold">{car.transmission}</p>
                </div>
                <div className="text-center">
                  <Fuel className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600 mb-1">Fuel Type</p>
                  <p className="font-semibold">{car.fuel}</p>
                </div>
              </div>

              {/* Features */}
              <div className="pt-6">
                <h2 className="font-semibold text-xl mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  MMK{car.price}
                  <span className="text-lg text-gray-600 font-normal">/day</span>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => handleDateChange('pickup', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Return Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => handleDateChange('return', e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per day</span>
                    <span className="font-medium">${car.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Number of days</span>
                    <span className="font-medium">{days}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-blue-600">${totalPrice}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </form>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free cancellation up to 24h before pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Full insurance coverage included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>24/7 roadside assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}