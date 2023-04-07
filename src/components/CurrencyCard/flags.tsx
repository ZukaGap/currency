/* eslint-disable react/react-in-jsx-scope */
import * as CountryFlag from '../../assets/CountrySVG';

function flags(code: string) {
  switch (code) {
    case 'AED':
      return <CountryFlag.AED />;
    case 'AMD':
      return <CountryFlag.AMD />;
    default:
      return <CountryFlag.AED />;
  }
}

export default flags;
