'use client'
import React, { useEffect, useState } from 'react';
import Styles from './firDashboard.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { getLocalStorage } from '../../helperFunction/localStorage';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Card from '../ui/firDashboard/Card';
import Graph from '../ui/firDashboard/Graph';

const FirDashboard = () => {
  const router = useRouter();
  const user = getLocalStorage('user');
  const isAdmin = user?.role === 'admin';
  
  const [requestData, setRequestData] = useState([
    {
      permitNumber: "FIR789012",
      vendorDetail: {
        name: "Fire Response Team 1",
        email: "team1@fire.com"
      },
      createdAt: "2024-01-15T11:20:00Z",
      status: "pending",
      formDetail: {
        formName: "Fire Incident Report",
      }
    },
    {
      permitNumber: "FIR789013",
      vendorDetail: {
        name: "Fire Response Team 2",
        email: "team2@fire.com"
      },
      createdAt: "2024-01-14T10:45:00Z",
      status: "approved",
      formDetail: {
        formName: "Emergency Response Report",
      }
    }
  ]);

  const [graphXdata, setGraphXdata] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May']);
  const [graphActive, setGraphActive] = useState([10, 8, 12, 7, 9]);
  const [graphClosed, setGraphClosed] = useState([8, 7, 10, 6, 8]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  
  const [cardObj, setCardObj] = useState([
    { status: 'active', count: 15, icon: 'activeIcon' },
    { status: 'resolved', count: 8, icon: 'resolvedIcon' },
    { status: 'pending', count: 4, icon: 'pendingIcon' }
  ]);

  const handleCard = async (title) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/status/${title}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={Styles.dashboardContainer}>
      <Image
        className={Styles.dashboardImage}
        priority
        src={DashboardDesign}
        alt="submitted"
      />
      <div className={Styles.main}>
        <div className={Styles.header}>
          <h1 className={Styles.title}>Fire Incident Reports</h1>
        </div>

        <div className={Styles.cardContainer}>
          {cardObj.map((card, index) => (
            <Card 
              key={index} 
              title={card.status} 
              number={card.count} 
              handleClick={handleCard}
            />
          ))}
        </div>

        <div className={Styles.graphContainer}>
          <Graph 
            xdata={graphXdata} 
            activeYData={graphActive} 
            closedYData={graphClosed} 
          />
        </div>
      </div>
    </div>
  );
};

export default FirDashboard;