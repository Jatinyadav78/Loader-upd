import React from 'react';
import Styles from './request.module.css';
import CustomButton from '../ui/statusButton/button.js';
import { formatDate } from '../../helperFunction/dateTimeFormat.js';
import { Button } from '@mui/material';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

const Request = ({ data, handleOnClick, handleAddImage }) => {
  const date = formatDate(data?.createdAt, true)

  return (
    <div>
      <div className={Styles.requestContainer} onClick={() => { handleOnClick(data?.permitNumber, data?.status) }}>
        <div className={Styles.details}>
          <div className={Styles.name}>
            <div className={Styles.permitInfo}>
              <div>
                <span className={Styles.permitType}>{data?.formDetail?.formName}</span>
                <div className={Styles.permitId}>Permit No: {data?.permitNumber}</div>
              </div>
              <span className={Styles.personName}>({data?.vendorDetail?.name})</span>
            </div>
          </div>
          <div className={Styles.otherDetails}>
            <p className={Styles.timestamp}>{date}</p>
            {data?.personName && <p>{`${data?.personName}(${data?.PersonDesignation})`}</p>}
            
            {data?.remark && <p className={Styles.remark}>{data?.remark}</p>}
            
          </div>
        </div>
        {data?.extension?.status === 'pending' && !(data?.status === 'closed') && 
          <div className={Styles.extAlert}>
            <WatchLaterOutlinedIcon fontSize='small'/> 
            <span>Extension</span>
          </div>
        }
        <div className={Styles.pendingContainer}>
          <CustomButton status={data?.status} />
        </div>
      </div>
      <div style={{ width: '100%' }}>
        {data?.state === 'approved' && 
          <Button
            className={Styles.requestContainer}
            style={{ marginBottom: '10px', minWidth: '20px', minHeight: '10px' }}
            variant='outlined'
            endIcon={<CameraAltTwoToneIcon />}
            onClick={() => handleAddImage(data?.permitNumber)}
          >
            Add Image
          </Button>
        }
      </div>
    </div>
  )
}

export default Request