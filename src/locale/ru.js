import dayjs from 'dayjs'

const monthFormat = 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_')
const monthStandalone = 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')

const monthShortFormat = 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_')
const monthShortStandalone = 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')

const plural = (word, num) => {
  const forms = word.split('_')

  if (num % 10 === 1 && num % 100 !== 11) {
    return forms[0]
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return forms[1]
  }

  return forms[2];
}

const relativeTimeWithPlural = (number, withoutSuffix, key) => {
  const format = {
    ss: withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
    mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
    hh: 'час_часа_часов',
    dd: 'день_дня_дней',
    MM: 'месяц_месяца_месяцев',
    yy: 'год_года_лет'
  };
  if (key === 'm') {
    return withoutSuffix ? 'минута' : 'минуту';
  }

  return `${number} ${plural(format[key], +number)}`;
}

const MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/
const locale = {
  name: 'ru',
  weekdays: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
  weekdaysShort: 'вск_пнд_втр_срд_чтв_птн_сбт'.split('_'),
  weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
  months: (dayjsInstance, format) => {
    if (MONTHS_IN_FORMAT.test(format)) {
      return monthFormat[dayjsInstance.month()]
    }
    return monthStandalone[dayjsInstance.month()]
  },
  monthsShort: (dayjsInstance, format) => {
    if (MONTHS_IN_FORMAT.test(format)) {
      return monthShortFormat[dayjsInstance.month()]
    }
    return monthShortStandalone[dayjsInstance.month()]
  },
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY г.',
    LLL: 'D MMMM YYYY г., H:mm',
    LLLL: 'dddd, D MMMM YYYY г., H:mm'
  },
  relativeTime: {
    future: 'через %s',
    past: '%s назад',
    s: 'несколько секунд',
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: 'час',
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'месяц',
    MM: relativeTimeWithPlural,
    y: 'год',
    yy: relativeTimeWithPlural
  },
  ordinal: n => n
}

dayjs.locale(locale, null, true)

export default locale

