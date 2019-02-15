import * as C from './constant'

const padStart = (string, length, pad) => {
  const s = String(string)
  if (!s || s.length >= length) return string
  return `${Array((length + 1) - s.length).join(pad)}${string}`
}

const padZoneStr = (negMinuts) => {
  const minutes = Math.abs(negMinuts)
  const hourOffset = Math.floor(minutes / 60)
  const minuteOffset = minutes % 60
  return `${negMinuts <= 0 ? '+' : '-'}${padStart(hourOffset, 2, '0')}:${padStart(minuteOffset, 2, '0')}`
}

const monthDiff = (a, b) => {
  // function from moment.js in order to keep the same result
  const wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month())
  const anchor = a.clone().add(wholeMonthDiff, 'months')
  const c = b - anchor < 0
  const anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), 'months')
  return Number(-(wholeMonthDiff + ((b - anchor) / (c ? (anchor - anchor2) :
    (anchor2 - anchor)))) || 0)
}

const absFloor = n => (n < 0 ? Math.ceil(n) || 0 : Math.floor(n))

const prettyUnit = (u) => {
  const special = {
    M: C.M,
    y: C.Y,
    w: C.W,
    d: C.D,
    h: C.H,
    m: C.MIN,
    s: C.S,
    ms: C.MS
  }
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '')
}

const isUndefined = s => s === undefined

const fromString = (s) => {
  if (!s) return null
  const reg = s.match(C.REGEX_PARSE)
  if (!(/.*[^Z]$/i.test(s)) || !reg) return null
  // Treat this condition as an invalid date
  if (!reg[2] || reg[2] > 12 || reg[2] < 1) return new Date(NaN)
  let daysPerMonth = C.DAYS_PER_MONTH[reg[2] - 1]
  if (Number(reg[2]) === 2 // If is february
    && (((reg[1] % 4 === 0) && (reg[1] % 100 !== 0)) || (reg[1] % 400 === 0))) daysPerMonth += 1
  // Treat this condition as an invalid date
  if ((!!reg[3] && (reg[3] > daysPerMonth || reg[3] < 1))
    || (!!reg[5] && (reg[5] > 23 || reg[5] < 0))
    || (!!reg[6] && (reg[6] > 59 || reg[6] < 0))
    || (!!reg[7] && (reg[7] > 59 || reg[7] < 0))) return new Date(NaN)
  return new Date(
    reg[1], reg[2] - 1, reg[3] || 1,
    reg[5] || 0, reg[6] || 0, reg[7] || 0, reg[8] || 0
  )
}

export default {
  padStart,
  padZoneStr,
  monthDiff,
  absFloor,
  prettyUnit,
  isUndefined,
  fromString
}
