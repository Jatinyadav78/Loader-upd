import React from 'react';
import Card from '../../ui/card/card.js';
import Graph from '../../ui/graph/graph.js';
import CardSkeleton from '../../ui/card/cardSkeleton.js';
import { PieChart } from 'react-minimal-pie-chart';

const Overview = ({ loading, cardObj, graphActive, graphClosed, graphXdata, areaIncidents, handleCard, Styles }) => {
  return (
    <>
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
    </>
  );
};

export default Overview;