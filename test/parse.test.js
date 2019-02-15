import moment from 'moment'
import MockDate from 'mockdate'
import dayjs from '../src'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('Parse', () => {
  it('Now', () => {
    expect(dayjs().valueOf()).toBe(moment().valueOf())
  })

  it('String 20130208', () => {
    global.console.warn = jest.genMockFunction()// moment.js '2018-4-1 1:1:1:22' will throw warn
    let d = '20130108'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())
    d = '2018-04-24'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())
    d = '2018-04-24 11:12'
    expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend
    d = '2018-05-02 11:12:13'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())
    d = '2018-05-02 11:12:13.998'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf())
    d = '2018-4-1'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf()) // not recommend
    d = '2018-4-1 11:12'
    expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend
    d = '2018-4-1 1:1:1:223'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf()) // not recommend
    d = '2018-01'
    expect(dayjs(d).valueOf()).toBe(moment(d).valueOf()) // not recommend
    d = '2018'
    expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend
    d = '2018-05-02T11:12:13Z' // should go direct to new Date() rather our regex
    expect(dayjs(d).format()).toBe(moment(d).format()) // not recommend
  })

  it('String ISO 8601 date, time and zone', () => {
    const time = '2018-04-04T16:00:00.000Z'
    expect(dayjs(time).valueOf()).toBe(moment(time).valueOf())
  })

  it('String Other, Null and isValid', () => {
    global.console.warn = jest.genMockFunction()// moment.js otherString will throw warn
    expect(dayjs('otherString').toString().toLowerCase()).toBe(moment('otherString').toString().toLowerCase())
    expect(dayjs().isValid()).toBe(true)
    expect(dayjs('').isValid()).toBe(false)
    expect(dayjs('otherString').isValid()).toBe(false)
    expect(dayjs('2018-2-28 12:34:56:789').isValid()).toBe(true)
    expect(dayjs('2018-2-28').isValid()).toBe(true)
    expect(dayjs('2018-2-31 12:34:56:789').isValid()).toBe(false)
    expect(dayjs('2018-2-31').isValid()).toBe(false)
    expect(dayjs(null).toString().toLowerCase()).toBe(moment(null).toString().toLowerCase())
  })
})

it('Unix Timestamp Number (milliseconds) 1523520536000', () => {
  const timestamp = 1523520536000
  expect(dayjs(timestamp).valueOf()).toBe(moment(timestamp).valueOf())
})

it('Unix Timestamp Number (seconds) 1318781876', () => {
  const timestamp1 = 1318781876
  const timestamp2 = 1318781876.721
  expect(dayjs.unix(timestamp1).valueOf()).toBe(moment.unix(timestamp1).valueOf())
  expect(dayjs.unix(timestamp2).valueOf()).toBe(moment.unix(timestamp2).valueOf())
})

it('String and Number 20180101', () => {
  expect(dayjs(20180101).valueOf()).toBe(moment(20180101).valueOf())
  expect(dayjs('20180101').valueOf()).toBe(moment('20180101').valueOf())
})

it('Number 0', () => {
  expect(dayjs(0).valueOf()).toBe(moment(0).valueOf())
})

it('Clone not affect each other', () => {
  const base = dayjs(20170101)
  const year = base.year()
  const another = base.set('year', year + 1)
  expect(another.unix() - base.unix()).toBe(31536000)
})

it('Clone with same value', () => {
  const base = dayjs()
  const year = base.year()
  const newBase = base.set('year', year + 1)
  const another = newBase.clone()
  expect(newBase.toString()).toBe(another.toString())
})
