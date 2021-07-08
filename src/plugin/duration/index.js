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
const isDateUnit = (unit) => {
  switch (prettyUnit(unit)) {
    case 'years':
    case 'months':
    case 'weeks':
    case 'days':
      return true
    default:
      return false
  }
}
const roundNumber = number =>
  (isNegative(number) ? Math.ceil(number) : Math.floor(number))
const absolute = number => Math.abs(number)
const xor = (a, b) => (a && !b) || (!a && b)
const getNumberUnitFormat = (number, unit, negativeMode) => {
  if (!number) return ''
  if (xor(isNegative(number), negativeMode)) return `-${absolute(number)}${unit}`
  return `${absolute(number)}${unit}`
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
      if (isDateUnit(unit)) {
        return wrapper({ [unit]: input }, this)
      }
      return wrapper(input * unitToMS[prettyUnit(unit)], this)
    }
    if (typeof input === 'number') {
      this.$ms = input
      this.parseFromMilliseconds()
      return this
    }
    if (typeof input === 'object') {
      Object.keys(input).forEach((u) => {
        this.$d[prettyUnit(u)] = input[u]
      })
      this.calMilliseconds()
      return this
    }
    if (typeof input === 'string') {
      const d = input.match(durationRegex)
      if (d) {
        const negativeMode = d[1] === '-'
        const properties = d.slice(2)
        const numberD = properties.map(value => (!negativeMode ? Number(value) : -Number(value)));
        [
          this.$d.years,
          this.$d.months,
          this.$d.weeks,
          this.$d.days,
          this.$d.hours,
          this.$d.minutes,
          this.$d.seconds
        ] = numberD
        this.deleteNanOrZeroUnits()
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
    this.deleteNanOrZeroUnits()
  }

  deleteNanOrZeroUnits() {
    Object.keys(this.$d).forEach((unit) => {
      if (Number.isNaN(this.$d[unit]) || this.$d[unit] === 0) {
        delete this.$d[unit]
      }
    })
  }

  toISOString() {
    let negativeMode = false
    if (this.$d.years !== undefined) {
      negativeMode = isNegative(this.$d.years)
    } else if (this.$d.months !== undefined) {
      negativeMode = isNegative(this.$d.months)
    } else if (this.$d.weeks !== undefined) {
      negativeMode = isNegative(this.$d.weeks)
    } else if (this.$d.days !== undefined) {
      negativeMode = isNegative(this.$d.days)
    } else if (this.$d.hours !== undefined) {
      negativeMode = isNegative(this.$d.hours)
    } else if (this.$d.minutes !== undefined) {
      negativeMode = isNegative(this.$d.minutes)
    } else if (this.$d.seconds !== undefined) {
      negativeMode = isNegative(this.$d.seconds)
    } else if (this.$d.milliseconds !== undefined) {
      negativeMode = isNegative(this.$d.milliseconds)
    }

    const Y = getNumberUnitFormat(this.$d.years, 'Y', negativeMode)
    const M = getNumberUnitFormat(this.$d.months, 'M', negativeMode)

    let days = +this.$d.days || 0
    if (this.$d.weeks) {
      days += this.$d.weeks * 7
    }

    const D = getNumberUnitFormat(days, 'D', negativeMode)
    const H = getNumberUnitFormat(this.$d.hours, 'H', negativeMode)
    const m = getNumberUnitFormat(this.$d.minutes, 'M', negativeMode)

    let seconds = this.$d.seconds || 0
    if (this.$d.milliseconds) {
      seconds += this.$d.milliseconds / 1000
    }

    const S = getNumberUnitFormat(seconds, 'S', negativeMode)

    const T = H || m || S ? 'T' : ''
    const P = negativeMode ? '-' : ''

    const result = `${P}P${Y}${M}${D}${T}${H}${m}${S}`
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
    return base === 0 || base === undefined ? 0 : base // a === 0 will be true on both 0 and -0
  }

  add(input, unit, isSubtract) {
    let another
    if (isDuration(input)) {
      another = input
    } else {
      another = wrapper(input, this, unit)
    }

    const d = {}
    Object.keys(unitToMS).forEach((u) => {
      d[u] = (this.$d[u] || 0) + ((another.$d[u] || 0) * (isSubtract ? -1 : 1))
    })
    return wrapper(d, this)
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
    if (isDuration(value)) {
      let d = this
      Object.keys(value.$d).forEach((durationUnit) => {
        d = d.add(value.$d[durationUnit], durationUnit)
      })
      return d
    }
    return oldAdd.bind(this)(value, unit)
  }
  Dayjs.prototype.subtract = function (value, unit) {
    if (isDuration(value)) {
      let d = this
      Object.keys(value.$d).forEach((durationUnit) => {
        d = d.subtract(value.$d[durationUnit], durationUnit)
      })
      return d
    }
    return oldSubtract.bind(this)(value, unit)
  }
}
