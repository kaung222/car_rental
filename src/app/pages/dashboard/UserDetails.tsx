import { useParams, Link } from 'react-router';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, ShoppingBag, CheckCircle, Star, Car as CarIcon } from 'lucide-react';
import { useData } from '@/app/context/DataContext';
import { useState } from 'react';

export function UserDetails() {
  const { id } = useParams();
  const { users, bookings } = useData();
  const user = users.find(u => u.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings'>('overview');

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <Link to="/dashboard/users" className="text-blue-600 hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  // Filter bookings for this user (matching by email)
  const userBookings = bookings.filter(b => b.customerEmail === user.email);

  // Calculate additional stats
  const completedBookings = userBookings.filter(b => b.status === 'completed').length;
  const pendingBookings = userBookings.filter(b => b.status === 'pending').length;
  const averageBookingValue = user.totalBookings > 0 ? user.totalSpent / user.totalBookings : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard/users"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Users
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user.verified && (
                  <CheckCircle className="w-6 h-6 text-green-600" title="Verified User" />
                )}
              </div>
              <p className="text-gray-600">Customer ID: {user.id}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${user.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : user.status === 'inactive'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-red-100 text-red-700'
                  }`}
              >
                {user.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{user.totalBookings}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">{completedBookings}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">MMK{user.totalSpent.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Spent</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">${averageBookingValue.toFixed(0)}</div>
          <div className="text-sm text-gray-600">Avg. Booking Value</div>
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
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === 'bookings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Booking History ({userBookings.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Email Address</span>
                    </div>
                    <div className="font-medium">{user.email}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Phone Number</span>
                    </div>
                    <div className="font-medium">{user.phone}</div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div>
                <h3 className="text-xl font-bold mb-4">Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Member Since</span>
                    </div>
                    <div className="font-medium">
                      {new Date(user.joinedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Verification Status</span>
                    </div>
                    <div className="font-medium">
                      {user.verified ? (
                        <span className="text-green-600">Verified ✓</span>
                      ) : (
                        <span className="text-orange-600">Not Verified</span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Account Status</span>
                    </div>
                    <div className="font-medium capitalize">{user.status}</div>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div>
                <h3 className="text-xl font-bold mb-4">Activity Summary</h3>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{user.totalBookings}</div>
                      <div className="text-sm text-gray-600">Total Rentals</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600 mb-1">{completedBookings}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-600 mb-1">{pendingBookings}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {Math.ceil((Date.now() - new Date(user.joinedDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-sm text-gray-600">Days Member</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking History Tab */}
          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Complete Booking History</h3>
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.map((booking) => {
                    const pickup = new Date(booking.pickupDate);
                    const returnDate = new Date(booking.returnDate);
                    const duration = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <div key={booking.id} className="border rounded-xl p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* Left side - Car info */}
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <CarIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-1">{booking.carName}</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {pickup.toLocaleDateString()} - {returnDate.toLocaleDateString()}
                                  </span>
                                </div>
                                <div>Duration: {duration} day{duration !== 1 ? 's' : ''}</div>
                                <div className="text-xs text-gray-500">
                                  Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right side - Status and price */}
                          <div className="flex flex-col items-start lg:items-end gap-3">
                            <div className="text-2xl font-bold text-blue-600">
                              ${booking.totalPrice}
                            </div>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : booking.status === 'completed'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-red-100 text-red-700'
                                }`}
                            >
                              {booking.status.toUpperCase()}
                            </span>
                            <div className="text-sm text-gray-600">
                              Booking ID: #{booking.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No booking history available for this user.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
