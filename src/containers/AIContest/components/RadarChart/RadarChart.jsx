import { Box } from '@tonic-ui/react';
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const generateRandomNumber = (min, max, limit) => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  while (num > limit) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
};

const RadarChart = (talents) => {
  const chartRef = useRef(null);
  console.log('talents=', talents.talents, talents.talents[0]);
  useEffect(() => {
    const chart = echarts.init(chartRef.current, 'dark', {
      renderer: 'canvas',
      useDirtyRect: false,
    });

    const indicators = talents.talents.map((talent) => ({
      name: talent,
      max: generateRandomNumber(10000, 50000),
    }));
    const values = indicators.map((indicator) => generateRandomNumber(5000, 30000, indicator.max));

    const option = {
      backgroundColor: '#151515',
      radar: {
        indicator: indicators,
        axisLabel: {
          interval: 0,
        },
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: values,
              name: 'Allocated Budget',
            },
          ],
        },
      ],
    };

    option && chart.setOption(option);
  }, []);
  return <Box ref={chartRef} w={500} h={400}></Box>;
};

export default RadarChart;
