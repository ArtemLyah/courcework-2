import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import FishersPage from '../pages/fishers';
import OrdersPage from '../pages/orders';
import App from '../App';
import FishingPlacesPage from '../pages/fishingplaces';
import OrganisationsPage from '../pages/organisations';

export const routes = createBrowserRouter([
  { path: '/', element: <App/>, children: [
    { path: '/', element: <HomePage /> },
    { path: '/fishers', element: <FishersPage /> },
    { path: '/orders', element: <OrdersPage /> },
    { path: '/places', element: <FishingPlacesPage /> },
    { path: '/organisations', element: <OrganisationsPage /> },
  ] },
]);