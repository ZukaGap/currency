// Calculation of REM strings
const SUFFIX: string = 'rem';
const DEFAULT_REM: number = 16;

// Is string contains rem
function isRem(str: string): boolean {
  return str.substr(-SUFFIX.length) === SUFFIX;
}

// Calculate rem to pixels: '1.2rem' => 1.2 * rem
function calc(str: string, rem = DEFAULT_REM): number {
  let koefStr = str.substr(0, str.length - SUFFIX.length);
  let koef = koefStr === '' ? 1 : parseFloat(koefStr);
  if (isNaN(koef)) {
    throw new Error('Invalid rem value: ' + str);
  }
  return rem * koef;
}

export default {
  isRem,
  calc,
};
