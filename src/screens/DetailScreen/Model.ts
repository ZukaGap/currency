import type {SkPath} from '@shopify/react-native-skia';

import data from './data.json';
import {curveLines} from './Math';
import {colors} from 'styles/colors';
import {
  CurrenciesType,
  CurrencyDetails,
  fetchCurrencyDetails,
} from 'config/Axios/getAPI';
import {subMonths, subWeeks} from 'date-fns';

export const PADDING = 16;

export const COLORS = [
  colors.Green500,
  colors.Blue500,
  colors.Purple500,
  colors.Pink500,
];

interface Amount {
  amount: string;
  currency: string;
  scale: string;
}

interface PercentChange {
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}

interface LatestPrice {
  amount: Amount;
  timestamp: string;
  percent_change: PercentChange;
}

export type PriceList = [string, number, number][];

interface DataPoints {
  percent_change: number;
  prices: PriceList;
}

interface Prices {
  latest: string;
  latest_price: LatestPrice;
  hour: DataPoints;
  day: DataPoints;
  week: DataPoints;
  month: DataPoints;
  year: DataPoints;
  all: DataPoints;
}

const values = data.data.prices as Prices;
const POINTS = 20;

export const buildGraph = (
  datapoints: DataPoints,
  label: string,
  WIDTH: number,
  HEIGHT: number,
) => {
  const AJUSTED_SIZE = HEIGHT - PADDING * 2;
  const priceList = datapoints.prices.slice(0, POINTS);
  const formattedValues = priceList
    .map(
      price =>
        [parseFloat(price[0]), price[1], price[2]] as [number, number, number],
    )
    .reverse();
  const prices = formattedValues.map(value => value[0]);
  const dates = formattedValues.map(value => value[1]);
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const points = formattedValues.map(([price, date]) => {
    const x = ((date - minDate) / (maxDate - minDate)) * WIDTH;
    const y = ((price - minPrice) / (maxPrice - minPrice)) * AJUSTED_SIZE;
    return {x, y};
  });
  points.push({x: WIDTH + 10, y: points[points.length - 1].y});
  const path = curveLines(points, 0.1, 'complex');
  return {
    label,
    minPrice,
    maxPrice,
    percentChange: datapoints.percent_change,
    path,
  };
};

export type GraphDateRangeType = 0 | 1 | 3 | 6 | 12;
export type GraphRangeLabelType = '1W' | '1M' | '3M' | '6M' | '1Y';

export interface Graph {
  label: GraphRangeLabelType;
  value: GraphDateRangeType;
  data?: {
    label: string;
    minPrice: number;
    maxPrice: number;
    percentChange: number;
    path: SkPath;
  };
}

export type Graphs = Graph[];

export const getGraph = (
  code: string,
  value: number,
  width: number,
  height: number,
) => [
  {
    label: '1W',
    value: 0,
    data: buildGraph(values.week, 'Last Week', width, height),
  },
  {
    label: '1M',
    value: 1,
    data: buildGraph(values.month, 'Last Month', width, height),
  },
  {
    label: '3M',
    value: 3,
    data: buildGraph(values.month, 'Last Three Month', width, height),
  },
  {
    label: '6M',
    value: 6,
    data: buildGraph(values.year, 'Last Six Month', width, height),
  },
  {
    label: '1Y',
    value: 12,
    data: buildGraph(values.all, 'Last Year', width, height),
  },
];
