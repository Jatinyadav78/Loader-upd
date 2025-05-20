import React from 'react';
import dynamic from 'next/dynamic';
import Styles from './Graph.module.css';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const Graph = ({ xdata, activeYData, closedYData }) => {
    const options = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#FF6F06', '#16B961'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            borderColor: '#f1f1f1',
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            }
        },
        xaxis: {
            categories: xdata || ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return Math.round(val);
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        tooltip: {
            theme: 'dark'
        }
    };

    const series = [
        {
            name: 'Active',
            data: activeYData || [30, 40, 35, 50, 49]
        },
        {
            name: 'Closed',
            data: closedYData || [20, 35, 25, 45, 30]
        }
    ];

    return (
        <div className={Styles.graphContainer}>
            <ApexCharts
                options={options}
                series={series}
                type="area"
                height={350}
            />
        </div>
    );
};

export default Graph;