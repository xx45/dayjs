// Pashto [ps]
import dayjs from 'dayjs'

const locale = {
  name: 'pashto',
  weekdays: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
  weekdaysShort: 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
  weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
  weekStart: 6,
  months: 'جنوری_فبروری_مارچ_اپریل_می_جون_جولای_اگست_سپتمبر_اکتوبر_نومبر_دسمبر'.split('_'),
  monthsShort: 'جنوری_فبروری_مارچ_اپریل_می_جون_جولای_اگست_سپتمبر_اکتوبر_نومبر_دسمبر'.split('_'),
  ordinal: n => n,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'په %s',
    past: '%s مخکې',
    s: 'څو ثانیې',
    m: 'یوه دقیقه',
    mm: '%d دقیقې',
    h: 'یو ساعت',
    hh: '%d ساعتونه',
    d: 'یوه ورځ',
    dd: '%d ورځې',
    M: 'یوه میاشت',
    MM: '%d میاشتې',
    y: 'یو کال',
    yy: '%d کلونه'
  }
}

dayjs.locale(locale, null, true)

export default locale
