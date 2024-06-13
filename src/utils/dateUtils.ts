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

export const greetingMessage: () => string = () => {
    const date = new Date();
    const hour = date.getHours();
    let greeting: string;
    if (hour >= 0 && hour < 12) {
        greeting = 'Good Morning, ';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon, ';
    } else {
        greeting = 'Good Evening, ';
    }
    return `${greeting}`;
}


export const formatDate = () => {
    const date = new Date();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    const dateValue = date.getDate();

    return `${day}, ${month} ${dateValue}`;
}