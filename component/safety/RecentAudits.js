import React from 'react';
import Request from '../../request/request.js';
import RequestSkeleton from '../../request/requestSkeleton';
import NotFound from '../../error/notFound.js';

const RecentAudits = ({ loading, requestData, handleOnClick, handleAddImage, Styles }) => {
  return (
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
  );
};

export default RecentAudits;