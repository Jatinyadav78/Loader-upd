import React, { useState } from 'react';
import Styles from './Card.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import requestIcon from '../../../public/request.svg';
import pendingIcon from '../../../public/pending.svg';
import approvedIcon from '../../../public/approved.svg';

const Card = ({ title, number, handleClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const getCardConfig = (title) => {
        switch(title) {
            case 'open':
                return {
                    icon: requestIcon,
                    background: '#FF6F061A',
                    color: '#FF6F06'
                };
            case 'captured':
                return {
                    icon: approvedIcon,
                    background: '#16B9611A',
                    color: '#16B961'
                };
            case 'pending':
                return {
                    icon: pendingIcon,
                    background: '#0073FF33',
                    color: '#0073FF'
                };
            default:
                return {
                    icon: requestIcon,
                    background: '#0073FF33',
                    color: '#0073FF'
                };
        }
    };

    const config = getCardConfig(title);

    const handleCardClick = async () => {
        setIsLoading(true);
        await handleClick(title);
    };

    return (
        <div 
            className={Styles.cardContainer} 
            style={{ background: config.background }}
            onClick={handleCardClick}
        >
            <div className={Styles.cardContent}>
                <div className={Styles.iconWrapper}>
                    {isLoading ? (
                        <CircularProgress size={40} style={{ color: config.color }} />
                    ) : (
                        <div className={Styles.iconContainer}>
                            <Image
                                priority
                                src={config.icon}
                                width={40}
                                height={40}
                                alt={title}
                            />
                        </div>
                    )}
                </div>
                <div className={Styles.infoContainer}>
                    <h3 className={Styles.title} style={{ color: config.color }}>
                        {title}
                    </h3>
                    <div className={Styles.numberContainer}>
                        <span className={Styles.number} style={{ color: config.color }}>
                            {number}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;