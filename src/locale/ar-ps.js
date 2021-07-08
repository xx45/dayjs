import dayjs from 'dayjs'

const locale = {
  name: 'ar-ps',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  months: 'كانون الثاني_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_تشرين الأوّل_تشرين الثاني_كانون الأوّل'.split('_'),
  weekStart: 6,
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  monthsShort: 'ك٢_شباط_آذار_نيسان_أيّار_حزيران_تمّوز_آب_أيلول_ت١_ت٢_ك١'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  ordinal: n => n,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: 'ثانية واحدة',
    m: 'دقيقة واحدة',
    mm: 'دقائق %d',
    h: 'ساعة واحدة',
    hh: 'ساعات %d',
    d: 'يوم واحد',
    dd: 'أيام %d',
    M: 'شهر واحد',
    MM: 'شهرا %d',
    y: 'عام واحد',
    yy: 'أعوام %d'
  }
}

dayjs.locale(locale, null, true)

export default locale

