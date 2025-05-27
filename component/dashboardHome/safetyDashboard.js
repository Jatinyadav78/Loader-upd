"use client";
import React, { useState } from 'react';
import Styles from './dashboardHome.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import Card from '../ui/card/card.js';
import Graph from '../ui/graph/graph.js';
import Request from '../request/request.js';
import { useRouter } from 'next/navigation';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PieChart } from 'react-minimal-pie-chart';
import RequestSkeleton from '../request/requestSkeleton';
import CardSkeleton from '../ui/card/cardSkeleton.js';
import NotFound from '../error/notFound.js';
import { getLocalStorage } from '../../helperFunction/localStorage.js';

const SafetyDashboard = () => {
  const router = useRouter();
  const user = getLocalStorage('user');
  
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
  ]);
   // Monthly Graph mock data
  const [monthlyStats, setMonthlyStats] = useState({
    USC: { open: 15, closed: 12, pending: 3 },
    USA: { open: 8, closed: 6, pending: 2 },
  });
  //Pie chart mock data

  const [areaIncidents, setAreaIncidents] = useState([
    { title: 'Area 1', value: 25, color: '#E91E63' },
    { title: 'Area 2', value: 15, color: '#FF9800' },
    { title: 'Area 3', value: 20, color: '#9C27B0' },
    { title: 'Area 4', value: 15, color: '#4CAF50' },
    { title: 'Area 5', value: 15, color: '#FF5722' },
    { title: 'Area 6', value: 10, color: '#009688' }
  ]);

  const [graphXdata, setGraphXdata] = useState(['USC', 'USA']);
  const [graphActive, setGraphActive] = useState([65, 45]);
  const [graphClosed, setGraphClosed] = useState([55, 35]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  
  const [cardObj, setCardObj] = useState([
    { status: 'request', count: 50 },
    { status: 'closed', count: 85 },
    { status: 'pending', count: 45 }
  ]);

  const handleAddImage = (permitNumber) => {
    router.push(`/image/${permitNumber}`);
  }

  const handleCard = async (title) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/status/${title}`);
  }

  const handleOnClick = (permitNumber, status) => {
    router.push(`/status/${status}/${permitNumber}`);
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSafetyForm = () => {
    window.open(
      'http://localhost:3000/home?id=682424d7412aa761f4cb8619&orgId=66007bc3c0171669e42e4546&till=2039-06-26T10:49:31.000Z',
      '_blank'
    );
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
              startIcon={<AddIcon />}
              onClick={handleSafetyForm}
            >
              Safety Form
            </Button>
          </div>
        </div>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="safety dashboard tabs">
                <Tab label="Overview" value="1" />
                <Tab label="Monthly Summary" value="2" />
                <Tab label="Recent Audits" value="3" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <div className={`${Styles.card} row-gap-3 mt-2`}>
                {loading ? cardObj.map((card, index) => (
                  <CardSkeleton key={index} />
                )) : cardObj.map((card, index) => (
                  <Card key={index} title={card.status} number={card.count} handleClick={handleCard} />
                ))}
              </div>
              <div className='row gap-5 mt-4 justify-content-center'>
                <div className={`${Styles.graph} ${Styles.border} col-lg-6`}>
                  <div className={Styles.graphTitle}>Safety Audits by Location</div>
                  <div>
                    <Graph activeYData={graphActive} closedYData={graphClosed} xdata={graphXdata} />
                  </div>
                </div>
                <div className={`${Styles.graph} ${Styles.border} col-lg-4`}>
                  <div className={Styles.graphTitle}>Incidents by Department</div>
                  <div style={{ 
                    padding: '20px',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PieChart
                      data={areaIncidents}
                      lineWidth={20}
                      paddingAngle={2}
                      label={({ dataEntry }) => `${dataEntry.title}`}
                      labelStyle={{
                        fontSize: '4px',
                        fill: '#333',
                        fontWeight: 'bold'
                      }}
                      labelPosition={75}
                      radius={42}
                      animate
                      animationDuration={500}
                      animationEasing="ease-out"
                    />
                    <div style={{ marginTop: '20px' }}>
                      {areaIncidents.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                          <div style={{ 
                            width: '12px', 
                            height: '12px', 
                            backgroundColor: item.color,
                            marginRight: '8px',
                            borderRadius: '2px'
                          }}></div>
                          <span style={{ fontSize: '12px' }}>{item.title} ({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            USC Statistics
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell align="center">Open</TableCell>
                          <TableCell align="center">Closed</TableCell>
                          <TableCell align="center">Pending</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Count</TableCell>
                          <TableCell align="center">{monthlyStats.USC.open}</TableCell>
                          <TableCell align="center">{monthlyStats.USC.closed}</TableCell>
                          <TableCell align="center">{monthlyStats.USC.pending}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="col-md-6 mb-4">
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            USA Statistics
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell align="center">Open</TableCell>
                          <TableCell align="center">Closed</TableCell>
                          <TableCell align="center">Pending</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Count</TableCell>
                          <TableCell align="center">{monthlyStats.USA.open}</TableCell>
                          <TableCell align="center">{monthlyStats.USA.closed}</TableCell>
                          <TableCell align="center">{monthlyStats.USA.pending}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="3">
              <div className={Styles.recentRequest}>
                <div className='w-100'>
                  <div className={Styles.recentReqTitle}>Recent Audits</div>
                  <div className={Styles.request}>
                    {loading ? <RequestSkeleton /> : 
                      requestData.length === 0 ? <NotFound /> : 
                      requestData.map((data, index) => (
                        <Request 
                          key={index} 
                          data={data} 
                          handleOnClick={handleOnClick} 
                          handleAddImage={handleAddImage} 
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default SafetyDashboard;
