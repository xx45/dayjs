import MockDate from 'mockdate';
import dayjs from '../../src';
import isSameOrAfter from '../../src/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

beforeEach(() => {
  MockDate.set(new Date());
});

afterEach(() => {
  MockDate.reset();
});

test('is same or after year', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year')).toBe(true, 'exact start of year');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year')).toBe(true, 'exact end of year');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year')).toBe(false, 'start of next year');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year')).toBe(true, 'end of previous year');
  expect(m.isSameOrAfter(m, 'year')).toBe(true, 'same moments are in the same year');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter year should not change moment');
});

test('is same or after without units', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2012, 3, 2, 3, 5, 5, 10)))).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 3, 2, 3, 3, 5, 10)))).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)))).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)))).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)))).toBe(false, 'day is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 1, 3, 4, 5, 10)))).toBe(true, 'day is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)))).toBe(false, 'hour is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 2, 4, 5, 10)))).toBe(true, 'hour is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)))).toBe(false, 'minute is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)))).toBe(true, 'minute is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)))).toBe(false, 'second is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 11)))).toBe(true, 'second is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)))).toBe(true, 'millisecond match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 11)))).toBe(false, 'millisecond is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 9)))).toBe(true, 'millisecond is earlier');
  expect(m.isSameOrAfter(m)).toBe(true, 'moments are the same as themselves');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter second should not change moment');
});

test('is same or after month', () => {
  const m = dayjs(new Date(2011, 2, 3, 4, 5, 6, 7));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month')).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month')).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month')).toBe(true, 'exact start of month');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month')).toBe(true, 'exact end of month');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month')).toBe(false, 'start of next month');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month')).toBe(true, 'end of previous month');
  expect(m.isSameOrAfter(m, 'month')).toBe(true, 'same moments are in the same month');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter month should not change moment');
});

test('is same or after day', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'day match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 1, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day')).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 12, 2, 7, 8, 9, 10)), 'day')).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day')).toBe(false, 'day is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 1, 7, 8, 9, 10)), 'day')).toBe(true, 'day is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day')).toBe(true, 'exact start of day');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day')).toBe(true, 'exact end of day');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day')).toBe(false, 'start of next day');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day')).toBe(true, 'end of previous day');
  expect(m.isSameOrAfter(m, 'day')).toBe(true, 'same moments are in the same day');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter day should not change moment');
});

test('is same or after hour', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'hour match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 1, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour')).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 12, 2, 3, 8, 9, 10)), 'hour')).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour')).toBe(false, 'day is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 1, 3, 8, 9, 10)), 'hour')).toBe(true, 'day is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour')).toBe(false, 'hour is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 2, 8, 9, 10)), 'hour')).toBe(true, 'hour is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour')).toBe(true, 'exact start of hour');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour')).toBe(true, 'exact end of hour');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour')).toBe(false, 'start of next hour');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour')).toBe(true, 'end of previous hour');
  expect(m.isSameOrAfter(m, 'hour')).toBe(true, 'same moments are in the same hour');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter hour should not change moment');
});

test('is same or after minute', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'minute match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 1, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute')).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 12, 2, 3, 4, 9, 10)), 'minute')).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute')).toBe(false, 'day is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 1, 3, 4, 9, 10)), 'minute')).toBe(true, 'day is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute')).toBe(false, 'hour is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 2, 4, 9, 10)), 'minute')).toBe(true, 'hour is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute')).toBe(false, 'minute is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 3, 9, 10)), 'minute')).toBe(true, 'minute is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute')).toBe(true, 'exact start of minute');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute')).toBe(true, 'exact end of minute');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute')).toBe(false, 'start of next minute');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute')).toBe(true, 'end of previous minute');
  expect(m.isSameOrAfter(m, 'minute')).toBe(true, 'same moments are in the same minute');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter minute should not change moment');
});

test('is same or after second', () => {
  const m = dayjs(new Date(2011, 1, 2, 3, 4, 5, 6));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'second match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 1, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second')).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 12, 2, 3, 4, 5, 10)), 'second')).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second')).toBe(false, 'day is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 1, 3, 4, 5, 10)), 'second')).toBe(true, 'day is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second')).toBe(false, 'hour is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 2, 4, 5, 10)), 'second')).toBe(true, 'hour is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second')).toBe(false, 'minute is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 3, 5, 10)), 'second')).toBe(true, 'minute is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second')).toBe(false, 'second is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 4, 10)), 'second')).toBe(true, 'second is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second')).toBe(true, 'exact start of second');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second')).toBe(true, 'exact end of second');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second')).toBe(false, 'start of next second');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second')).toBe(true, 'end of previous second');
  expect(m.isSameOrAfter(m, 'second')).toBe(true, 'same moments are in the same second');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter second should not change moment');
});

test('is same or after millisecond', () => {
  const m = dayjs(new Date(2011, 3, 2, 3, 4, 5, 10));
  const mCopy = dayjs(m);
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'millisecond match');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds')).toBe(true, 'plural should work');
  expect(m.isSameOrAfter(dayjs(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'year is later');
  expect(m.isSameOrAfter(dayjs(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'year is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'month is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond')).toBe(true, 'month is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond')).toBe(false, 'day is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond')).toBe(true, 'day is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond')).toBe(false, 'hour is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond')).toBe(true, 'hour is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond')).toBe(false, 'minute is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond')).toBe(true, 'minute is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond')).toBe(false, 'second is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond')).toBe(true, 'second is earlier');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond')).toBe(false, 'millisecond is later');
  expect(m.isSameOrAfter(dayjs(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond')).toBe(true, 'millisecond is earlier');
  expect(m.isSameOrAfter(m, 'millisecond')).toBe(true, 'same moments are in the same millisecond');
  expect(+m).toEqual(+mCopy, 'isSameOrAfter millisecond should not change moment');
});

test('is same or after with invalid moments', () => {
  const m = dayjs();
  const invalid = dayjs(null);
  expect(invalid.isSameOrAfter(invalid)).toBe(false, 'invalid moments are not considered equal');
  expect(m.isSameOrAfter(invalid)).toBe(false, 'valid moment is not after invalid moment');
  expect(invalid.isSameOrAfter(m)).toBe(false, 'invalid moment is not after valid moment');
  expect(m.isSameOrAfter(invalid, 'year')).toBe(false, 'invalid moment year');
  expect(m.isSameOrAfter(invalid, 'month')).toBe(false, 'invalid moment month');
  expect(m.isSameOrAfter(invalid, 'day')).toBe(false, 'invalid moment day');
  expect(m.isSameOrAfter(invalid, 'hour')).toBe(false, 'invalid moment hour');
  expect(m.isSameOrAfter(invalid, 'minute')).toBe(false, 'invalid moment minute');
  expect(m.isSameOrAfter(invalid, 'second')).toBe(false, 'invalid moment second');
  expect(m.isSameOrAfter(invalid, 'milliseconds')).toBe(false, 'invalid moment milliseconds');
});
