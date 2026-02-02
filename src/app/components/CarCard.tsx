import { Link } from 'react-router';
import { Users, Gauge, Fuel, Star } from 'lucide-react';
import type { Car } from '@/app/data/cars';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link to={`/cars/${car.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-3">
            {car.category}
          </span>

          {/* Name and Rating */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {car.name}
              </h3>
              <p className="text-sm text-gray-600">{car.brand}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{car.rating}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{car.seats}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              <span>{car.fuel}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-2xl font-bold text-gray-900">MMK{car.price}</span>
              <span className="text-sm text-gray-600">/day</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
