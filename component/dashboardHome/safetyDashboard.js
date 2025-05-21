'use client'
import React, { useEffect, useState } from 'react';
import Styles from './safetyDashboard.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getLocalStorage } from '../../helperFunction/localStorage';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Card from '../ui/safetyDashboard/Card';
import PieChart from '../ui/safetyDashboard/PieChart';

const SafetyDashboard = () => {
  const router = useRouter();
  const user = getLocalStorage('user');
  const isAdmin = user?.role === 'admin';
  
  const [areaIncidents, setAreaIncidents] = useState([
    { title: 'Area 1', value: 35, color: '#4CAF50' },
    { title: 'Area 2', value: 25, color: '#2196F3' },
    { title: 'Area 3', value: 20, color: '#FFC107' },
    { title: 'Area 4', value: 20, color: '#9C27B0' }
  ]);

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  
  const [cardObj, setCardObj] = useState([
    { status: 'open', count: 150, icon: 'openIcon' },
    { status: 'captured', count: 85, icon: 'capturedIcon' },
    { status: 'pending', count: 45, icon: 'pendingIcon' }
  ]);

  const handleCard = async (title) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/status/${title}`);
  };

  const handleSafetyForm = () => {
    router.push('/home?id=safety-audit&orgId=1234&formType=safety');
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
          <h1 className={Styles.title}>Safety Audit Dashboard</h1>
          <Button
            variant='contained'
            className={Styles.addButton}
            startIcon={<AddIcon />}
            onClick={handleSafetyForm}
          >
            New Safety Audit
          </Button>
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

        <div className={Styles.chartContainer}>
          <h2 className={Styles.chartTitle}>Safety Incidents by Area</h2>
          <PieChart data={areaIncidents} />
        </div>
      </div>
    </div>
  );
};

export default SafetyDashboard;