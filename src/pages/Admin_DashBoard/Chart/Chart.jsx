import React from 'react'

import { Doughnut, Line } from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';

import { getLastSevenDaysData } from '../../../library/Features/Features';
import { charColor2, chartColor, orange } from '../../../constants/colors';




ChartJS.register(Tooltip, CategoryScale, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend)


const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
};

// labels form the FEATURES
const labels = getLastSevenDaysData();

const LineChart = ({ dataArray = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                // data: [1, 60, 11, 18, 3, 102],
                data: dataArray,
                label: "Messages",
                fill: true,
                backgroundColor: charColor2,
                borderColor: chartColor,
            },
        ],
    }


    return (
        <Line data={data} options={lineChartOptions} />
    );
}








const doughutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 104
}

const DoughnutChart = ({ value = [], labels = [] }) => {


    const data = {
        labels,
        datasets: [
            {
                data: value,
                // label: "Total Chats vs Group Chats",
                backgroundColor: [charColor2, orange],
                borderColor: [chartColor, orange],
                offset: 20,
            },
        ],
    }


    return (
        <Doughnut data={data} options={doughutChartOptions} style={{zIndex:10}}/>
    )
}

export { LineChart, DoughnutChart }
