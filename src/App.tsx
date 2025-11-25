import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Layout from './components/staticComponents/Layout';
import { DynamicRoutes } from './routes/DynamicRoutes';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import NotFoundPage from './components/staticComponents/NotFoundPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <Homepage />
          </PublicRoute>
        } />
        {/* Home route renders LoginPage */}
        <Route path="/" element={<Layout />}>
          {DynamicRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            } />
          ))}
        </Route>
        {/* Catch all inside layout: redirect unknown routes to homepage */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
