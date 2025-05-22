// 'use client'
// import React, { useEffect, useState } from 'react';
// import Styles from './dashboardHome.module.css';
// import Image from 'next/image';
// import DashboardDesign from '../../public/dashboardDesign.svg';
// import Card from '../ui/card/card.js';
// import Graph from '../ui/graph/graph.js';
// import Request from '../request/request.js';
// import { useRouter } from 'next/navigation';
// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from "@mui/material/IconButton";
// import { getLocalStorage } from '../../helperFunction/localStorage.js';
// import RequestSkeleton from '../request/requestSkeleton';
// import CardSkeleton from '../ui/card/cardSkeleton.js';
// import NotFound from '../error/notFound.js';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import { TabContext, TabList, TabPanel } from '@mui/lab';
// import { PieChart } from 'react-minimal-pie-chart';

// const SafetyDashboard = () => {
//   const router = useRouter();
//   const user = getLocalStorage('user');
//   const isAdmin = user?.role === 'admin';
  
//   // Mock data 
//   const [requestData, setRequestData] = useState([
//     {
//       permitNumber: "SA123456",
//       vendorDetail: {
//         name: "Safety Audit Team A",
//         email: "team.a@safety.com"
//       },
//       createdAt: "2024-01-15T10:30:00Z",
//       status: "pending",
//       formDetail: {
//         formName: "Monthly Safety Audit",
//       }
//     },
//     {
//       permitNumber: "SA123457", 
//       vendorDetail: {
//         name: "Safety Audit Team B",
//         email: "team.b@safety.com"
//       },
//       createdAt: "2024-01-14T09:15:00Z",
//       status: "approved",
//       formDetail: {
//         formName: "Equipment Safety Check",
//       }
//     }
//   ]);
 
//   const [monthlyStats, setMonthlyStats] = useState({
//     USC: { captured: 15, closed: 12, pending: 3 },
//     USA: { captured: 8, closed: 6, pending: 2 },
//     total: { captured: 28, closed: 22, pending: 6 }
//   });

//   const [areaIncidents, setAreaIncidents] = useState([
//     { title: 'Area 1', value: 35, color: '#0073FF' },
//     { title: 'Area 2', value: 25, color: '#16B961' },
//     { title: 'Area 3', value: 20, color: '#FF6F06' },
//     { title: 'Area 4', value: 20, color: '#FF0E56' }
//   ]);

//   const [graphXdata, setGraphXdata] = useState(['Captured', 'Closed', 'Pending']);
//   const [graphActive, setGraphActive] = useState([65, 75, 80]);
//   const [graphClosed, setGraphClosed] = useState([60, 70, 75]);
//   const [loading, setLoading] = useState(false);
//   const [tabValue, setTabValue] = useState('1');
  
//   const [cardObj, setCardObj] = useState([
//     { status: 'open', count: 150, icon: 'openIcon' },
//     { status: 'captured', count: 85, icon: 'capturedIcon' },
//     { status: 'pending', count: 45, icon: 'pendingIcon' }
//   ]);

//   const handleAddImage = (permitNumber) => {
//     router.push(`/image/${permitNumber}`);
//   }

//   const handleCard = async (title) => {
//     await new Promise(resolve => setTimeout(resolve, 500));
//     router.push(`/status/${title}`);
//   }

//   const handleOnClick = (permitNumber, status) => {
//     router.push(`/status/${status}/${permitNumber}`);
//   }

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleSafetyForm = () => {
//     // Navigate to safety form
//     router.push('/home?id=safety-audit&orgId=1234');
//   };
       
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
       
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className={Styles.dashboardContainer}>
//       <Image
//         className={Styles.dashboardImage}
//         priority
//         src={DashboardDesign}
//         alt="submitted"
//       />
//       <div className={Styles.main}>
//         <div className={Styles.header}>
//           <div className={Styles.title}></div>
//           <div className='d-flex'>
//             <Button
//               variant='contained'
//               style={{ backgroundColor: '#0073FF' }}
//               startIcon={<AddIcon />}
//               onClick={handleSafetyForm}
//             >
//               Safety Form
//             </Button>
//           </div>
//         </div>

//         <Box sx={{ width: '100%', typography: 'body1' }}>
//           <TabContext value={tabValue}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//               <TabList onChange={handleTabChange} aria-label="safety dashboard tabs">
//                 <Tab label="Overview" value="1" />
//                 <Tab label="Monthly Summary" value="2" />
//                 <Tab label="Recent Audits" value="3" />
//               </TabList>
//             </Box>

//             <TabPanel value="1">
//               <div className={`${Styles.card} row-gap-3 mt-2`}>
//                 {loading ? cardObj.map((card, index) => (
//                   <CardSkeleton key={index} />
//                 )) : cardObj.map((card, index) => (
//                   <Card key={index} title={card.status} number={card.count} handleClick={handleCard} />
//                 ))}
//               </div>
//               <div className='row gap-5 mt-4 justify-content-center'>
//                 <div className={`${Styles.graph} ${Styles.border} col-lg-6`}>
//                   <div className={Styles.graphTitle}>Monthly Incident Reports</div>
//                   <div>
//                     <Graph activeYData={graphActive} closedYData={graphClosed} xdata={graphXdata} />
//                   </div>
//                 </div>
//                 <div className={`${Styles.graph} ${Styles.border} col-lg-4`}>
//                   <div className={Styles.graphTitle}>Incidents by Area</div>
//                   <div style={{ padding: '20px' }}>
//                     <PieChart
//                       data={areaIncidents}
//                       lineWidth={20}
//                       paddingAngle={2}
//                       label={({ dataEntry }) => `${dataEntry.title} (${Math.round(dataEntry.percentage)}%)`}
//                       labelStyle={{ fontSize: '5px' }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </TabPanel>

//             <TabPanel value="2">
//               <TableContainer component={Paper} sx={{ mb: 4 }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Location</TableCell>
//                       <TableCell align="center">Captured</TableCell>
//                       <TableCell align="center">Closed</TableCell>
//                       <TableCell align="center">Pending</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {Object.entries(monthlyStats).map(([location, stats]) => (
//                       <TableRow key={location}>
//                         <TableCell>{location}</TableCell>
//                         <TableCell align="center">{stats.captured}</TableCell>
//                         <TableCell align="center">{stats.closed}</TableCell>
//                         <TableCell align="center">{stats.pending}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </TabPanel>

//             <TabPanel value="3">
//               <div className={Styles.recentRequest}>
//                 <div className='w-100'>
//                   <div className={Styles.recentReqTitle}>Recent Audits</div>
//                   <div className={Styles.request}>
//                     {loading ? <RequestSkeleton /> : 
//                       requestData.length === 0 ? <NotFound /> : 
//                       requestData.map((data, index) => (
//                         <Request 
//                           key={index} 
//                           data={data} 
//                           handleOnClick={handleOnClick} 
//                           handleAddImage={handleAddImage} 
//                         />
//                       ))
//                     }
//                   </div>
//                 </div>
//               </div>
//             </TabPanel>
//           </TabContext>
//         </Box>
//       </div>
//     </div>
//   );
// }

// export default SafetyDashboard;







'use client'
import React, { useEffect, useState } from 'react';
import Styles from './dashboardHome.module.css';
import Image from 'next/image';
import DashboardDesign from '../../public/dashboardDesign.svg';
import Card from '../ui/card/card.js';
import Graph from '../ui/graph/graph.js';
import Request from '../request/request.js';
import { useRouter } from 'next/navigation';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import { getLocalStorage } from '../../helperFunction/localStorage.js';
import RequestSkeleton from '../request/requestSkeleton';
import CardSkeleton from '../ui/card/cardSkeleton.js';
import NotFound from '../error/notFound.js';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PieChart } from 'react-minimal-pie-chart';

const SafetyDashboard = () => {
  const router = useRouter();
  const user = getLocalStorage('user');
  const isAdmin = user?.role === 'admin';
  
  // Mock data 
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
 
  const [monthlyStats, setMonthlyStats] = useState({
    USC: { captured: 15, closed: 12, pending: 3 },
    USA: { captured: 8, closed: 6, pending: 2 },
    total: { captured: 28, closed: 22, pending: 6 }
  });

  const [areaIncidents, setAreaIncidents] = useState([
    { title: 'Area 1', value: 35, color: '#0073FF' },
    { title: 'Area 2', value: 25, color: '#16B961' },
    { title: 'Area 3', value: 20, color: '#FF6F06' },
    { title: 'Area 4', value: 20, color: '#FF0E56' }
  ]);

  const [graphXdata, setGraphXdata] = useState(['Open', 'Closed', 'Pending']);
  const [graphActive, setGraphActive] = useState([65, 75, 80]);
  const [graphClosed, setGraphClosed] = useState([60, 70, 75]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  
  const [cardObj, setCardObj] = useState([
    { status: 'open', count: 150, icon: 'openIcon' },
    { status: 'Closed', count: 85, icon: 'ClosedIcon' },
    { status: 'pending', count: 45, icon: 'pendingIcon' }
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

  // Handle safety form button click 
  const handleSafetyForm = () => {
    
    const formConfig = {
      id: '682424d7412aa761f4cb8619',
      orgId: '66007bc3c0171669e42e4546',
      till: '2039-06-21T06:26:55.000Z'
    };

    const formUrl = `http://localhost:3000/home?id=${formConfig.id}&orgId=${formConfig.orgId}&till=${formConfig.till}`;
    
    window.open(formUrl, '_blank');
  };
       
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
       
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
                  <div className={Styles.graphTitle}>Monthly Incident Reports</div>
                  <div>
                    <Graph activeYData={graphActive} closedYData={graphClosed} xdata={graphXdata} />
                  </div>
                </div>
                <div className={`${Styles.graph} ${Styles.border} col-lg-4`}>
                  <div className={Styles.graphTitle}>Incidents by Area</div>
                  <div style={{ padding: '20px' }}>
                    <PieChart
                      data={areaIncidents}
                      lineWidth={20}
                      paddingAngle={2}
                      label={({ dataEntry }) => `${dataEntry.title} (${Math.round(dataEntry.percentage)}%)`}
                      labelStyle={{ fontSize: '5px' }}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell align="center">Open</TableCell>
                      <TableCell align="center">Closed</TableCell>
                      <TableCell align="center">Pending</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(monthlyStats).map(([location, stats]) => (
                      <TableRow key={location}>
                        <TableCell>{location}</TableCell>
                        <TableCell align="center">{stats.Open}</TableCell>
                        <TableCell align="center">{stats.closed}</TableCell>
                        <TableCell align="center">{stats.pending}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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




