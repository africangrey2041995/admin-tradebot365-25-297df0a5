
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy-loaded admin pages
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Users = lazy(() => import('@/pages/admin/Users'));
const UserDetail = lazy(() => import('@/pages/admin/UserDetail'));
const Packages = lazy(() => import('@/pages/admin/Packages'));
const Subscriptions = lazy(() => import('@/pages/admin/Subscriptions'));
const Settings = lazy(() => import('@/pages/admin/Settings'));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={
          <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <Dashboard />
          </Suspense>
        } />
        <Route path="users" element={
          <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <Users />
          </Suspense>
        } />
        <Route path="users/:userId" element={
          <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <UserDetail />
          </Suspense>
        } />
        <Route path="packages" element={
          <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <Packages />
          </Suspense>
        } />
        <Route path="subscriptions" element={
          <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <Subscriptions />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <Settings />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}
