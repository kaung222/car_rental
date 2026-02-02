import { RouterProvider } from 'react-router';
import { Toaster } from '@/app/components/ui/sonner';
import { router } from '@/app/routes.tsx';
import { AuthProvider } from '@/app/context/AuthContext';
import { DataProvider } from '@/app/context/DataContext';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </DataProvider>
    </AuthProvider>
  );
}