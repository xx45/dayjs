import MockDate from 'mockdate';
import dayjs from '../../src';
import isSameOrBefore from '../../src/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

beforeEach(() => {
  MockDate.set(new Date());
});

afterEach(() => {
  MockDate.reset();
});

test('is same or before without units', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2012, 3, 2, 3, 5, 5, 10)))).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 3, 2, 3, 3, 5, 10)))).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)))).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)))).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)))).toBe(true, 'day is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 1, 3, 4, 5, 10)))).toBe(false, 'day is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)))).toBe(true, 'hour is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 2, 4, 5, 10)))).toBe(false, 'hour is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)))).toBe(true, 'minute is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)))).toBe(false, 'minute is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)))).toBe(true, 'second is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 11)))).toBe(false, 'second is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)))).toBe(true, 'millisecond match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 11)))).toBe(true, 'millisecond is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 9)))).toBe(false, 'millisecond is earlier');
  expect(m.isSameOrBefore(m)).toBe(true, 'moments are the same as themselves');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore second should not change moment');
});

test('is same or before year', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year')).toBe(true, 'exact start of year');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year')).toBe(true, 'exact end of year');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year')).toBe(true, 'start of next year');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year')).toBe(false, 'end of previous year');
  expect(m.isSameOrBefore(m, 'year')).toBe(true, 'same moments are in the same year');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore year should not change moment');
});

test('is same or before month', () => {
  const m = dayjs(new Date(2011, 2, 3, 4, 5, 6, 7));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month')).toBe(true, 'exact start of month');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month')).toBe(true, 'exact end of month');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month')).toBe(true, 'start of next month');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month')).toBe(false, 'end of previous month');
  expect(m.isSameOrBefore(m, 'month')).toBe(true, 'same moments are in the same month');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore month should not change moment');
});

test('is same or before day', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'day match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 1, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 12, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day')).toBe(true, 'day is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 1, 7, 8, 9, 10)), 'day')).toBe(false, 'day is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day')).toBe(true, 'exact start of day');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day')).toBe(true, 'exact end of day');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day')).toBe(true, 'start of next day');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day')).toBe(false, 'end of previous day');
  expect(m.isSameOrBefore(m, 'day')).toBe(true, 'same moments are in the same day');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore day should not change moment');
});

test('is same or before hour', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'hour match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 12, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour')).toBe(true, 'day is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 1, 3, 8, 9, 10)), 'hour')).toBe(false, 'day is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour')).toBe(true, 'hour is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 2, 8, 9, 10)), 'hour')).toBe(false, 'hour is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour')).toBe(true, 'exact start of hour');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour')).toBe(true, 'exact end of hour');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour')).toBe(true, 'start of next hour');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour')).toBe(false, 'end of previous hour');
  expect(m.isSameOrBefore(m, 'hour')).toBe(true, 'same moments are in the same hour');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore hour should not change moment');
});

test('is same or before minute', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'minute match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 12, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute')).toBe(true, 'day is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 1, 3, 4, 9, 10)), 'minute')).toBe(false, 'day is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute')).toBe(true, 'hour is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 2, 4, 9, 10)), 'minute')).toBe(false, 'hour is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute')).toBe(true, 'minute is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 3, 9, 10)), 'minute')).toBe(false, 'minute is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute')).toBe(true, 'exact start of minute');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute')).toBe(true, 'exact end of minute');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute')).toBe(true, 'start of next minute');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute')).toBe(false, 'end of previous minute');
  expect(m.isSameOrBefore(m, 'minute')).toBe(true, 'same moments are in the same minute');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore minute should not change moment');
});

test('is same or before second', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'second match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 1, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 12, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second')).toBe(true, 'day is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 1, 3, 4, 5, 10)), 'second')).toBe(false, 'day is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second')).toBe(true, 'hour is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 2, 4, 5, 10)), 'second')).toBe(false, 'hour is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second')).toBe(true, 'minute is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 3, 5, 10)), 'second')).toBe(false, 'minute is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second')).toBe(true, 'second is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 4, 10)), 'second')).toBe(false, 'second is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second')).toBe(true, 'exact start of second');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second')).toBe(true, 'exact end of second');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second')).toBe(true, 'start of next second');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second')).toBe(false, 'end of previous second');
  expect(m.isSameOrBefore(m, 'second')).toBe(true, 'same moments are in the same second');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore second should not change moment');
});

test('is same or before millisecond', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'millisecond match');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds')).toBe(true, 'plural should work');
  expect(m.isSameOrBefore(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'year is later');
  expect(m.isSameOrBefore(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'year is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'month is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'month is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'day is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond')).toBe(false, 'day is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond')).toBe(true, 'hour is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond')).toBe(false, 'hour is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond')).toBe(true, 'minute is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond')).toBe(false, 'minute is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond')).toBe(true, 'second is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond')).toBe(false, 'second is earlier');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond')).toBe(true, 'millisecond is later');
  expect(m.isSameOrBefore(dayjs(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond')).toBe(false, 'millisecond is earlier');
  expect(m.isSameOrBefore(m, 'millisecond')).toBe(true, 'same moments are in the same millisecond');
  expect(+m).toEqual(+mCopy, 'isSameOrBefore millisecond should not change moment');
});

test('is same with invalid moments', () => {
  const m = dayjs();
  const invalid = dayjs(null);
  expect(invalid.isSameOrBefore(invalid)).toBe(false, 'invalid moments are not considered equal');
  expect(m.isSameOrBefore(invalid)).toBe(false, 'valid moment is not before invalid moment');
  expect(invalid.isSameOrBefore(m)).toBe(false, 'invalid moment is not before valid moment');
  expect(m.isSameOrBefore(invalid, 'year')).toBe(false, 'invalid moment year');
  expect(m.isSameOrBefore(invalid, 'month')).toBe(false, 'invalid moment month');
  expect(m.isSameOrBefore(invalid, 'day')).toBe(false, 'invalid moment day');
  expect(m.isSameOrBefore(invalid, 'hour')).toBe(false, 'invalid moment hour');
  expect(m.isSameOrBefore(invalid, 'minute')).toBe(false, 'invalid moment minute');
  expect(m.isSameOrBefore(invalid, 'second')).toBe(false, 'invalid moment second');
  expect(m.isSameOrBefore(invalid, 'milliseconds')).toBe(false, 'invalid moment milliseconds');
});
