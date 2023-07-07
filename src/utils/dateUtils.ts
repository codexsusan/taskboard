type Months = string[];
type Days = string[];

const months: Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Nobember',
    'December'
];

const days: Days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const greetingFormattter = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}


export const formatDate = () => {
    const date = new Date();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    const dateValue = date.getDate();

    return `${day}, ${month} ${dateValue}`;
}