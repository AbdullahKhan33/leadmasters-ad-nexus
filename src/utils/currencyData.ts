export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

export const currencies: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
];

export const countries = [
  'United States',
  'India',
  'United Kingdom',
  'United Arab Emirates',
  'Singapore',
  'Australia',
  'Canada',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Saudi Arabia',
  'Qatar',
  'Malaysia',
  'Thailand',
  'Philippines',
  'Indonesia',
  'Japan',
  'South Korea',
  'Brazil',
  'Mexico',
  'South Africa',
  'Nigeria',
  'Kenya',
  'Egypt',
  'Turkey',
  'Pakistan',
  'Bangladesh',
  'Vietnam',
  'New Zealand',
  'Ireland',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Belgium',
  'Austria',
  'Israel',
  'Argentina',
  'Chile',
  'Colombia',
  'Peru',
  'Portugal',
  'Greece',
  'Czech Republic',
  'Romania',
  'Hungary',
];

export const getCurrencySymbol = (code: string): string => {
  return currencies.find(c => c.code === code)?.symbol || code;
};

export const getBudgetRanges = (currency: string): string[] => {
  const ranges: Record<string, string[]> = {
    USD: ['$500-1,000', '$1,000-5,000', '$5,000-10,000', '$10,000+'],
    INR: ['₹40,000-80,000', '₹80,000-4,00,000', '₹4,00,000-8,00,000', '₹8,00,000+'],
    SGD: ['S$700-1,400', 'S$1,400-7,000', 'S$7,000-14,000', 'S$14,000+'],
    AED: ['د.إ1,800-3,600', 'د.إ3,600-18,000', 'د.إ18,000-36,000', 'د.إ36,000+'],
    EUR: ['€450-900', '€900-4,500', '€4,500-9,000', '€9,000+'],
    GBP: ['£400-800', '£800-4,000', '£4,000-8,000', '£8,000+'],
    AUD: ['A$750-1,500', 'A$1,500-7,500', 'A$7,500-15,000', 'A$15,000+'],
    CAD: ['C$700-1,400', 'C$1,400-7,000', 'C$7,000-14,000', 'C$14,000+'],
    JPY: ['¥75,000-150,000', '¥150,000-750,000', '¥750,000-1,500,000', '¥1,500,000+'],
  };
  
  return ranges[currency] || ranges['USD'];
};
