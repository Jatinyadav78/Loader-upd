import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MonthlySummary = ({ monthlyStats }) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="center">Captured</TableCell>
            <TableCell align="center">Closed</TableCell>
            <TableCell align="center">Pending</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(monthlyStats).map(([location, stats]) => (
            <TableRow key={location}>
              <TableCell>{location}</TableCell>
              <TableCell align="center">{stats.captured}</TableCell>
              <TableCell align="center">{stats.closed}</TableCell>
              <TableCell align="center">{stats.pending}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonthlySummary;