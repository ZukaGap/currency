import React, {useState, useEffect, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import getSymbolFromCurrency from 'currency-symbol-map';
import {max, min, subMonths} from 'date-fns';
import {GraphPoint, LineGraph, SelectionDot} from 'react-native-graph';
import {GraphRange} from 'react-native-graph/lib/typescript/LineGraphProps';

import {
  CurrenciesType,
  CurrencyDetails,
  fetchCurrencyDetails,
} from 'config/Axios/getAPI';

import getStyleObj from './style';
import {colors} from 'styles/colors';
import {sizes} from 'styles/sizes';
import {Back} from 'assets/SVG';

const GRADIENT_FILL_COLORS = ['#7476df5D', '#7476df4D', '#7476df00'];

const DetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const styles = getStyleObj(insets);
  const {setOptions, goBack} = useNavigation();
  const {params} = useRoute();
  const {
    code,
    quantity,
    rateFormated,
    diffFormated,
    rate,
    name,
    diff,
    date,
    validFromDate,
  }: CurrenciesType = params || {};
  const [currencyData, setCurrencyData] = useState<CurrencyDetails[]>({
    date: null,
    currencies: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const changeValue = useMemo(
    () =>
      `${quantity} ${getSymbolFromCurrency(
        code,
      )} - ${rate} ${getSymbolFromCurrency('GEL')}`,
    [quantity, rate, code],
  );
  const [currencyMaxValue, setCurrencyMaxValue] = useState<number>(0);
  const [currencyMinValue, setCurrencyMinValue] = useState<number>(0);

  const points = useMemo<GraphPoint[]>(() => {
    let dataArr: GraphPoint[] = [];

    if (currencyData?.length) {
      currencyData?.forEach(item => {
        dataArr.push({
          date: new Date(item?.currencies[0].validFromDate),
          value: item?.currencies[0].rate,
        });
      });
    }
    return dataArr;
  }, [currencyData]);

  useEffect(() => {
    setOptions({
      title: code,
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

  useEffect(() => {
    setLoading(true);

    fetchCurrencyDetails(
      [code],
      subMonths(new Date(), 1),
      new Date(),
      response => {
        setCurrencyData(response);
        setLoading(false);
      },
    );
  }, [code]);

  const range: GraphRange | undefined = useMemo(() => {
    let timeArr: Date[] = [];
    let minValue = points?.[0]?.value;
    let maxValue = points?.[0]?.value;
    points?.forEach(item => {
      timeArr.push(item?.date);
      if (item?.value < minValue) {
        minValue = item?.value;
      }
      if (item?.value > maxValue) {
        maxValue = item?.value;
      }
    });

    console.log(timeArr);

    if (!timeArr?.length) return undefined;

    setCurrencyMaxValue(maxValue);
    setCurrencyMinValue(minValue);

    return {
      x: {
        min: min(timeArr),
        max: max(timeArr),
      },
      y: {
        min: minValue,
        max: maxValue,
      },
    };
  }, [points]);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View>
        <View style={styles.rate}>
          <Text style={styles.rateValue}>
            {getSymbolFromCurrency(code)} {rate}
          </Text>
          <Text style={styles.rateDifference}>
            {diff >= 0 ? '+' : '-'} {diffFormated}
          </Text>
        </View>
        <LineGraph
          points={points}
          color={colors.purple}
          style={styles.graph}
          // gradientFillColors={GRADIENT_FILL_COLORS}
          enablePanGesture={true}
          // enableFadeInMask={true}
          SelectionDot={SelectionDot}
          // enableIndicator={true}
          horizontalPadding={sizes.lxx}
          verticalPadding={sizes.lxx}
          // indicatorPulsating={true}
          animated={true}
          panGestureDelay={300}
          // onGestureStart={() => hapticFeedback('impactLight')}
          onPointSelected={p => console.log(p)}
          // onGestureEnd={() => resetPriceTitle()}
          // range={range}
          // TopAxisLabel={() => (
          //   <View>
          //     <Text>{currencyMaxValue}</Text>
          //   </View>
          // )}
          // BottomAxisLabel={() => (
          //   <View>
          //     <Text>{currencyMinValue}</Text>
          //   </View>
          // )}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
