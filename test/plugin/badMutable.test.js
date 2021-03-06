import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import badMutable from '../../src/plugin/badMutable'
import dayOfYear from '../../src/plugin/dayOfYear'
import weekOfYear from '../../src/plugin/weekOfYear'
import '../../src/locale/zh-cn'

dayjs.extend(badMutable)
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('Set', () => {
  it('Setters', () => {
    const d = dayjs()
    const m = moment()
    expect(d.year()).toBe(m.year())
    d.year(2000)
    m.year(2000)
    expect(d.format()).toBe(m.format())
    d.month(1)
    m.month(1)
    expect(d.format()).toBe(m.format())
    d.day(1)
    m.day(1)
    expect(d.format()).toBe(m.format())
    d.date(1)
    m.date(1)
    expect(d.format()).toBe(m.format())
    d.hour(1)
    m.hour(1)
    expect(d.format()).toBe(m.format())
    d.minute(1)
    m.minute(1)
    expect(d.format()).toBe(m.format())
    d.second(1)
    m.second(1)
    expect(d.format()).toBe(m.format())
    d.millisecond(1)
    m.millisecond(1)
    expect(d.format()).toBe(m.format())
  })

  it('Set', () => {
    const d = dayjs()
    const m = moment()
    d.set('year', 2000)
    m.set('year', 2000)
    expect(d.format()).toBe(m.format())
    d.set('month', 12)
    m.set('month', 12)
    expect(d.format()).toBe(m.format())
    d.set('day', 1)
    m.set('day', 1)
    expect(d.format()).toBe(m.format())
    d.set('date', 1)
    m.set('date', 1)
    expect(d.format()).toBe(m.format())
    d.set('hour', 1)
    m.set('hour', 1)
    expect(d.format()).toBe(m.format())
    d.set('minute', 1)
    m.set('minute', 1)
    expect(d.format()).toBe(m.format())
    d.set('second', 1)
    m.set('second', 1)
    expect(d.format()).toBe(m.format())
    d.set('millisecond', 1)
    m.set('millisecond', 1)
    expect(d.format()).toBe(m.format())
  })
})

describe('StartOf', () => {
  it('StartOf', () => {
    const d = dayjs()
    const m = moment()
    d.startOf('year')
    m.startOf('year')
    expect(d.format()).toBe(m.format())
    d.startOf('month')
    m.startOf('month')
    expect(d.format()).toBe(m.format())
    d.startOf('day')
    m.startOf('day')
    expect(d.format()).toBe(m.format())
    d.startOf('date')
    m.startOf('date')
    expect(d.format()).toBe(m.format())
    d.startOf('hour')
    m.startOf('hour')
    expect(d.format()).toBe(m.format())
    d.startOf('minute')
    m.startOf('minute')
    expect(d.format()).toBe(m.format())
    d.startOf('second')
    m.startOf('second')
    expect(d.format()).toBe(m.format())
    d.startOf('millisecond')
    m.startOf('millisecond')
    expect(d.format()).toBe(m.format())
    d.startOf('week')
    m.startOf('week')
    expect(d.format()).toBe(m.format())
  })
})

describe('Add', () => {
  it('Add', () => {
    const d = dayjs()
    const m = moment()
    d.add(1, 'year')
    m.add(1, 'year')
    expect(d.format()).toBe(m.format())
    d.add(12, 'month')
    m.add(12, 'month')
    expect(d.format()).toBe(m.format())
    d.add(1, 'day')
    m.add(1, 'day')
    expect(d.format()).toBe(m.format())
    d.add(1, 'date')
    m.add(1, 'date')
    expect(d.format()).toBe(m.format())
    d.add(1, 'hour')
    m.add(1, 'hour')
    expect(d.format()).toBe(m.format())
    d.add(1, 'minute')
    m.add(1, 'minute')
    expect(d.format()).toBe(m.format())
    d.add(1, 'second')
    m.add(1, 'second')
    expect(d.format()).toBe(m.format())
    d.add(1, 'millisecond')
    m.add(1, 'millisecond')
    expect(d.format()).toBe(m.format())
    d.add(1, 'week')
    m.add(1, 'week')
    expect(d.format()).toBe(m.format())
  })
})

it('daysInMonth', () => {
  const d = dayjs()
  const m = moment()
  expect(d.daysInMonth()).toBe(m.daysInMonth())
  expect(d.format()).toBe(m.format())
})

it('Locale', () => {
  const d = dayjs()
  const m = moment()
  const format = 'MMMM'
  expect(d.locale()).toBe(m.locale())
  expect(d.format(format)).toBe(m.format(format))
  d.locale('zh-cn')
  m.locale('zh-cn')
  expect(d.locale()).toBe(m.locale())
  expect(d.format(format)).toBe(m.format(format))
})

it('Diff', () => {
  const d = dayjs()
  const m = moment()
  const unit = 'year'
  const d2 = d.clone().add(1, unit)
  const m2 = m.clone().add(1, unit)
  expect(d.diff(d2, unit)).toBe(-1)
  expect(m.diff(m2, unit)).toBe(-1)
})

it('isAfter isBefore isSame', () => {
  const d = dayjs()
  const format = dayjs().format()
  d.isSame(dayjs, 'year')
  expect(d.format()).toBe(format)
  expect(d.isSame()).toBe(true)
  d.isBefore(dayjs, 'hour')
  expect(d.format()).toBe(format)
  expect(d.isBefore()).toBe(false)
  d.isAfter(dayjs, 'month')
  expect(d.format()).toBe(format)
  expect(d.isAfter()).toBe(false)
})

it('DayOfYear get day won\'t change instance', () => {
  const d = dayjs()
  const format = d.format()
  d.dayOfYear()
  expect(d.format()).toBe(format)
})

it('WeekOfYear get week won\'t change instance', () => {
  const d = dayjs()
  const format = d.format()
  d.week()
  expect(d.format()).toBe(format)
})
