import DOMParser from 'react-native-html-parser';

import {FuelInfoType, fetchRompetrolFuelInfo} from 'config/Axios/getAPI';

function isNumber(value: string): boolean {
  const numberRegex = /^-?\d*\.?\d+$/;
  return numberRegex.test(value);
}

async function getRompetrolInfo(): Promise<FuelInfoType[] | []> {
  try {
    const html = await fetchRompetrolFuelInfo();
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');
    const regexPattern = /<[^>]+>([^<]+)<\/[^>]+>/g;

    const fuelInfo = parsed
      .getElementsByTagName('td')
      .toString()
      .match(regexPattern)
      .map(match => {
        const content = /<[^>]+>([^<]+)<\/[^>]+>/g.exec(match);
        return content && content[1].trim();
      });

    let parsedFuelArr: FuelInfoType[] = [];

    let arrStep = 0;
    for (let i = 0; i < fuelInfo?.length; ) {
      parsedFuelArr[arrStep] = {
        id: 'Rompetrol-' + fuelInfo?.[i],
        code: '',
        name: fuelInfo?.[i],
        price: fuelInfo?.[i + 1],
        company: 'Rompetrol',
      };

      if (isNumber(fuelInfo?.[i + 1])) {
        i += 2;
      } else {
        i++;
      }
      arrStep++;
    }

    return parsedFuelArr;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getRompetrolInfo;
