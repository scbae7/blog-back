import * as dayjs from 'dayjs';

export const nowDateitme = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
export const aWeekAgoDatetime = () => dayjs().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss');

