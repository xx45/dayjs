import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import es from '../../src/locale/es'
import znCn from '../../src/locale/zh-cn'
import localizedFormat from '../../src/plugin/localizedFormat'

dayjs.extend(localizedFormat)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Declares English localized formats', () => {
  expect(dayjs.en).toBeDefined()
  expect(dayjs.en.formats).toBeDefined();
  ['LT', 'LTS', 'L', 'LL', 'LLL', 'LLLL'].forEach(option =>
    expect(dayjs.en.formats[option]).toBeDefined())
})

it('Should not interpolate characters inside square brackets', () => {
  const date = new Date(0)
  const actualDate = dayjs(date)
  const expectedDate = moment(date)

  expect(actualDate.format('[l]')).toBe('l')
  expect(actualDate.format('YYYY [l] YYYY')).toBe('1970 l 1970')
  expect(actualDate.format('l [l] l')).toBe('1/1/1970 l 1/1/1970')
  expect(actualDate.format('[L LL LLL LLLL]')).toBe(expectedDate.format('[L LL LLL LLLL]'))


  const localeFormats = {
    L: '[MMMM MM DD dddd]'
  }
  const mockedDayJsLocale = {
    ...es,
    name: 'fake-locale',
    formats: {
      ...localeFormats
    }
  }
  const fakeDate = dayjs(date, { locale: mockedDayJsLocale })

  expect(fakeDate.locale('fake-locale').format('l')).toEqual('MMMM MM DD dddd')
})

it('Recognizes localized format options', () => {
  const { formats } = dayjs.en
  const date = dayjs();
  ['LT', 'LTS', 'L', 'LL', 'LLL', 'LLLL'].forEach(option =>
    expect(date.format(option)).toBe(date.format(formats[option])))
})

it('Uses correct English formats', () => {
  const date = new Date()
  const actualDate = dayjs(date)
  const expectedDate = moment(date);
  ['LT', 'LTS', 'L', 'LL', 'LLL', 'LLLL'].forEach(option =>
    expect(actualDate.format(option)).toBe(expectedDate.format(option)))
})

it('Uses English formats in other locales as default', () => {
  const date = new Date()
  const actualDate = dayjs(date)
  const expectedDate = moment(date)
  const mockLocale = {
    name: 'mock',
    weekdays: Array(7).fill(' '),
    months: Array(12).fill(' ')
  }
  expect(actualDate.locale(mockLocale).format('L')).toBe(expectedDate.format('L'))
})

it('Leaves the default format intact', () => {
  const date = new Date()
  const actualDate = dayjs(date)
  const expectedDate = moment(date)
  expect(actualDate.format()).toBe(expectedDate.format())
})

it('Uses the locale of the dayjs instance', () => {
  const date = new Date()
  const englishDate = dayjs(date)
  const spanishDate = dayjs(date, { locale: es })
  expect(englishDate.format('L LTS')).not.toBe(spanishDate.format('L LTS'))
})


it('Uses the localized lowercase formats if defined', () => {
  const date = new Date()
  const znDate = dayjs(date, { locale: znCn });
  ['l', 'll', 'lll', 'llll'].forEach(option => expect(znDate.format(option)).toBe(znDate.format(znCn.formats[option])))
})

it('Uses fallback to xx if xx-yy not available', () => {
  expect(dayjs('2019-02-01').locale('en-yy').format('MMMM'))
    .toBe('February')
})

it('Uses xx-yy if xx-YY is provided', () => {
  expect(dayjs('2019-02-01').locale('es-US').format('MMMM'))
    .toBe('febrero')
})

it('Uses the localized uppercase formats as a base for lowercase formats, if not defined', () => {
  const date = new Date()
  const spanishDate = dayjs(date, { locale: es });

  ['l', 'll', 'lll', 'llll'].forEach((option) => {
    const upperCaseFormat = es.formats[option.toUpperCase()]
    const adaptedFormat = upperCaseFormat.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (_, a, b) => a || b.slice(1))
    expect(spanishDate.format(option)).toBe(spanishDate.format(adaptedFormat))
  })
})
