import MockDate from 'mockdate'
import dayjs from '../../src'
import advancedFormat from '../../src/plugin/advancedFormat'
import localizedFormat from '../../src/plugin/localizedFormat'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/la'

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.locale('la')

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('Latin: Test output of month names:', () => {
  const T = [
    [1, 'ianuarius', 'ianuarii', 'ian.'],
    [2, 'februarius', 'februarii', 'feb.'],
    [3, 'martius', 'martii', 'mar.'],
    [4, 'aprilis', 'aprilis', 'apr.'],
    [5, 'maius', 'maii', 'mai.'],
    [6, 'iunius', 'iunii', 'iun.'],
    [7, 'iulius', 'iulii', 'iul.'],
    [8, 'augustus', 'augusti', 'aug.'],
    [9, 'september', 'septembris', 'sep.'],
    [10, 'october', 'octobris', 'oct.'],
    [11, 'november', 'novembris', 'nov.'],
    [12, 'december', 'decembris', 'dec.']
  ]

  it('in genitive case if day of month is output', () => {
    T.forEach((t) => {
      const dayjsDay = dayjs(['2020-', t[0], '-01'].join('')).locale('la').format('D MMMM')
      const expected = ['1 ', t[2]].join('')
      expect(dayjsDay).toBe(expected)
    })
  })

  it('in nominative if day of month is not output', () => {
    T.forEach((t) => {
      const dayjsDay = dayjs(['2020-', t[0], '-01'].join('')).locale('la').format('MMMM')
      const expected = t[1]
      expect(dayjsDay).toBe(expected)
    })
  })

  it('also as a shortcut', () => {
    T.forEach((t) => {
      const dayjsDay = dayjs(['2020-', t[0], '-01'].join('')).locale('la').format('MMM')
      const expected = t[3]
      expect(dayjsDay).toBe(expected)
    })
  })
})

it('Latin: Test relative time', () => {
  const T = [
    [44.4, 'second', 'paucæ secundæ'], // a few seconds
    [89.5, 'second', 'minuta'], // a minute
    [2, 'minute', '2 minutæ'], // 2 minutes
    [43, 'minute', '43 minutæ'], // 43 minutes
    [45, 'minute', 'hora'], // an hour
    [3, 'hour', '3 horæ'], // 3 hours
    [21, 'hour', '21 horæ'], // 21 hours
    [1, 'day', 'dies'], // a day
    [3, 'day', '3 dies'], // 3 day
    [25, 'day', '25 dies'], // 25 days
    [1, 'month', 'mensis'], // a month
    [2, 'month', '2 menses'], // 2 month
    [10, 'month', '10 menses'], // 10 month
    [1, 'year', 'annus'], // a year
    [2, 'year', '2 anni'], // 2 year
    [5, 'year', '5 anni'], // 5 year
    [18, 'month', '2 anni'] // 2 years
  ]

  T.forEach((t) => {
    // dayjs.locale('la')
    const dayjsDay = dayjs()
    const dayjsCompare = dayjs().add(t[0], t[1])
    const expectedFrom = ['abhinc ', t[2]].join('')
    const expectedTo = ['ad ', t[2]].join('')
    const expectedFromTrue = t[2]

    expect(dayjsDay.from(dayjsCompare)).toBe(expectedFrom)
    expect(dayjsDay.to(dayjsCompare)).toBe(expectedTo)
    expect(dayjsDay.from(dayjsCompare, true)).toBe(expectedFromTrue)
  })
})

it('Latin: Test ordinal numbers in day of months', () => {
  const T = [
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [7, 'VII'],
    [8, 'VIII'],
    [9, 'IX'],
    [10, 'X'],
    [20, 'XX'],
    [30, 'XXX'],
    [31, 'XXXI']
  ]

  T.forEach((t) => {
    const dayjsDay = dayjs(['2020-01-', t[0]].join('')).locale('la').format('Do')
    const expected = t[1]
    expect(dayjsDay).toBe(expected)
  })
})

describe('Latin: Test weeday names:', () => {
  const T = [
    ['2020-01-05', 'dominica', 'dominica', 'dom.'],
    ['2020-01-06', 'feria secunda', 'feria II', 'II'],
    ['2020-01-07', 'feria tertia', 'feria III', 'III'],
    ['2020-01-01', 'feria quarta', 'feria IV', 'IV'],
    ['2020-01-02', 'feria quinta', 'feria V', 'V'],
    ['2020-01-03', 'feria sexta', 'feria VI', 'VI'],
    ['2020-01-04', 'sabbato', 'sabbato', 'sab.']
  ]

  it('full weekday names', () => {
    T.forEach((t) => {
      const dayjsDay = dayjs(t[0]).format('dddd')
      const expected = t[1]
      expect(dayjsDay).toBe(expected)
    })
  })

  it('short weekday names', () => {
    T.forEach((t) => {
      const dayjsDay = dayjs(t[0]).format('ddd')
      const expected = t[2]
      expect(dayjsDay).toBe(expected)
    })
  })

  it('minimal weekday names', () => {
    T.forEach((t) => {
      const dayjsDay = dayjs(t[0]).format('dd')
      const expected = t[3]
      expect(dayjsDay).toBe(expected)
    })
  })
})

it('minimal weekday names', () => {
  const T = [
    ['LT', '15:15'],
    ['LTS', '15:15:32'],
    ['L', '1. 01. 2020'],
    ['LL', '1 ianuarii 2020'],
    ['LLL', '1 ianuarii 2020, 15:15'],
    ['LLLL', 'feria quarta, 1 ianuarii 2020, 15:15']
  ]

  T.forEach((t) => {
    const dayjsDay = dayjs('2020-01-01 15:15:32').format(t[0])
    const expected = t[1]
    expect(dayjsDay).toBe(expected)
  })
})
