import { HoroscopeDto } from './dtos/horoscope.dto';
import { Moment } from 'moment';

/**
 * Get the user's horoscope based on their birthday.
 * @see https://docs.google.com/spreadsheets/d/1Oahej8yuEHfDsQI-AwycEpQ0CnjkMsxOMg2ywMKnjsg
 * @param {Date} birthday - The user's birthday in Date format.
 * @returns {string} The user's horoscope.
 */
export function getHoroscope(birthday: Moment): HoroscopeDto {
  const month = birthday.month();
  const day = birthday.day();

  // ♈ Aries (Ram): March 21 - April 19
  if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) {
    return {
      name: 'aries',
      sign: 'ram',
      symbol: '♈',
      description:
        'Aries, the ram, is a born leader with a fierce competitive streak.',
      date: 'March 21 - April 19',
    };
  }

  // ♉ Taurus (Bull): April 20 - May 20
  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) {
    return {
      name: 'taurus',
      sign: 'bull',
      symbol: '♉',
      description:
        'Taurus, the bull, is dependable, hardworking, and stubborn.',
      date: 'April 20 – May 20',
    };
  }

  // ♊ Gemini (Twins): May 21 - June 21
  if ((month === 4 && day >= 21) || (month === 5 && day <= 21)) {
    return {
      name: 'gemini',
      sign: 'twins',
      symbol: '♊',
      description:
        'Gemini, the twins, is curious, adaptable, and a great communicator.',
      date: 'May 21 – June 21',
    };
  }

  // ♋ Cancer (Crab): June 22 - July 22
  if ((month === 5 && day >= 22) || (month === 6 && day <= 22)) {
    return {
      name: 'cancer',
      sign: 'crab',
      symbol: '♋',
      description: 'Cancer, the crab, is a nurturing and emotional sign.',
      date: 'June 22 – July 22',
    };
  }

  // ♌ Leo (Lion): July 23 - August 22
  if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) {
    return {
      name: 'leo',
      sign: 'lion',
      symbol: '♌',
      description:
        'Leo, the lion, is a natural leader and the life of the party.',
      date: 'July 23 – August 22',
    };
  }

  // ♍ Virgo (Virgin): August 23 - September 22
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      name: 'virgo',
      sign: 'virgin',
      symbol: '♍',
      description:
        'Virgo, the virgin, is detail-oriented, practical, and kind.',
      date: 'August 23 – September 22',
    };
  }

  // ♎ Libra (Balance): September 23 - October 23
  if ((month === 8 && day >= 23) || (month === 9 && day <= 23)) {
    return {
      name: 'libra',
      sign: 'balance',
      symbol: '♎',
      description: 'Libra, the scales, is diplomatic, fair-minded, and social.',
      date: 'September 23 – October 23',
    };
  }

  // ♏ Scorpius (Scorpion): October 24 - November 21
  if ((month === 9 && day >= 24) || (month === 10 && day <= 21)) {
    return {
      name: 'scorpius',
      sign: 'scorpion',
      symbol: '♏',
      description:
        'Scorpius, the scorpion, is intense, passionate, and determined.',
      date: 'October 24 – November 21',
    };
  }

  // ♐ Sagittarius (Archer): November 22 - December 21
  if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) {
    return {
      name: 'sagittarius',
      sign: 'archer',
      symbol: '♐',
      description:
        'Sagittarius, the archer, is a free spirit and a seeker of truth.',
      date: 'November 22 – December 21',
    };
  }

  // ♑ Capricornus (Goat): December 22 - January 19
  if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
    return {
      name: 'capricornus',
      sign: 'goat',
      symbol: '♑',
      description:
        'Capricornus, the goat, is a hardworking and ambitious sign.',
      date: 'December 22 – January 19',
    };
  }

  // ♒ Aquarius (Water Bearer): January 20 - February 18
  if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) {
    return {
      name: 'aquarius',
      sign: 'water bearer',
      symbol: '♒',
      description:
        'Aquarius, the water bearer, is a visionary and humanitarian.',
      date: 'January 20 - February 18',
    };
  }

  // ♓ Pisces (Fish): February 19 – March 20
  return {
    name: 'pisces',
    sign: 'fish',
    symbol: '♓',
    description:
      "Pisces, the mystical fish, navigate life's currents with empathy and imagination.",
    date: 'February 19 – March 20',
  };
}
