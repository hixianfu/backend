const dayjs = require('dayjs');

export const nowAfterThreeDays = () => {
    const now = dayjs();
    const threeDaysLater = now.add(3, 'day');
    return threeDaysLater.toDate(); 
}

export const dayjsNow = () => {
    return dayjs();
}
