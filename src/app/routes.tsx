import { createBrowserRouter } from 'react-router';
import { Root } from '@/app/pages/Root';
import { Home } from '@/app/pages/Home';
import { Cars } from '@/app/pages/Cars';
import { CarDetails } from '@/app/pages/CarDetails';
import { About } from '@/app/pages/About';
import { Contact } from '@/app/pages/Contact';
import { NotFound } from '@/app/pages/NotFound';
import { Login } from '@/app/pages/Login';
import { DashboardLayout } from '@/app/components/DashboardLayout';
import { Overview } from '@/app/pages/dashboard/Overview';
import { Bookings } from '@/app/pages/dashboard/Bookings';
import { CarsManagement } from '@/app/pages/dashboard/CarsManagement';
import { CarForm } from '@/app/pages/dashboard/CarForm';
import { DashboardCarDetails } from '@/app/pages/dashboard/DashboardCarDetails';
import { Users } from '@/app/pages/dashboard/Users';
import { UserDetails } from '@/app/pages/dashboard/UserDetails';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'cars', Component: Cars },
      { path: 'cars/:id', Component: CarDetails },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Overview },
      { path: 'bookings', Component: Bookings },
      { path: 'cars', Component: CarsManagement },
      { path: 'cars/new', Component: CarForm },
      { path: 'cars/:id', Component: DashboardCarDetails },
      { path: 'cars/:id/edit', Component: CarForm },
      { path: 'users', Component: Users },
      { path: 'users/:id', Component: UserDetails },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);