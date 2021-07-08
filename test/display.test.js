import moment from 'moment'
import MockDate from 'mockdate'
import dayjs from '../src'
import th from '../src/locale/th'
import '../src/locale/ja'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format no formatStr', () => {
  expect(dayjs().format()).toBe(moment().format())
})

it('Format invalid date', () => {
  expect(dayjs('').format()).toBe(new Date('').toString())
  expect(dayjs('otherString').format()).toBe(new Date('otherString').toString())
})

it('Format Year YY YYYY', () => {
  expect(dayjs().format('YY')).toBe(moment().format('YY'))
  expect(dayjs().format('YYYY')).toBe(moment().format('YYYY'))
})

it('Format Month M MM MMM MMMM', () => {
  expect(dayjs().format('M')).toBe(moment().format('M'))
  expect(dayjs().format('MM')).toBe(moment().format('MM'))
  expect(dayjs().format('MMM')).toBe(moment().format('MMM'))
  expect(dayjs().format('MMMM')).toBe(moment().format('MMMM'))
})

it('Format Day of Month D DD 1 - 31', () => {
  expect(dayjs().format('D')).toBe(moment().format('D'))
  expect(dayjs().format('DD')).toBe(moment().format('DD'))
})

it('Format Day of Week d Sun - Sat', () => {
  expect(dayjs().format('d')).toBe(moment().format('d'))
  expect(dayjs().format('dd')).toBe(moment().format('dd'))
  expect(dayjs().format('ddd')).toBe(moment().format('ddd'))
  expect(dayjs().format('dddd')).toBe(moment().format('dddd'))
})

it('Format Hour H HH 24-hour', () => {
  expect(dayjs().format('H')).toBe(moment().format('H'))
  expect(dayjs().format('HH')).toBe(moment().format('HH'))
})

it('Format Hour h hh 12-hour', () => {
  const time = '2018-05-02T00:00:00.000'
  const expected = '12'
  expect(dayjs(time).format('h')).toBe(expected)
  expect(dayjs(time).format('h')).toBe(moment(time).format('h'))
  expect(dayjs(time).format('hh')).toBe(expected)
  expect(dayjs(time).format('hh')).toBe(moment(time).format('hh'))

  const time2 = '2018-05-02T01:00:00.000'
  expect(dayjs(time2).format('h')).toBe(moment(time2).format('h'))
  expect(dayjs(time2).format('h')).toBe('1')
  expect(dayjs(time2).format('hh')).toBe(moment(time2).format('hh'))
  expect(dayjs(time2).format('hh')).toBe('01')

  const time3 = '2018-05-02T23:00:00.000'
  const expected3 = '11'
  expect(dayjs(time3).format('h')).toBe(moment(time3).format('h'))
  expect(dayjs(time3).format('h')).toBe(expected3)
  expect(dayjs(time3).format('hh')).toBe(moment(time3).format('hh'))
  expect(dayjs(time3).format('hh')).toBe(expected3)
})

it('Format meridiens a A am / pm', () => {
  const time = '2018-05-02T01:00:00.000'
  expect(dayjs(time).format('a')).toBe('am')
  expect(dayjs(time).format('a')).toBe(moment(time).format('a'))
  expect(dayjs(time).format('A')).toBe('AM')
  expect(dayjs(time).format('A')).toBe(moment(time).format('A'))
  expect(dayjs(time).locale('ja').format('a')).toBe('午前')
  expect(dayjs(time).locale('ja').format('a'))
    .toBe(moment(time).locale('ja').format('a'))

  const time2 = '2018-05-02T23:00:00.000'
  expect(dayjs(time2).format('a')).toBe('pm')
  expect(dayjs(time2).format('a')).toBe(moment(time2).format('a'))
  expect(dayjs(time2).format('A')).toBe('PM')
  expect(dayjs(time2).format('A')).toBe(moment(time2).format('A'))
  expect(dayjs(time2).locale('ja').format('a')).toBe('午後')
  expect(dayjs(time2).locale('ja').format('a'))
    .toBe(moment(time2).locale('ja').format('a'))
})

it('Format Minute m mm', () => {
  expect(dayjs().format('m')).toBe(moment().format('m'))
  expect(dayjs().format('mm')).toBe(moment().format('mm'))
})

it('Format Second s ss SSS', () => {
  expect(dayjs().format('s')).toBe(moment().format('s'))
  expect(dayjs().format('ss')).toBe(moment().format('ss'))
  expect(dayjs().format('SSS')).toBe(moment().format('SSS'))
  const date = '2011-11-05T14:48:01.002Z'
  expect(dayjs(date).format('s-ss-SSS')).toBe(moment(date).format('s-ss-SSS'))
})

it('Format Time Zone ZZ', () => {
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8)
  expect(dayjs().format('Z')).toBe(moment().format('Z'))
  expect(dayjs().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8 * -1)
  expect(dayjs().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 0)
  expect(dayjs().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 10)
  expect(dayjs().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 11 * -1)
  expect(dayjs().format('ZZ')).toBe(moment().format('ZZ'))
  MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 5.5 * -1)
  expect(dayjs().format('ZZ')).toBe(moment().format('ZZ'))
})

it('Format ddd dd MMM with short locale', () => {
  expect(dayjs()
    .locale(th)
    .format('dd')).toBe(moment()
    .locale('th')
    .format('dd'))
  expect(dayjs()
    .locale(th)
    .format('ddd')).toBe(moment()
    .locale('th')
    .format('ddd'))
  expect(dayjs()
    .locale(th)
    .format('MMM')).toBe(moment()
    .locale('th')
    .format('MMM'))
})

it('Format token value is 0', () => {
  const sundayDate = '2000-01-02'
  const sundayStr = 'd H m s'
  expect(dayjs(sundayDate).format(sundayStr))
    .toBe(moment(sundayDate).format(sundayStr))
})

it('Format Complex with other string - : / ', () => {
  const string = 'YY-M-D / HH:mm:ss'
  expect(dayjs().format(string)).toBe(moment().format(string))
})

it('Format Escaping characters', () => {
  let string = '[Z] Z'
  expect(dayjs().format(string)).toBe(moment().format(string))
  string = '[Z] Z [Z]'
  expect(dayjs().format(string)).toBe(moment().format(string))
})

describe('Difference', () => {
  it('empty -> default milliseconds', () => {
    const dateString = '20110101'
    const dayjsA = dayjs()
    const dayjsB = dayjs(dateString)
    const momentA = moment()
    const momentB = moment(dateString)
    expect(dayjsA.diff(dayjsB)).toBe(momentA.diff(momentB))
  })

  it('diff -> none dayjs object', () => {
    const dateString = '2013-02-08'
    const dayjsA = dayjs()
    const dayjsB = new Date(dateString)
    const momentA = moment()
    const momentB = new Date(dateString)
    expect(dayjsA.diff(dayjsB)).toBe(momentA.diff(momentB))
  })

  it('diff -> in seconds, minutes, hours, days, weeks, months, quarters, years ', () => {
    const dayjsA = dayjs()
    const dayjsB = dayjs().add(1000, 'days')
    const dayjsC = dayjs().subtract(1000, 'days')
    const momentA = moment()
    const momentB = moment().add(1000, 'days')
    const momentC = moment().subtract(1000, 'days')
    const units = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', 'years']
    units.forEach((unit) => {
      expect(dayjsA.diff(dayjsB, unit)).toBe(momentA.diff(momentB, unit))
      expect(dayjsA.diff(dayjsB, unit, true)).toBe(momentA.diff(momentB, unit, true))
      expect(dayjsA.diff(dayjsC, unit)).toBe(momentA.diff(momentC, unit))
      expect(dayjsA.diff(dayjsC, unit, true)).toBe(momentA.diff(momentC, unit, true))
    })
  })

  it('Special diff in month according to moment.js', () => {
    const dayjsA = dayjs('20160115')
    const dayjsB = dayjs('20160215')
    const dayjsC = dayjs('20170115')
    const momentA = moment('20160115')
    const momentB = moment('20160215')
    const momentC = moment('20170115')
    const units = ['months', 'quarters', 'years']
    units.forEach((unit) => {
      expect(dayjsA.diff(dayjsB, unit)).toBe(momentA.diff(momentB, unit))
      expect(dayjsA.diff(dayjsB, unit, true)).toBe(momentA.diff(momentB, unit, true))
      expect(dayjsA.diff(dayjsC, unit)).toBe(momentA.diff(momentC, unit))
      expect(dayjsA.diff(dayjsC, unit, true)).toBe(momentA.diff(momentC, unit, true))
    })
  })

  it('MonthDiff', () => {
    expect(dayjs('2018-08-08').diff(dayjs('2018-08-08'), 'month')).toEqual(0)
    expect(dayjs('2018-09-08').diff(dayjs('2018-08-08'), 'month')).toEqual(1)
    expect(dayjs('2018-08-08').diff(dayjs('2018-09-08'), 'month')).toEqual(-1)
    expect(dayjs('2018-01-01').diff(dayjs('2018-01-01'), 'month')).toEqual(0)
  })

  it('undefined edge case', () => {
    expect(dayjs().diff(undefined, 'seconds')).toBeDefined()
  })
})

it('Unix Timestamp (milliseconds)', () => {
  expect(dayjs().valueOf()).toBe(moment().valueOf())
})

it('Unix Timestamp (seconds)', () => {
  expect(dayjs().unix()).toBe(moment().unix())
})

it('Days in Month', () => {
  expect(dayjs().daysInMonth()).toBe(moment().daysInMonth())
  expect(dayjs('20140201').daysInMonth()).toBe(moment('20140201').daysInMonth())
})

it('Utc Offset', () => {
  expect(dayjs('2013-01-01T00:00:00.000').utcOffset()).toBe(moment('2013-01-01T00:00:00.000').utcOffset())
  expect(dayjs('2013-01-01T05:00:00.000').utcOffset()).toBe(moment('2013-01-01T05:00:00.000').utcOffset())
})

it('As Javascript Date -> toDate', () => {
  const base = dayjs()
  const momentBase = moment()
  const jsDate = base.toDate()
  expect(jsDate).toEqual(momentBase.toDate())
  expect(jsDate).toEqual(new Date())

  jsDate.setFullYear(1970)
  expect(jsDate.toUTCString()).not.toBe(base.toString())
})

it('As JSON -> toJSON', () => {
  expect(dayjs().toJSON()).toBe(moment().toJSON())
  global.console.warn = jest.genMockFunction()// moment.js otherString will throw warn
  expect(dayjs('otherString').toJSON()).toBe(moment('otherString').toJSON())
  expect(dayjs('otherString').toJSON()).toBe(null)
})

it('As ISO 8601 String -> toISOString e.g. 2013-02-04T22:44:30.652Z', () => {
  expect(dayjs().toISOString()).toBe(moment().toISOString())
})

it('Format YYYY with leading zeros', () => {
  const date = new Date('0001-01-01')
  const yearFormat = 'YYYY'
  expect(dayjs(date).format(yearFormat)).toBe(moment(date).format(yearFormat))
})
