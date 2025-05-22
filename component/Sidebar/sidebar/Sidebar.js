"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Styles from './Sidebar.module.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
// import IncidentIcon from '../../../public/icons/incident.png';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const menuItems = [
    {
      title: 'Work Permit Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      title: 'FIR Dashboard',
      icon: <LocalFireDepartmentIcon />,
      path: '/fir-dashboard',
    },
    {
      title: 'Safety Audit Dashboard',
      icon: <HealthAndSafetyIcon />,
      path: '/safety-dashboard',
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${Styles.sidebar} ${isCollapsed ? Styles.collapsed : ''}`}>
      <div className={Styles.toggleButton}>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </div>

      <div className={Styles.menuItems}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${Styles.menuItem} ${pathname === item.path ? Styles.active : ''}`}
            onClick={() => router.push(item.path)}
          >
            <div className={Styles.icon}>{item.icon}</div>
            {!isCollapsed && <span className={Styles.title}>{item.title}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

//i am working in the safety dashboard i want to make the 5 buttons request pending , aprroved, rejected , closed into 3 buttons named open ,captured,Pending set icons acordingly .And make the graph working with the data from the api the graph will show data of the present month  The data will be fetched from the api and the graph will show the data of the present month , the table names will be captured, closed  , pending .Each of these will have two tables separated by Usc and Usa  . also add a circular data graph on right side of graph  showing areas in which incidents have occured . the data should be fetched from real time . Also add comments in which i can add api end points for data fetching in future. Also tell the steps to integrate APIin the code