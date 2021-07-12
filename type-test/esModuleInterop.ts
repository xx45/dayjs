import dayjs from 'dayjs/esm';

import customParseFormat from 'dayjs/esm/plugin/customParseFormat';
import duration from 'dayjs/esm/plugin/duration';
import relativeTime from 'dayjs/esm/plugin/relativeTime';

import 'dayjs/locale/es'

new dayjs.Dayjs();

dayjs.locale('es');
dayjs('2018-05-05').locale('es').format()

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
