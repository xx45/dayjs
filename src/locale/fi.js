// Finnish [fi]
import dayjs from 'dayjs'

function relativeTimeFormatter(number, withoutSuffix, key, isFuture) {
  const past = {
    s: 'muutama sekunti',
    m: 'minuutti',
    mm: '%d minuuttia',
    h: 'tunti',
    hh: '%d tuntia',
    d: 'päivä',
    dd: '%d päivää',
    M: 'kuukausi',
    MM: '%d kuukautta',
    y: 'vuosi',
    yy: '%d vuotta'
  }
  const future = {
    s: 'muutaman sekunnin',
    m: 'minuutin',
    mm: '%d minuutin',
    h: 'tunnin',
    hh: '%d tunnin',
    d: 'päivän',
    dd: '%d päivän',
    M: 'kuukauden',
    MM: '%d kuukauden',
    y: 'vuoden',
    yy: '%d vuoden'
  }
  return ((isFuture && !withoutSuffix) ? future : past)[key].replace('%d', number)
}

const locale = {
  name: 'fi', // Finnish
  weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'), // Note weekdays are not capitalized in Finnish
  weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'), // There is no short form of weekdays in Finnish except this 2 letter format so it is used for both 'weekdaysShort' and 'weekdaysMin'
  weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
  months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'), // Note month names are not capitalized in Finnish
  monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
  ordinal: n => `${n}.`,
  weekStart: 1,
  relativeTime: {
    future: '%s kuluttua',
    past: '%s sitten',
    s: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  },
  formats: {
    LT: 'HH.mm',
    LTS: 'HH.mm.ss',
    L: 'DD.MM.YYYY',
    LL: 'Do MMMM[ta] YYYY',
    LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
    LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
    l: 'D.M.YYYY',
    ll: 'Do MMM YYYY',
    lll: 'Do MMM YYYY, [klo] HH.mm',
    llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
  }
}

dayjs.locale(locale, null, true)

export default locale

