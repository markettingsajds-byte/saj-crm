import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
