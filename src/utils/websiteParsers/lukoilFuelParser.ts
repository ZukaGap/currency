import DOMParser from 'react-native-html-parser';

import {FuelInfoType, fetchLukoilFuelInfo} from 'config/Axios/getAPI';

function isNumber(value: string): boolean {
  const numberRegex = /^-?\d*\.?\d+$/;
  return numberRegex.test(value);
}

async function getLukoilInfo(): Promise<FuelInfoType[] | []> {
  try {
    const html = await fetchLukoilFuelInfo();
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');
    const regexPattern = /<[^>]+>([^<]+)<\/[^>]+>/g;

    const fuelInfo: string[] = parsed
      .getElementsByAttribute(
        'class',
        'mt-4 w-full h-2/5 flex justify-center items-center text-xl text-lk-main flex-col',
      )
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
        id: 'Lukoil-' + fuelInfo?.[i + 1],
        code: '',
        name: fuelInfo?.[i + 1],
        price: fuelInfo?.[i],
        company: 'Lukoil',
      };

      if (isNumber(fuelInfo?.[i])) {
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

export default getLukoilInfo;
