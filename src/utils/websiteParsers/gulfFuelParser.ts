import DOMParser from 'react-native-html-parser';

import {FuelInfoType, fetchGulfFuelInfo} from 'config/Axios/getAPI';

async function getGulfInfo(): Promise<FuelInfoType[] | []> {
  try {
    const html = await fetchGulfFuelInfo();
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');
    const regexPattern = /<[^>]+>([^<]+)<\/[^>]+>/g;

    const fuelNameInfo: string[] = parsed
      .getElementsByAttribute('class', 'product_name')
      .toString()
      .match(regexPattern)
      .map(match => {
        const content = /<[^>]+>([^<]+)<\/[^>]+>/g.exec(match);
        return content && content[1].trim();
      });

    const fuelPriceInfo: string[] = parsed
      .getElementsByAttribute('class', 'product_price')
      .toString()
      .match(regexPattern)
      .map(match => {
        const content = /<[^>]+>([^<]+)<\/[^>]+>/g.exec(match);
        return content && content[1].trim();
      });

    let parsedFuelArr: FuelInfoType[] = [];

    const fuelInfoLength =
      fuelNameInfo?.length > fuelPriceInfo?.length
        ? fuelNameInfo?.length
        : fuelPriceInfo.length;

    for (let i = 0; i < fuelInfoLength; i++) {
      parsedFuelArr[i] = {
        id: 'Gulf-' + fuelNameInfo?.[i] + fuelPriceInfo?.[i],
        code: '',
        name: fuelNameInfo?.[i],
        price: fuelPriceInfo?.[i],
        company: 'Gulf',
      };
    }

    return parsedFuelArr;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getGulfInfo;
