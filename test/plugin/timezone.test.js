import MockDate from 'mockdate'
import moment from 'moment-timezone'
import dayjs from '../../src'
import timezone from '../../src/plugin/timezone'
import customParseFormat from '../../src/plugin/customParseFormat'
import utc from '../../src/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

const NY = 'America/New_York'
const VAN = 'America/Vancouver'
const DEN = 'America/Denver'
const TOKYO = 'Asia/Tokyo'
const LONDON = 'Europe/London'

describe('Guess', () => {
  it('return string', () => {
    expect(typeof dayjs.tz.guess()).toBe('string')
  })
})


describe('Parse', () => {
  it('parse target time string', () => {
    const newYork = dayjs.tz('2014-06-01 12:00', NY)
    const MnewYork = moment.tz('2014-06-01 12:00', NY)
    expect(newYork.format()).toBe('2014-06-01T12:00:00-04:00')
    expect(newYork.format()).toBe(MnewYork.format())
    expect(newYork.utcOffset()).toBe(-240)
    expect(newYork.utcOffset()).toBe(MnewYork.utcOffset())
    expect(newYork.valueOf()).toBe(1401638400000)
    expect(newYork.valueOf()).toBe(MnewYork.valueOf())
  })

  it('parse timestamp, js Date, Day.js object', () => {
    const d = new Date('2020-08-07T12:00-07:00')
    const result = '2020-08-07T12:00:00-07:00'
    const TjsDate = dayjs.tz(d, VAN)
    const Tdayjs = dayjs.tz(dayjs(d), VAN)
    const Timestamp = dayjs.tz(d.getTime(), VAN)
    const Tmoment = moment.tz(d, VAN)
    expect(TjsDate.format()).toBe(result)
    expect(Tdayjs.format()).toBe(result)
    expect(Timestamp.format()).toBe(result)
    expect(Tmoment.format()).toBe(result)
  })

  it('parse and convert between timezones', () => {
    const newYork = dayjs.tz('2014-06-01 12:00', NY)
    expect(newYork.tz('America/Los_Angeles').format()).toBe('2014-06-01T09:00:00-07:00')
    expect(newYork.tz('Europe/London').format()).toBe('2014-06-01T17:00:00+01:00')
  })

  it('preserve milliseconds', () => {
    const d = dayjs(1596735327399)
    const oldMs = d.millisecond()
    const dTz = d.tz('America/New_York')
    const newMs = dTz.millisecond()
    expect(oldMs).toEqual(newMs)
  })
})

describe('Convert', () => {
  it('convert to target time', () => {
    const losAngeles = dayjs('2014-06-01T12:00:00Z').tz('America/Los_Angeles')
    const MlosAngeles = moment('2014-06-01T12:00:00Z').tz('America/Los_Angeles')
    expect(losAngeles.format()).toBe('2014-06-01T05:00:00-07:00')
    expect(losAngeles.format()).toBe(MlosAngeles.format())
    expect(losAngeles.valueOf()).toBe(1401624000000)
    expect(losAngeles.valueOf()).toBe(MlosAngeles.valueOf())
    expect(losAngeles.utcOffset()).toBe(-420)
    expect(losAngeles.utcOffset()).toBe(MlosAngeles.utcOffset())
  })

  it('convert to target time', () => {
    [dayjs, moment].forEach((_) => {
      const losAngeles = _('2014-06-01T12:00:00Z').tz('America/Los_Angeles')
      expect(losAngeles.format()).toBe('2014-06-01T05:00:00-07:00')
      expect(losAngeles.valueOf()).toBe(1401624000000)
    })
  })

  it('convert from time with timezone to target time', () => {
    const losAngelesInUTC = dayjs('2014-06-01T05:00:00-07:00').tz('UTC')
    const MlosAngelesInUTC = moment('2014-06-01T05:00:00-07:00').tz('UTC')
    expect(losAngelesInUTC.format()).toBe('2014-06-01T12:00:00Z')
    expect(losAngelesInUTC.format()).toBe(MlosAngelesInUTC.format())
  })

  it('DST', () => {
    [dayjs, moment].forEach((_) => {
      const jun = _('2014-06-01T12:00:00Z')
      const dec = _('2014-12-01T12:00:00Z')
      expect(jun.tz('America/Los_Angeles').format('ha')).toBe('5am')
      expect(jun.tz('America/Los_Angeles').utcOffset()).toBe(-7 * 60)
      expect(dec.tz('America/Los_Angeles').format('ha')).toBe('4am')
      expect(dec.tz('America/Los_Angeles').utcOffset()).toBe(-8 * 60)
      expect(jun.tz(NY).format('ha')).toBe('8am')
      expect(dec.tz(NY).format('ha')).toBe('7am')
      expect(jun.tz(TOKYO).format('ha')).toBe('9pm')
      expect(dec.tz(TOKYO).format('ha')).toBe('9pm')
      expect(jun.tz('Australia/Sydney').format('ha')).toBe('10pm')
      expect(dec.tz('Australia/Sydney').format('ha')).toBe('11pm')
    })
  })

  it('format Z', () => {
    [dayjs, moment].forEach((_) => {
      const t = _('2020-08-06T03:48:10.258Z').tz(TOKYO)
      expect(t.format('Z')).toBe('+09:00')
    })
  })
})


describe('DST, a time that never existed Spring Forward', () => {
  // 11 March 2012, 02:00:00 clocks were
  // turned forward 1 hour to 11 March 2012, 03:00:00 local
  // daylight time instead.
  // 02:00 -> 03:00
  // 02:59 -> 03:59

  it('2012-03-11 01:59:59', () => {
    const s = '2012-03-11 01:59:59'
    const d = dayjs.tz(s, NY)
    const m = moment.tz(s, NY)
    expect(d.format()).toBe('2012-03-11T01:59:59-05:00')
    expect(d.format()).toBe(m.format())
    expect(d.utcOffset()).toBe(-300)
    expect(d.utcOffset()).toBe(m.utcOffset())
    expect(d.valueOf()).toBe(1331449199000)
    expect(d.valueOf()).toBe(m.valueOf())
  })
  it('2012-03-11 02:00:00', () => {
    const s = '2012-03-11 02:00:00'
    const d = dayjs.tz(s, NY)
    const m = moment.tz(s, NY)
    expect(d.format()).toBe('2012-03-11T03:00:00-04:00')
    expect(d.format()).toBe(m.format())
    expect(d.valueOf()).toBe(m.valueOf())
    expect(d.valueOf()).toBe(1331449200000)
    expect(d.utcOffset()).toBe(-240)
    expect(d.utcOffset()).toBe(m.utcOffset())
  })
  it('2012-03-11 02:59:59', () => {
    const s = '2012-03-11 02:59:59'
    const d = dayjs.tz(s, NY)
    const m = moment.tz(s, NY)
    expect(d.format()).toBe('2012-03-11T03:59:59-04:00')
    expect(d.format()).toBe(m.format())
    expect(d.valueOf()).toBe(m.valueOf())
    expect(d.valueOf()).toBe(1331452799000)
    expect(d.utcOffset()).toBe(-240)
    expect(d.utcOffset()).toBe(m.utcOffset())
  })
  it('2012-03-11 03:00:00', () => {
    const s = '2012-03-11 03:00:00'
    const d = dayjs.tz(s, NY)
    const m = moment.tz(s, NY)
    expect(d.format()).toBe('2012-03-11T03:00:00-04:00')
    expect(d.format()).toBe(m.format())
    expect(d.valueOf()).toBe(m.valueOf())
    expect(d.valueOf()).toBe(1331449200000)
    expect(d.utcOffset()).toBe(-240)
    expect(d.utcOffset()).toBe(m.utcOffset())
  })
})

describe('DST, a time that never existed Fall Back', () => {
  // In the fall, at the end of DST

  it('2012-11-04 00:59:59', () => {
    const s = '2012-11-04 00:59:59';
    [dayjs, moment].forEach((_) => {
      const d = _.tz(s, NY)
      expect(d.format()).toBe('2012-11-04T00:59:59-04:00')
      expect(d.utcOffset()).toBe(-240)
      expect(d.valueOf()).toBe(1352005199000)
    })
  })
  it('2012-11-04 00:59:59', () => {
    const s = '2012-11-04 00:59:59';
    [dayjs, moment].forEach((_) => {
      const d = _.tz(s, NY)
      expect(d.format()).toBe('2012-11-04T00:59:59-04:00')
      expect(d.utcOffset()).toBe(-240)
      expect(d.valueOf()).toBe(1352005199000)
    })
  })

  // there's no sense to test "2012-11-04 01:59:59 America/New_York"
  // cause it's an invalid date and never exist
  // and dayjs result it as "2012-11-04T01:59:00-05:00"

  it('2012-11-04 02:00:00', () => {
    const s = '2012-11-04 02:00:00';
    [dayjs, moment].forEach((_) => {
      const d = _.tz(s, NY)
      expect(d.format()).toBe('2012-11-04T02:00:00-05:00')
      expect(d.utcOffset()).toBe(-300)
      expect(d.valueOf()).toBe(1352012400000)
    })
  })
})

describe('set Default', () => {
  it('default timezone', () => {
    const dateStr = '2014-06-01 12:00'
    dayjs.tz.setDefault(NY)
    const newYork = dayjs.tz(dateStr)
    expect(newYork.format()).toBe('2014-06-01T12:00:00-04:00')
    expect(newYork.utcOffset()).toBe(-240)
    expect(newYork.valueOf()).toBe(1401638400000)

    expect(dayjs(dateStr).tz().format()).toBe(dayjs(dateStr).tz(NY).format())
  })

  it('empty timezone means local timezone', () => {
    const LOCAL_TZ = dayjs.tz.guess()
    const dateStr = '2014-06-01 12:00'
    dayjs.tz.setDefault()
    expect(dayjs(dateStr).tz().valueOf()).toBe(dayjs(dateStr).tz(LOCAL_TZ).valueOf())
    expect(dayjs.tz(dateStr).valueOf()).toBe(dayjs.tz(dateStr, LOCAL_TZ).valueOf())
  })

  it('change default timezone', () => {
    dayjs.tz.setDefault(NY)
    const newYork = dayjs.tz('2014-06-01 12:00')
    expect(newYork.utcOffset()).toBe(-240)

    dayjs.tz.setDefault(TOKYO)
    const tokyo = dayjs.tz('2014-06-01 12:00')
    expect(tokyo.format()).toBe('2014-06-01T12:00:00+09:00')
    expect(tokyo.format('Z')).toBe('+09:00')
    expect(tokyo.valueOf()).toBe(1401591600000)
  })

  it('override default timezone in proto.tz', () => {
    dayjs.tz.setDefault(NY)
    const tokyo = dayjs.tz('2014-06-01 12:00', TOKYO)
    expect(tokyo.format()).toBe('2014-06-01T12:00:00+09:00')
    expect(tokyo.format('Z')).toBe('+09:00')
    expect(tokyo.valueOf()).toBe(1401591600000)
  })

  it('override default timezone in d.tz', () => {
    dayjs.tz.setDefault(NY)
    const tokyo = dayjs.tz('2014-06-01 12:00', TOKYO)
    expect(tokyo.format()).toBe('2014-06-01T12:00:00+09:00')
    expect(tokyo.format('Z')).toBe('+09:00')
    expect(tokyo.valueOf()).toBe(1401591600000)
  })
})

describe('keepLocalTime', () => {
  const base = dayjs.tz('2013-11-18 11:55', 'America/Toronto')
  it('keepLocalTime', () => {
    expect(base.tz('Europe/Berlin').format()).toBe('2013-11-18T17:55:00+01:00')
    expect(base.tz('Europe/Berlin', true).format()).toBe('2013-11-18T11:55:00+01:00')
  })
})

describe('Get offsetName', () => {
  const dtz = dayjs.tz('2012-03-11 01:59:59', NY)
  it('short', () => {
    const d = dtz.offsetName('short')
    const m = moment.tz('2012-03-11 01:59:59', NY).format('z')
    expect(d).toBe(m)
    expect(d).toBe('EST')
  })
  it('long', () => {
    const d = dtz.offsetName('long')
    expect(d).toBe('Eastern Standard Time')
  })
})

describe('CustomPraseFormat', () => {
  const result = 1602786600
  it('normal', () => {
    expect(dayjs.tz('2020/10/15 12:30', DEN).unix()).toBe(result)
  })
  it('custom', () => {
    expect(dayjs.tz('10/15/2020 12:30', 'MM/DD/YYYY HH:mm', DEN).unix()).toBe(result)
  })
})

describe('startOf and endOf', () => {
  it('corrects for timezone offset in startOf', () => {
    const originalDay = dayjs.tz('2010-01-01 00:00:00', NY)
    const startOfDay = originalDay.startOf('day')
    expect(startOfDay.valueOf()).toEqual(originalDay.valueOf())
    expect(startOfDay.format()).toEqual(originalDay.format())
  })

  it('corrects for timezone offset in endOf', () => {
    const originalDay = dayjs.tz('2009-12-31 23:59:59.999', NY)
    const endOfDay = originalDay.endOf('day')
    expect(endOfDay.valueOf()).toEqual(originalDay.valueOf())
    expect(endOfDay.format()).toEqual(originalDay.format())
  })

  it('corrects for +00:00 timezone offset in startOf', () => {
    const originalDay = dayjs.tz('2021-05-10 00:00:00', LONDON)
    const startOfDay = originalDay.startOf('day')
    expect(startOfDay.valueOf()).toEqual(originalDay.valueOf())
    expect(startOfDay.format()).toEqual(originalDay.format())
  })

  it('corrects for +00:00 timezone offset in endOf', () => {
    const originalDay = dayjs.tz('2021-05-10 23:59:59.999', LONDON)
    const endOfDay = originalDay.endOf('day')
    expect(endOfDay.valueOf()).toEqual(originalDay.valueOf())
    expect(endOfDay.format()).toEqual(originalDay.format())
  })
})
