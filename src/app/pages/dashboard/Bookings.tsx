import { useState } from 'react';
import { Search, Filter, Trash2, Check, X } from 'lucide-react';
import { useData } from '@/app/context/DataContext';
import type { Booking } from '@/app/context/DataContext';
import { toast } from 'sonner';

export function Bookings() {
  const { bookings, updateBookingStatus, deleteBooking } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.carName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: Booking['status']) => {
    updateBookingStatus(id, status);
    toast.success('Booking status updated');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
      toast.success('Booking deleted');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
        <p className="text-gray-600">Manage all customer booking requests</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-1" />
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer or car..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">ID</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Customer</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Car</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Dates</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-right py-4 px-4 text-sm font-medium text-gray-700">Total</th>
                <th className="text-center py-4 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-600">#{booking.id}</td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{booking.customerName}</div>
                      <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                      <div className="text-xs text-gray-500">{booking.customerPhone}</div>
                    </td>
                    <td className="py-4 px-4">{booking.carName}</td>
                    <td className="py-4 px-4 text-sm">
                      <div>{new Date(booking.pickupDate).toLocaleDateString()}</div>
                      <div className="text-gray-600">to {new Date(booking.returnDate).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">MMK {booking.totalPrice.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirm"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
