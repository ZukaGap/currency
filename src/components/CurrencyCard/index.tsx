/* eslint-disable react/react-in-jsx-scope */
import {Text, View} from 'react-native';

import getStyleObj from './style';
import flags from './flags';

interface Props {
  code: string;
  quantity: number;
  rate: number;
  diff: number;
}

function CurrencyCard({code, quantity, rate, diff}: Props) {
  const styles = getStyleObj();
  const diffColor = diff >= 0 ? 'red' : 'green';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flagContainer}>
        {/* <Text>X</Text> */}
        {/* <Svg width={20} height={15}>
          <Path d={flags["AED"]} />
        </Svg> */}
        {/*  <CountryFlag countryCode={code}  */}
        {flags(code)}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.rateText}>{`${quantity} ${code} = ${rate.toFixed(
          2,
        )} GEL`}</Text>
      </View>
      <View style={styles.diffContainer}>
        <Text style={{color: diffColor}}>{diff}</Text>
      </View>
    </View>
  );
}
export default CurrencyCard;
