


'use client'
import React, { useState } from 'react';
import Styles from './dashboardHome.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import Card from '../ui/card/card.js';
import Graph from '../ui/graph/graph.js';
import Request from '../request/request.js';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { getLocalStorage } from '../../helperFunction/localStorage';
import RequestSkeleton from '../request/requestSkeleton';
import CardSkeleton from '../ui/card/cardSkeleton.js';
import NotFound from '../error/notFound.js';

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
  ])
  const [graphXdata, setGraphXdata] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
  const [graphActive, setGraphActive] = useState([10, 8, 12, 7, 9])
  const [graphClosed, setGraphClosed] = useState([8, 7, 10, 6, 8])
  const [loading, setLoading] = useState(false)
  const [cardObj, setCardObj] = useState([
    { status: 'request', count: 45 },
    { status: 'pending', count: 12 },
    { status: 'approved', count: 25 },
    { status: 'rejected', count: 3 },
    { status: 'closed', count: 5 },
  ])

  const handleAddImage = (permitNumber) => {
    router.push(`/image/${permitNumber}`)
  }

  const handleCard = async (title) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/status/${title}`);
  }

  const handleOnClick = (permitNumber, status) => {
    router.push(`/status/${status}/${permitNumber}`)
  }

  // Function to open FIR form in new tab
  const handleFirForm = () => {
    // Get organization ID from user data
    const orgId = user?.organizationId;
    
    // FIR form ID - replace with actual form ID
    const firFormId = '682424d7412aa761f4cb8620'; // Example ID
    
    // Calculate expiry date (e.g., 6 months from now)
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    
    // Construct URL with parameters
    const url = `${window.location.origin}/home?id=${firFormId}&orgId=${orgId}&till=${expiryDate.toISOString()}`;
    
    // Open in new tab
    window.open(url, '_blank');
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
          <div className={Styles.title}></div>
          <div className='d-flex'>
            <Button
              variant='contained'
              style={{ backgroundColor: '#0073FF' }}
              onClick={handleFirForm}
            >
              FIR Form
            </Button>
          </div>
        </div>
        <div className={`${Styles.card} row-gap-3 mt-2`}>
          {loading ? cardObj.map((card, index) => (<CardSkeleton key={index} />)) : cardObj.map((card, index) => {
            return <Card key={index} title={card.status} number={card.count} handleClick={handleCard} />
          })}
        </div>
        <div className='row gap-5 mt-4 justify-content-center'>
          <div className={`${Styles.graph} ${Styles.border} col-lg-6`}>
            <div className={Styles.graphTitle}>Fire Incident Reports</div>
            <div>
              <Graph activeYData={graphActive} closedYData={graphClosed} xdata={graphXdata} />
            </div>
          </div>
          <div className={`${Styles.recentRequest} ${Styles.border} col-lg-5`}>
            <div className='w-100'>
              <div className={Styles.recentReqTitle}>Recent Reports</div>
              <div className={Styles.request}>
                {loading ? <RequestSkeleton /> : requestData.length === 0 ? <NotFound /> : requestData.map((data, index) => (<Request key={index} data={data} handleOnClick={handleOnClick} handleAddImage={handleAddImage} />))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirDashboard