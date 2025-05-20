import React from 'react';
import dynamic from 'next/dynamic';
import Styles from './PieChart.module.css';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ data }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        colors: ['#0073FF', '#16B961', '#FF6F06', '#FF0E56'],
        labels: data.map(item => item.title),
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 12,
                height: 12,
                radius: 6,
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Incidents',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#373d3f'
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return Math.round(val) + '%';
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
            },
            dropShadow: {
                enabled: false
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function(value) {
                    return value + ' incidents';
                }
            }
        },
        stroke: {
            width: 0
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const series = data.map(item => item.value);

    return (
        <div className={Styles.pieChartContainer}>
            <ApexCharts
                options={options}
                series={series}
                type="donut"
                height={400}
            />
        </div>
    );
};

export default PieChart;