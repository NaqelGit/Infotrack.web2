import { Route } from 'react-router-dom';
import { withNavigationWatcher } from '../../contexts/navigation';
import Roles from './roles';
import RoleGroups from './role-groups';
import Users from './users';

const routes = [
    {
        path: 'users',
        element: Users
    },
    {
        path: 'roles',
        element: Roles
    },
    {
        path: 'role-groups',
        element: RoleGroups
    },
    {
        path: 'dashboard',
        element: Roles
    }
];

 const authRoutes = routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});

export default function RouteBuilder() {
    return <Route
        path='auth'
        children={authRoutes.map(({ path, element }) => (
            <Route
                key={path}
                path={path}
                element={element}
            />
        ))}
    />


}


