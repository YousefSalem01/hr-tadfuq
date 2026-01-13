export const COUNTRY_DIAL_CODES: Record<string, string> = {
  US: '+1',
  UK: '+44',
  EG: '+20',
  AE: '+971',
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
};

export function guessCountryFromPhone(phoneNumber?: string | null) {
  const p = (phoneNumber ?? '').trim();
  if (p.startsWith('+971')) return 'AE';
  if (p.startsWith('+44')) return 'UK';
  if (p.startsWith('+20')) return 'EG';
  if (p.startsWith('+1')) return 'US';
  return 'US';
}

export function stripDialCode(phoneNumber: string, dialCode: string) {
  const p = (phoneNumber ?? '').trim();
  if (!p) return '';
  return p.startsWith(dialCode) ? p.slice(dialCode.length) : p.replace(/^\+/, '');
}

