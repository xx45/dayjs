import Utils from '../src/utils'

const {
  prettyUnit,
  padZoneStr,
  padStart,
  fromString
} = Utils

it('PrettyUnit', () => {
  expect(prettyUnit('Days')).toBe('day')
  expect(prettyUnit('days')).toBe('day')
  expect(prettyUnit('day')).toBe('day')
  expect(prettyUnit()).toBe('')
})

it('PadZoneStr', () => {
  expect(padZoneStr(0)).toBe('+00:00')
  expect(padZoneStr(1 * 60)).toBe('-01:00')
  expect(padZoneStr(-1 * 60)).toBe('+01:00')
  expect(padZoneStr(-10 * 60)).toBe('+10:00')
  expect(padZoneStr(10 * 60)).toBe('-10:00')
  expect(padZoneStr((-5 * 60) - 30)).toBe('+05:30')
})

it('PadStart', () => {
  expect(padStart(1, 2, '0')).toBe('01')
  expect(padStart(0, 2, '0')).toBe('00')
})

it('FromString', () => {
  expect(fromString()).toBe(null)
  expect(fromString(undefined)).toBe(null)
  expect(fromString(null)).toBe(null)
  expect(fromString('ABCD-EF-GH')).toBe(null)
  expect(fromString('2018-13-25').toString()).toBe('Invalid Date')
  expect(fromString('2018-00-25').toString()).toBe('Invalid Date')
  expect(fromString('2018-02-00 00:00:00:000').toString()).toBe('Invalid Date')
  expect(fromString('2018-02-31 00:00:00:000').toString()).toBe('Invalid Date')
  expect(fromString('2018-02-14 24:00:00:000').toString()).toBe('Invalid Date')
  expect(fromString('2018-02-14 23:60:00:000').toString()).toBe('Invalid Date')
  expect(fromString('2018-02-14 23:59:60:000').toString()).toBe('Invalid Date')
  expect(fromString('2000-02-29 00:00:00:000')).toEqual(new Date(2000, 1, 29, 0, 0, 0, 0))
  expect(fromString('2018-02-14 23:59:59:000')).toEqual(new Date(2018, 1, 14, 23, 59, 59, 0))
})
