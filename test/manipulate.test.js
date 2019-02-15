import moment from 'moment'
import MockDate from 'mockdate'
import dayjs from '../src'
import '../src/locale/zh-cn'
import '../src/locale/ar'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('StartOf EndOf', () => {
  it('StartOf EndOf Year ... with s and upper case', () => {
    const testArr = ['Year', 'year', 'YearS', 'month', 'day', 'date',
      'week', 'hour', 'minute', 'second']
    testArr.forEach((d) => {
      expect(dayjs().startOf(d).valueOf()).toBe(moment().startOf(d).valueOf())
      expect(dayjs().endOf(d).valueOf()).toBe(moment().endOf(d).valueOf())
    })
  })

  it('StartOf EndOf Week with week start setting', () => {
    expect(dayjs().locale({ name: 'test', weekStart: 1 }).startOf('week').valueOf()).toBe(moment().startOf('week').add(1, 'day').valueOf())
  })

  it('StartOf EndOf Other -> no change', () => {
    expect(dayjs().startOf('otherString').valueOf()).toBe(moment().startOf('otherString').valueOf())
    expect(dayjs().endOf('otherString').valueOf()).toBe(moment().endOf('otherString').valueOf())
  })

  it('StartOf week with locale', () => {
    const testDate = [undefined, '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15', '2019-02-16']
    const testLocale = ['zh-cn', 'ar', 'en']
    testDate.forEach((d) => {
      testLocale.forEach((l) => {
        expect(dayjs(d).locale(l).startOf('week').date())
          .toBe(moment(d).locale(l).startOf('week').date())
        expect(dayjs(d).locale(l).endOf('week').date())
          .toBe(moment(d).locale(l).endOf('week').date())
      })
    })
  })
})


it('Add Time days', () => {
  expect(dayjs().add(1, 'ms').valueOf()).toBe(moment().add(1, 'ms').valueOf())
  expect(dayjs().add(1, 'milliseconds').valueOf()).toBe(moment().add(1, 'milliseconds').valueOf())
  expect(dayjs().add(1, 's').valueOf()).toBe(moment().add(1, 's').valueOf())
  expect(dayjs().add(1, 'seconds').valueOf()).toBe(moment().add(1, 'seconds').valueOf())
  expect(dayjs().add(1, 'm').valueOf()).toBe(moment().add(1, 'm').valueOf())
  expect(dayjs().add(1, 'minutes').valueOf()).toBe(moment().add(1, 'minutes').valueOf())
  expect(dayjs().add(1, 'h').valueOf()).toBe(moment().add(1, 'h').valueOf())
  expect(dayjs().add(1, 'hours').valueOf()).toBe(moment().add(1, 'hours').valueOf())
  expect(dayjs().add(1, 'w').valueOf()).toBe(moment().add(1, 'w').valueOf())
  expect(dayjs().add(1, 'weeks').valueOf()).toBe(moment().add(1, 'weeks').valueOf())
  expect(dayjs().add(1, 'd').valueOf()).toBe(moment().add(1, 'd').valueOf())
  expect(dayjs().add(1, 'days').valueOf()).toBe(moment().add(1, 'days').valueOf())
  expect(dayjs().add(1, 'M').valueOf()).toBe(moment().add(1, 'M').valueOf())
  expect(dayjs().add(1, 'y').valueOf()).toBe(moment().add(1, 'y').valueOf())
  expect(dayjs('20111031').add(1, 'months').valueOf()).toBe(moment('20111031').add(1, 'months').valueOf())
  expect(dayjs('20160131').add(1, 'months').valueOf()).toBe(moment('20160131').add(1, 'months').valueOf())
  expect(dayjs('20160329').add(1, 'year').valueOf()).toBe(moment('20160329').add(1, 'year').valueOf())

  expect(dayjs().add('2', 'years').valueOf()).toBe(moment().add('2', 'years').valueOf())
})

it('Subtract Time days', () => {
  expect(dayjs().subtract(1, 'days').valueOf()).toBe(moment().subtract(1, 'days').valueOf())
})
