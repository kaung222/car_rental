import { createContext, useContext, useState, ReactNode } from 'react';
import { cars as initialCars, type Car } from '@/app/data/cars';

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  totalBookings: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  verified: boolean;
  avatar?: string;
}

interface DataContextType {
  cars: Car[];
  bookings: Booking[];
  users: User[];
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  getCar: (id: string) => Car | undefined;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
  updateUserStatus: (id: string, status: User['status']) => void;
  deleteUser: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock booking data
const initialBookings: Booking[] = [
  {
    id: 'b1',
    carId: '1',
    carName: 'Porsche 911',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1 (555) 234-5678',
    pickupDate: '2026-02-05',
    returnDate: '2026-02-08',
    totalPrice: 897000,
    status: 'confirmed',
    createdAt: '2026-01-28'
  },
  {
    id: 'b2',
    carId: '2',
    carName: 'Tesla Model S',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1 (555) 345-6789',
    pickupDate: '2026-02-10',
    returnDate: '2026-02-15',
    totalPrice: 945000,
    status: 'pending',
    createdAt: '2026-01-30'
  },
  {
    id: 'b3',
    carId: '3',
    carName: 'Range Rover Sport',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown@email.com',
    customerPhone: '+1 (555) 456-7890',
    pickupDate: '2026-02-03',
    returnDate: '2026-02-06',
    totalPrice: 747000,
    status: 'completed',
    createdAt: '2026-01-25'
  },
  {
    id: 'b4',
    carId: '4',
    carName: 'BMW i4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.d@email.com',
    customerPhone: '+1 (555) 567-8901',
    pickupDate: '2026-02-12',
    returnDate: '2026-02-14',
    totalPrice: 338000,
    status: 'pending',
    createdAt: '2026-01-31'
  },
  {
    id: 'b5',
    carId: '5',
    carName: 'Mercedes AMG GT',
    customerName: 'David Wilson',
    customerEmail: 'dwilson@email.com',
    customerPhone: '+1 (555) 678-9012',
    pickupDate: '2026-02-01',
    returnDate: '2026-02-03',
    totalPrice: 658000,
    status: 'cancelled',
    createdAt: '2026-01-27'
  }
];

// Mock user data
const initialUsers: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 234-5678',
    joinedDate: '2025-08-15',
    totalBookings: 12,
    totalSpent: 542000,
    status: 'active',
    verified: true
  },
  {
    id: 'u2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 345-6789',
    joinedDate: '2025-09-22',
    totalBookings: 8,
    totalSpent: 328000,
    status: 'active',
    verified: true
  },
  {
    id: 'u3',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '+1 (555) 456-7890',
    joinedDate: '2025-10-10',
    totalBookings: 15,
    totalSpent: 765000,
    status: 'active',
    verified: true
  },
  {
    id: 'u4',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 (555) 567-8901',
    joinedDate: '2025-11-05',
    totalBookings: 5,
    totalSpent: 189000,
    status: 'active',
    verified: true
  },
  {
    id: 'u5',
    name: 'David Wilson',
    email: 'dwilson@email.com',
    phone: '+1 (555) 678-9012',
    joinedDate: '2025-12-18',
    totalBookings: 3,
    totalSpent: 1245000,
    status: 'inactive',
    verified: false
  },
  {
    id: 'u6',
    name: 'Jennifer Martinez',
    email: 'j.martinez@email.com',
    phone: '+1 (555) 789-0123',
    joinedDate: '2026-01-03',
    totalBookings: 7,
    totalSpent: 298000,
    status: 'active',
    verified: true
  },
  {
    id: 'u7',
    name: 'Robert Taylor',
    email: 'r.taylor@email.com',
    phone: '+1 (555) 890-1234',
    joinedDate: '2025-07-25',
    totalBookings: 20,
    totalSpent: 1240000,
    status: 'active',
    verified: true
  },
  {
    id: 'u8',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+1 (555) 901-2345',
    joinedDate: '2025-06-12',
    totalBookings: 2,
    totalSpent: 580000,
    status: 'suspended',
    verified: true
  }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addCar = (carData: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...carData,
      id: Date.now().toString()
    };
    setCars(prev => [...prev, newCar]);
  };

  const updateCar = (id: string, carData: Partial<Car>) => {
    setCars(prev => prev.map(car =>
      car.id === id ? { ...car, ...carData } : car
    ));
  };

  const deleteCar = (id: string) => {
    setCars(prev => prev.filter(car => car.id !== id));
  };

  const getCar = (id: string) => {
    return cars.find(car => car.id === id);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking =>
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const updateUserStatus = (id: string, status: User['status']) => {
    setUsers(prev => prev.map(user =>
      user.id === id ? { ...user, status } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <DataContext.Provider value={{
      cars,
      bookings,
      users,
      addCar,
      updateCar,
      deleteCar,
      getCar,
      updateBookingStatus,
      deleteBooking,
      updateUserStatus,
      deleteUser
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}