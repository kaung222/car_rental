import { Car, CalendarCheck, DollarSign, Users } from 'lucide-react';
import { useData } from '@/app/context/DataContext';
import { Link } from 'react-router';

export function Overview() {
  const { cars, bookings } = useData();

  const stats = {
    totalCars: 7,
    totalBookings: 75,
    pendingBookings: 12,
    revenue: 12459000
  };

  const recentBookings = bookings.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your fleet.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.totalCars}</div>
          <div className="text-sm text-gray-600">Total Vehicles</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.totalBookings}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.pendingBookings}</div>
          <div className="text-sm text-gray-600">Pending Requests</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">MMK {stats.revenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Bookings</h2>
          <Link
            to="/dashboard/bookings"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Car</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Dates</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                  </td>
                  <td className="py-4 px-4">{booking.carName}</td>
                  <td className="py-4 px-4 text-sm">
                    {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                  </td>
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
                  <td className="py-4 px-4 text-right font-medium">MMK{booking.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
