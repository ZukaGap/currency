import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, useWindowDimensions, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GraphPoint, LineGraph} from 'react-native-graph';
import {CurrenciesType, fetchCurrencyDetails} from 'config/Axios/getAPI';
import {useNavigation, useRoute} from '@react-navigation/native';
import {format, subMonths, subWeeks} from 'date-fns';
import getSymbolFromCurrency from 'currency-symbol-map';

import TabSwitchButton from 'components/TabSwitchButton';
import List from './componentsChild/List';

import {colors} from 'styles/colors';
import {Back} from 'assets/SVG';
import {sizes} from 'styles/sizes';
import getStyleObj from './style';

const graphsData = [
  {
    label: '1W',
    value: 0,
  },
  {
    label: '1M',
    value: 1,
  },
  {
    label: '3M',
    value: 3,
  },
  {
    label: '6M',
    value: 6,
  },
  {
    label: '1Y',
    value: 12,
  },
];

export const DetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {params} = useRoute();
  const {width, height} = useWindowDimensions();
  const {setOptions, goBack} = useNavigation();
  const calcHeight = Math.min(width, height) / 2;
  const {code, rate, name, validFromDate}: CurrenciesType = params || {};
  const currencySymbol = useMemo(() => getSymbolFromCurrency(code), [code]);
  const [graphPoints, setGraphPoints] = useState<GraphPoint[]>([]);
  const [currentPoint, setCurrentPoint] = useState<GraphPoint>();

  const getPoints = useCallback(
    async (from: Date) => {
      try {
        const response = await fetchCurrencyDetails([code], from, new Date());

        const prices = response?.map(item => {
          return {
            value: item?.currencies?.[0]?.rate,
            date: new Date(item?.currencies[0].validFromDate),
          };
        });

        setGraphPoints(prices);
      } catch (err) {}
    },
    [code],
  );

  const priceTitle = useCallback(
    (resp?: GraphPoint): void => {
      setCurrentPoint({
        value: resp?.value || rate,
        date: resp?.date || new Date(validFromDate),
      });
    },
    [rate, validFromDate],
  );

  const changeTime = useCallback(
    item => {
      const from =
        item?.value === 0
          ? subWeeks(new Date(), 1)
          : subMonths(new Date(), item?.value);

      getPoints(from);
    },
    [getPoints],
  );

  useEffect(() => {
    getPoints(subWeeks(new Date(), 1));

    setOptions({
      title: name,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Back width={sizes.is} height={sizes.is} fill={colors.purple03} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.safeAreaWrapper}>
      <View style={styles.labelContainer}>
        <Text style={styles.valueLabel}>
          {currencySymbol} {currentPoint?.value}
        </Text>
        <Text style={styles.dateLabel}>
          {String(format(currentPoint?.date || 0, 'PP'))}
        </Text>
      </View>
      <LineGraph
        points={graphPoints}
        animated={true}
        color={colors.purple}
        enablePanGesture={true}
        panGestureDelay={50}
        style={styles.graph}
        // onGestureStart={() => hapticFeedback('impactLight')}
        onPointSelected={priceTitle}
        onGestureEnd={priceTitle}
      />
      <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
        <TabSwitchButton
          tabData={graphsData}
          onChange={(item, index) => {
            changeTime(item, index);
          }}
        />
      </View>
      <List />
    </View>
  );
};
