import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { commonRoutes } from './routes/CommonRoutes';
import { protectedRoutes } from './routes/ProtectedRoutes';

export default function App() {

  return (
    <>

      <Routes>
        {
          commonRoutes.map(route => <Route key={route.id} path={route.path} element={<route.element />} />)
        }
        {
          protectedRoutes.map(route => <Route key={route.id} path={route.path} element={<route.element />} />)
        }
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>

    </>
  )
}
