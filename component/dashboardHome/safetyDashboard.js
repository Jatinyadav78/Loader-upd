'use client'
import React, { useEffect, useState } from 'react';
import Styles from './dashboardHome.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import Card from '../ui/card/card.js';
import Graph from '../ui/graph/graph.js';
import Request from '../request/request.js';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import IconButton from "@mui/material/IconButton";
import { getLocalStorage } from '../../helperFunction/localStorage.js';
import RequestSkeleton from '../request/requestSkeleton';
import CardSkeleton from '../ui/card/cardSkeleton.js';
import NotFound from '../error/notFound.js';

const SafetyDashboard = () => {
  const router = useRouter();
  const user = getLocalStorage('user');
  const isAdmin = user?.role === 'admin';
  
  const [requestData, setRequestData] = useState([
    {
      permitNumber: "SA123456",
      vendorDetail: {
        name: "Safety Audit Team A",
        email: "team.a@safety.com"
      },
      createdAt: "2024-01-15T10:30:00Z",
      status: "pending",
      formDetail: {
        formName: "Monthly Safety Audit",
      }
    },
    {
      permitNumber: "SA123457",
      vendorDetail: {
        name: "Safety Audit Team B",
        email: "team.b@safety.com"
      },
      createdAt: "2024-01-14T09:15:00Z",
      status: "approved",
      formDetail: {
        formName: "Equipment Safety Check",
      }
    }
  ])
  const [graphXdata, setGraphXdata] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
  const [graphActive, setGraphActive] = useState([65, 75, 80, 70, 85])
  const [graphClosed, setGraphClosed] = useState([60, 70, 75, 65, 80])
  const [loading, setLoading] = useState(false)
  const [cardObj, setCardObj] = useState([
    { status: 'request', count: 150 },
    { status: 'pending', count: 45 },
    { status: 'approved', count: 85 },
    { status: 'rejected', count: 10 },
    { status: 'closed', count: 10 },
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
            <div style={{ color: 'black', marginRight: '10px' }}>
              <IconButton aria-label="qrScanner" style={{color:'black',position:'relative', bottom:'8px'}} onClick={()=> router.push('/scanner')}>
                <QrCodeScannerIcon fontSize='large'/>
              </IconButton>
            </div>
          </div>
        </div>
        <div className={`${Styles.card} row-gap-3 mt-2`}>
          {loading ? cardObj.map((card, index) => (<CardSkeleton key={index} />)) : cardObj.map((card, index) => {
            return <Card key={index} title={card.status} number={card.count} handleClick={handleCard} />
          })}
        </div>
        <div className='row gap-5 mt-4 justify-content-center'>
          <div className={`${Styles.graph} ${Styles.border} col-lg-6`}>
            <div className={Styles.graphTitle}>Safety Audit Reports</div>
            <div>
              <Graph activeYData={graphActive} closedYData={graphClosed} xdata={graphXdata} />
            </div>
          </div>
          <div className={`${Styles.recentRequest} ${Styles.border} col-lg-5`}>
            <div className='w-100'>
              <div className={Styles.recentReqTitle}>Recent Audits</div>
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

export default SafetyDashboard