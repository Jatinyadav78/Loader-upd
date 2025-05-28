"use client";
import React, { useState, useEffect } from 'react';
import Styles from './dashboardHome.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import Card from '../ui/card/card.js';
import SafetyGraph from '../ui/graph/safetyGraph.js';
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

  // Add state for safety condition data
  const [safetyCondition, setSafetyCondition] = useState(null);

  // Fetch safety condition data on mount
  useEffect(() => {
    const fetchSafetyCondition = async () => {
      try {
        const token = getLocalStorage('token')?.access?.token;
        const orgId = user?.organizationId;
        const res = await fetch(
          `http://192.1.81.40:3002/wpt/v1/safety/safety-condition?orgId=${orgId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const data = await res.json();
        setSafetyCondition(data);
      } catch (error) {
        console.error('Error fetching safety condition:', error);
      }
    };

    fetchSafetyCondition();
  }, []);

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
  const [areaIncidents, setAreaIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [graphXdata, setGraphXdata] = useState(['USC', 'USA']);
  const [graphWorkers, setGraphWorkers] = useState([0, 0]);
  const [graphStaff, setGraphStaff] = useState([0, 0]);
  const [tabValue, setTabValue] = useState('1');
  
  const [cardObj, setCardObj] = useState([
    { status: 'request', count: 50 },
    { status: 'closed', count: 85 },
    { status: 'pending', count: 45 }
  ]);

  // Add useEffect to process API data for areas
  useEffect(() => {
    const fetchSafetyData = async () => {
      try {
        const token = getLocalStorage('token')?.access?.token;
        const orgId = user?.organizationId;
        const res = await fetch(
          `http://192.1.81.40:3002/wpt/v1/safety/safety-condition?orgId=${orgId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const data = await res.json();
        
        // Process area data for pie chart
        const areaCount = data.reduce((acc, item) => {
          if (item.area) {
            acc[item.area] = (acc[item.area] || 0) + 1;
          }
          return acc;
        }, {});

        // Calculate percentages and create pie chart data
        const total = Object.values(areaCount).reduce((sum, count) => sum + count, 0);
        const colors = ['#E91E63', '#FF9800', '#9C27B0', '#4CAF50', '#FF5722', '#009688'];
        
        const pieData = Object.entries(areaCount).map(([area, count], index) => ({
          title: area,
          value: Math.round((count / total) * 100),
          color: colors[index % colors.length]
        }));

        setAreaIncidents(pieData);
        
        // Process worker/staff data
        const uscWorkers = data.filter(item => item.formType === 'USC' && item.worker).length;
        const uscStaff = data.filter(item => item.formType === 'USC' && item.staff).length;
        const usaWorkers = data.filter(item => item.formType === 'USA' && item.worker).length;
        const usaStaff = data.filter(item => item.formType === 'USA' && item.staff).length;
        
        setGraphWorkers([uscWorkers, usaWorkers]);
        setGraphStaff([uscStaff, usaStaff]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching safety data:', error);
        setLoading(false);
      }
    };

    fetchSafetyData();
  }, []);

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
   
  //  function to open safety audit form in new tab
  const handleSafetyForm = () => {
    // Get organization ID from user data
    const orgId = user?.organizationId; 
    const safetyFormId = '682424d7412aa761f4cb8619';
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    const url = `${window.location.origin}/home?id=${safetyFormId}&orgId=${orgId}&till=${expiryDate.toISOString()}`;
    
    
    window.open(url, '_blank');
  };

  return (
    <div className={Styles.dashboardContainer}>
      {/* You can use safetyCondition here, for example: */}
      {/* {safetyCondition && (
        <div className={Styles.safetyConditionBox}>
          <h4>Safety Condition</h4>
          <pre>{JSON.stringify(safetyCondition, null, 2)}</pre>
        </div>
      )} */}
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
                  <div className={Styles.graphTitle}>USC and USA Safety Audits</div>
                  <div>
                    <SafetyGraph 
                      workerData={graphWorkers} 
                      staffData={graphStaff} 
                      xdata={graphXdata}
                      legendLabels={['Workers', 'Staff']} 
                    />
                  </div>
                </div>
                <div className={`${Styles.graph} ${Styles.border} col-lg-4`}>
                  <div className={Styles.graphTitle}>Major Areas of Incidents</div>
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







