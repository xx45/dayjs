import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import isoWeek from '../../src/plugin/isoWeek'
import utc from '../../src/plugin/utc'

dayjs.extend(isoWeek)
dayjs.extend(utc)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('get isoWeek', () => {
  expect(dayjs().isoWeek()).toBe(moment().isoWeek())
})

it('set isoWeek', () => {
  expect(dayjs().isoWeek(1).valueOf()).toBe(moment().isoWeek(1).valueOf())
  expect(dayjs().isoWeek(52).valueOf()).toBe(moment().isoWeek(52).valueOf())
})

it('get isoWeekYear', () => {
  expect(dayjs().isoWeekYear()).toBe(moment().isoWeekYear())
})

it('startOf/endOf isoWeek', () => {
  const ISOWEEK = 'isoWeek'
  expect(dayjs().startOf(ISOWEEK).valueOf()).toBe(moment().startOf(ISOWEEK).valueOf())
  expect(dayjs().endOf(ISOWEEK).valueOf()).toBe(moment().endOf(ISOWEEK).valueOf())
})

it('isoWeekday', () => {
  expect(dayjs().isoWeekday()).toBe(moment().isoWeekday())
  expect(dayjs('20200301').isoWeekday(1).valueOf()).toBe(moment('20200301').isoWeekday(1).valueOf()) // Sunday this.day() -> 0
  for (let i = 0; i < 7; i += 1) {
    expect(dayjs().add(i, 'day').isoWeekday()).toBe(moment().add(i, 'day').isoWeekday())
    expect(dayjs().isoWeekday(i).valueOf()).toBe(moment().isoWeekday(i).valueOf())
    expect(dayjs().add(1, 'day').isoWeekday(i).valueOf()).toBe(moment().add(1, 'day').isoWeekday(i).valueOf())
  }
})

it('isoWeek of year', () => {
  expect(dayjs().isoWeek(1).isoWeek()).toBe(1)
  expect(dayjs().isoWeek(27).isoWeek()).toBe(27)


  expect(dayjs('20191223').isoWeekYear()).toBe(2019)
  expect(dayjs('20191223').isoWeek()).toBe(52)
  expect(dayjs('20191224').isoWeekYear()).toBe(2019)
  expect(dayjs('20191224').isoWeek()).toBe(52)
  expect(dayjs('20191225').isoWeekYear()).toBe(2019)
  expect(dayjs('20191225').isoWeek()).toBe(52)
  expect(dayjs('20191226').isoWeekYear()).toBe(2019)
  expect(dayjs('20191226').isoWeek()).toBe(52)
  expect(dayjs('20191227').isoWeekYear()).toBe(2019)
  expect(dayjs('20191227').isoWeek()).toBe(52)
  expect(dayjs('20191228').isoWeekYear()).toBe(2019)
  expect(dayjs('20191228').isoWeek()).toBe(52)
  expect(dayjs('20191229').isoWeekYear()).toBe(2019)
  expect(dayjs('20191229').isoWeek()).toBe(52)

  expect(dayjs('20191230').isoWeekYear()).toBe(2020)
  expect(dayjs('20191230').isoWeek()).toBe(1)
  expect(dayjs('20191231').isoWeekYear()).toBe(2020)
  expect(dayjs('20191231').isoWeek()).toBe(1)
  expect(dayjs('20200101').isoWeekYear()).toBe(2020)
  expect(dayjs('20200101').isoWeek()).toBe(1)
  expect(dayjs('20200102').isoWeekYear()).toBe(2020)
  expect(dayjs('20200102').isoWeek()).toBe(1)
  expect(dayjs('20200103').isoWeekYear()).toBe(2020)
  expect(dayjs('20200103').isoWeek()).toBe(1)
  expect(dayjs('20200104').isoWeekYear()).toBe(2020)
  expect(dayjs('20200104').isoWeek()).toBe(1)
  expect(dayjs('20200105').isoWeekYear()).toBe(2020)
  expect(dayjs('20200105').isoWeek()).toBe(1)

  expect(dayjs('20200106').isoWeekYear()).toBe(2020)
  expect(dayjs('20200106').isoWeek()).toBe(2)
  expect(dayjs('20200107').isoWeekYear()).toBe(2020)
  expect(dayjs('20200107').isoWeek()).toBe(2)


  expect(dayjs('20201223').isoWeekYear()).toBe(2020)
  expect(dayjs('20201223').isoWeek()).toBe(52)
  expect(dayjs('20201224').isoWeekYear()).toBe(2020)
  expect(dayjs('20201224').isoWeek()).toBe(52)
  expect(dayjs('20201225').isoWeekYear()).toBe(2020)
  expect(dayjs('20201225').isoWeek()).toBe(52)
  expect(dayjs('20201226').isoWeekYear()).toBe(2020)
  expect(dayjs('20201226').isoWeek()).toBe(52)
  expect(dayjs('20201227').isoWeekYear()).toBe(2020)
  expect(dayjs('20201227').isoWeek()).toBe(52)

  expect(dayjs('20201228').isoWeekYear()).toBe(2020)
  expect(dayjs('20201228').isoWeek()).toBe(53)
  expect(dayjs('20201229').isoWeekYear()).toBe(2020)
  expect(dayjs('20201229').isoWeek()).toBe(53)
  expect(dayjs('20201230').isoWeekYear()).toBe(2020)
  expect(dayjs('20201230').isoWeek()).toBe(53)
  expect(dayjs('20201231').isoWeekYear()).toBe(2020)
  expect(dayjs('20201231').isoWeek()).toBe(53)
  expect(dayjs('20210101').isoWeekYear()).toBe(2020)
  expect(dayjs('20210101').isoWeek()).toBe(53)
  expect(dayjs('20210102').isoWeekYear()).toBe(2020)
  expect(dayjs('20210102').isoWeek()).toBe(53)
  expect(dayjs('20210103').isoWeekYear()).toBe(2020)
  expect(dayjs('20210103').isoWeek()).toBe(53)

  expect(dayjs('20210104').isoWeekYear()).toBe(2021)
  expect(dayjs('20210104').isoWeek()).toBe(1)
  expect(dayjs('20210105').isoWeekYear()).toBe(2021)
  expect(dayjs('20210105').isoWeek()).toBe(1)
  expect(dayjs('20210106').isoWeekYear()).toBe(2021)
  expect(dayjs('20210106').isoWeek()).toBe(1)
  expect(dayjs('20210107').isoWeekYear()).toBe(2021)
  expect(dayjs('20210107').isoWeek()).toBe(1)
  expect(dayjs('20210108').isoWeekYear()).toBe(2021)
  expect(dayjs('20210108').isoWeek()).toBe(1)
  expect(dayjs('20210109').isoWeekYear()).toBe(2021)
  expect(dayjs('20210109').isoWeek()).toBe(1)
  expect(dayjs('20210110').isoWeekYear()).toBe(2021)
  expect(dayjs('20210110').isoWeek()).toBe(1)
})

it('startOf yearisoweek', () => {
  Array.from(new Array(200), (v, k) => (k + 1900).toString()).forEach((y) => {
    expect(dayjs(y, 'YYYY').startOf('yearisoweek').isoWeek()).toBe(1)
    expect(dayjs(y, 'YYYY').startOf('yearisoweek').isoWeekday()).toBe(1)
  })
})


it('utc mode', () => {
  // Wednesday, 1 January 2020 00:00:00 UTC
  const d = dayjs.utc(1577836800000).isoWeek()
  expect(d).toBe(1)
  expect(moment.utc(1577836800000).isoWeek()).toBe(d)
})
