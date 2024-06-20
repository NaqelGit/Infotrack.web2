import { HomePage, TasksPage, ProfilePage, TaskDetail, RegionPage } from './pages';

import { withNavigationWatcher } from './contexts/navigation';
import Roles from './pages/auth/roles';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    //   {
    //     path: '/region',
    //     element: RegionPage
    //   }, 
    {
        path: '/region',
        element: RegionPage
    },
   

];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
