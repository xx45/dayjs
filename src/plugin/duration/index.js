import {
  MILLISECONDS_A_DAY,
  MILLISECONDS_A_HOUR,
  MILLISECONDS_A_MINUTE,
  MILLISECONDS_A_SECOND,
  MILLISECONDS_A_WEEK,
  REGEX_FORMAT
} from '../../constant'

const MILLISECONDS_A_YEAR = MILLISECONDS_A_DAY * 365
const MILLISECONDS_A_MONTH = MILLISECONDS_A_DAY * 30

const durationRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/

const unitToMS = {
  years: MILLISECONDS_A_YEAR,
  months: MILLISECONDS_A_MONTH,
  days: MILLISECONDS_A_DAY,
  hours: MILLISECONDS_A_HOUR,
  minutes: MILLISECONDS_A_MINUTE,
  seconds: MILLISECONDS_A_SECOND,
  milliseconds: 1,
  weeks: MILLISECONDS_A_WEEK
}

const isDuration = d => d instanceof Duration // eslint-disable-line no-use-before-define

let $d
let $u

const wrapper = (input, instance, unit) =>
  new Duration(input, unit, instance.$l) // eslint-disable-line no-use-before-define

const prettyUnit = unit => `${$u.p(unit)}s`
const isNegative = number => number < 0
const roundNumber = number =>
  (isNegative(number) ? Math.ceil(number) : Math.floor(number))
const absolute = number => Math.abs(number)
const getNumberUnitFormat = (number, unit) => {
  if (!number) {
    return {
      negative: false,
      format: ''
    }
  }

  if (isNegative(number)) {
    return {
      negative: true,
      format: `${absolute(number)}${unit}`
    }
  }

  return {
    negative: false,
    format: `${number}${unit}`
  }
}

class Duration {
  constructor(input, unit, locale) {
    this.$d = {}
    this.$l = locale
    if (input === undefined) {
      this.$ms = 0
      this.parseFromMilliseconds()
    }
    if (unit) {
      return wrapper(input * unitToMS[prettyUnit(unit)], this)
    }
    if (typeof input === 'number') {
      this.$ms = input
      this.parseFromMilliseconds()
      return this
    }
    if (typeof input === 'object') {
      Object.keys(input).forEach((k) => {
        this.$d[prettyUnit(k)] = input[k]
      })
      this.calMilliseconds()
      return this
    }
    if (typeof input === 'string') {
      const d = input.match(durationRegex)
      if (d) {
        const properties = d.slice(2)
        const numberD = properties.map(value => Number(value));
        [
          this.$d.years,
          this.$d.months,
          this.$d.weeks,
          this.$d.days,
          this.$d.hours,
          this.$d.minutes,
          this.$d.seconds
        ] = numberD
        this.calMilliseconds()
        return this
      }
    }
    return this
  }

  calMilliseconds() {
    this.$ms = Object.keys(this.$d).reduce((total, unit) => (
      total + ((this.$d[unit] || 0) * (unitToMS[unit]))
    ), 0)
  }

  parseFromMilliseconds() {
    let { $ms } = this
    this.$d.years = roundNumber($ms / MILLISECONDS_A_YEAR)
    $ms %= MILLISECONDS_A_YEAR
    this.$d.months = roundNumber($ms / MILLISECONDS_A_MONTH)
    $ms %= MILLISECONDS_A_MONTH
    this.$d.days = roundNumber($ms / MILLISECONDS_A_DAY)
    $ms %= MILLISECONDS_A_DAY
    this.$d.hours = roundNumber($ms / MILLISECONDS_A_HOUR)
    $ms %= MILLISECONDS_A_HOUR
    this.$d.minutes = roundNumber($ms / MILLISECONDS_A_MINUTE)
    $ms %= MILLISECONDS_A_MINUTE
    this.$d.seconds = roundNumber($ms / MILLISECONDS_A_SECOND)
    $ms %= MILLISECONDS_A_SECOND
    this.$d.milliseconds = $ms
  }

  toISOString() {
    const Y = getNumberUnitFormat(this.$d.years, 'Y')
    const M = getNumberUnitFormat(this.$d.months, 'M')

    let days = +this.$d.days || 0
    if (this.$d.weeks) {
      days += this.$d.weeks * 7
    }

    const D = getNumberUnitFormat(days, 'D')
    const H = getNumberUnitFormat(this.$d.hours, 'H')
    const m = getNumberUnitFormat(this.$d.minutes, 'M')

    let seconds = this.$d.seconds || 0
    if (this.$d.milliseconds) {
      seconds += this.$d.milliseconds / 1000
    }

    const S = getNumberUnitFormat(seconds, 'S')

    const negativeMode =
      Y.negative ||
      M.negative ||
      D.negative ||
      H.negative ||
      m.negative ||
      S.negative

    const T = H.format || m.format || S.format ? 'T' : ''
    const P = negativeMode ? '-' : ''

    const result = `${P}P${Y.format}${M.format}${D.format}${T}${H.format}${m.format}${S.format}`
    return result === 'P' || result === '-P' ? 'P0D' : result
  }

  toJSON() {
    return this.toISOString()
  }

  format(formatStr) {
    const str = formatStr || 'YYYY-MM-DDTHH:mm:ss'
    const matches = {
      Y: this.$d.years,
      YY: $u.s(this.$d.years, 2, '0'),
      YYYY: $u.s(this.$d.years, 4, '0'),
      M: this.$d.months,
      MM: $u.s(this.$d.months, 2, '0'),
      D: this.$d.days,
      DD: $u.s(this.$d.days, 2, '0'),
      H: this.$d.hours,
      HH: $u.s(this.$d.hours, 2, '0'),
      m: this.$d.minutes,
      mm: $u.s(this.$d.minutes, 2, '0'),
      s: this.$d.seconds,
      ss: $u.s(this.$d.seconds, 2, '0'),
      SSS: $u.s(this.$d.milliseconds, 3, '0')
    }
    return str.replace(REGEX_FORMAT, (match, $1) => $1 || String(matches[match]))
  }

  as(unit) {
    return this.$ms / (unitToMS[prettyUnit(unit)])
  }

  get(unit) {
    let base = this.$ms
    const pUnit = prettyUnit(unit)
    if (pUnit === 'milliseconds') {
      base %= 1000
    } else if (pUnit === 'weeks') {
      base = roundNumber(base / unitToMS[pUnit])
    } else {
      base = this.$d[pUnit]
    }
    return base === 0 ? 0 : base // a === 0 will be true on both 0 and -0
  }

  add(input, unit, isSubtract) {
    let another
    if (unit) {
      another = input * unitToMS[prettyUnit(unit)]
    } else if (isDuration(input)) {
      another = input.$ms
    } else {
      another = wrapper(input, this).$ms
    }

    return wrapper(this.$ms + (another * (isSubtract ? -1 : 1)), this)
  }

  subtract(input, unit) {
    return this.add(input, unit, true)
  }

  locale(l) {
    const that = this.clone()
    that.$l = l
    return that
  }

  clone() {
    return wrapper(this.$ms, this)
  }

  humanize(withSuffix) {
    return $d()
      .add(this.$ms, 'ms')
      .locale(this.$l)
      .fromNow(!withSuffix)
  }

  pretty(o) {
    const options = { verbose: false, ...o }
    const p = (n, s) => (n > 1 ? `${s}s` : s)
    let chain = [
      [this.$d.years, 'year', 'y'],
      [this.$d.months, 'month', 'm'],
      [this.$d.days, 'day', 'd'],
      [this.$d.hours, 'hour', 'h'],
      [this.$d.minutes, 'minute', 'm'],
      [this.$d.seconds, 'second', 's'],
      [this.$d.milliseconds, 'millisecond', 'ms']
    ]
    chain = chain.filter(([t]) => !!t).map(([t, n, s]) => {
      if (options.verbose) {
        return `${t} ${p(t, n)}`
      }
      return `${t}${s}`
    })
    return chain.join(' ')
  }

  milliseconds() { return this.get('milliseconds') }
  asMilliseconds() { return this.as('milliseconds') }
  seconds() { return this.get('seconds') }
  asSeconds() { return this.as('seconds') }
  minutes() { return this.get('minutes') }
  asMinutes() { return this.as('minutes') }
  hours() { return this.get('hours') }
  asHours() { return this.as('hours') }
  days() { return this.get('days') }
  asDays() { return this.as('days') }
  weeks() { return this.get('weeks') }
  asWeeks() { return this.as('weeks') }
  months() { return this.get('months') }
  asMonths() { return this.as('months') }
  years() { return this.get('years') }
  asYears() { return this.as('years') }
}

export default (option, Dayjs, dayjs) => {
  $d = dayjs
  $u = dayjs().$utils()
  dayjs.duration = function (input, unit) {
    const $l = dayjs.locale()
    return wrapper(input, { $l }, unit)
  }
  dayjs.isDuration = isDuration

  const oldAdd = Dayjs.prototype.add
  const oldSubtract = Dayjs.prototype.subtract
  Dayjs.prototype.add = function (value, unit) {
    if (isDuration(value)) value = value.asMilliseconds()
    return oldAdd.bind(this)(value, unit)
  }
  Dayjs.prototype.subtract = function (value, unit) {
    if (isDuration(value)) value = value.asMilliseconds()
    return oldSubtract.bind(this)(value, unit)
  }
}
