import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useData } from '@/app/context/DataContext';
import { toast } from 'sonner';

export function CarsManagement() {
  const { cars, deleteCar } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteCar(id);
      toast.success('Car deleted successfully');
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fleet Management</h1>
          <p className="text-gray-600">Manage your vehicle inventory</p>
        </div>
        <Link
          to="/dashboard/cars/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Car
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, or category..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{car.name}</h3>
                    <p className="text-sm text-gray-600">{car.brand}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {car.category}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                  <div>
                    <span className="block text-xs text-gray-500">Seats</span>
                    <span className="font-medium">{car.seats}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Trans.</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Fuel</span>
                    <span className="font-medium">{car.fuel}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-xl font-bold">MMK {car.price}</span>
                    <span className="text-sm text-gray-600">/day</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/cars/${car.id}`}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/dashboard/cars/${car.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(car.id, car.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-500">
            No cars found
          </div>
        )}
      </div>
    </div>
  );
}