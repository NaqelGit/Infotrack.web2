import { Routes, Route, Navigate } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';
import { Footer } from './components';
import AuthRouteBuilder from './pages/auth/auth-routes'

export default function Content() {
  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}

        {/* routes of auth module */}
        {AuthRouteBuilder()}
        

        <Route
          path='*'
          element={<Navigate to='/home' />}
        />
      </Routes>
      <Footer>
        Copyright © 2011-{new Date().getFullYear()} {"Naqel Express"}.
      </Footer>
    </SideNavBarLayout>
  );
}

