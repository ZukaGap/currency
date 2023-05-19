import React, {useState, useEffect, useMemo} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {LineChart} from 'react-native-chart-kit';
import getSymbolFromCurrency from 'currency-symbol-map';
import {subMonths} from 'date-fns';

import {
  CurrenciesType,
  CurrencyDetails,
  fetchCurrencyDetails,
} from 'config/Axios/getAPI';

import getStyleObj from './style';
import {colors} from 'styles/colors';
import {sizes} from 'styles/sizes';
import {Back} from 'assets/SVG';

const width = Dimensions.get('window').width - 32;
const height = 200;

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

  const data = useMemo(() => {
    let dataArr = [];
    let dateArr = [];
    if (currencyData.length) {
      currencyData?.forEach(item => {
        dataArr.push(item?.currencies[0].rate);
        // dateArr.push(new Date(item?.date).getDate());
      });
    }
    return {
      // labels: dateArr,
      datasets: [
        {
          data: dataArr,
          color: (opacity = 1) => `rgba(223, 213, 235, ${opacity})`, // optional
          strokeWidth: 0, // optional
        },
      ],
    };
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

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <ScrollView>
        <View>
          <View style={styles.infoCard}>
            <Text style={styles.label}>სახელი</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.label}>კურსი</Text>
            <Text style={styles.value}>{changeValue}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.label}>ცვლილება</Text>
            <Text
              style={[
                styles.value,
                {
                  color: diff >= 0 ? colors.green : colors.red,
                },
              ]}>
              {diffFormated}
            </Text>
          </View>
          {!loading && (
            <LineChart
              data={data}
              width={width}
              height={height}
              chartConfig={{
                backgroundColor: colors.purple03,
                backgroundGradientFrom: colors.purple03,
                backgroundGradientTo: colors.purple03,
                color: (opacity = 1) => `rgba(239, 234, 245, ${opacity})`,
                propsForDots: {
                  r: '0',
                },
              }}
              bezier
              style={styles.chartST}
              yAxisLabel={getSymbolFromCurrency(code)}
              yAxisInterval={1} // optional, defaults to 1
              onDataPointClick={({value}) => console.log(value)}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
