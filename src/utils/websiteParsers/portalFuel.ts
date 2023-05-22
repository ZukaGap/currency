import DOMParser from 'react-native-html-parser';

import {fetchPortalFuelInfo} from 'config/Axios/getAPI';

export interface PortalInfoType {
  company: 'Portal';
  www: 'https://portal.com.ge/georgian/newfuel';
  production: {name: string; price: string}[];
}

async function getPortalInfo(): Promise<PortalInfoType | {}> {
  try {
    const html = await fetchPortalFuelInfo();
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(html, 'text/html');

    const fuelCategories = parsed
      .getElementsByTagName('h3')
      .toString()
      .replace(/>\s+</g, '')
      .replace(/\s+/g, ' ')
      .replaceAll('</h3>', '')
      .replace('<div class="color_title">', '')
      .replace('</div/h3>', '')
      .replace('<div class="color_title2">', '')
      .replace('</div/h3>', '')
      .split('<h3>')
      .filter(n => n)
      .map(entry => entry.replace(/^\s+|\s+$/g, ''));

    const fuelPrices = parsed
      .getElementsByAttribute('class', 'faq_price fuel_price')
      .toString()
      .replace(/>\s+</g, '')
      .replace(/\n/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter(n => n);

    const length =
      fuelCategories?.length > fuelPrices?.length
        ? fuelCategories?.length
        : fuelPrices?.length;

    const resultOBJ = {
      company: 'Portal',
      www: 'https://portal.com.ge/georgian/newfuel',
      production: [],
    };

    for (let i = 0; i < length; i++) {
      resultOBJ.production[i] = {
        name: fuelCategories[i],
        price: fuelPrices[i],
      };
    }

    return resultOBJ;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default getPortalInfo;
