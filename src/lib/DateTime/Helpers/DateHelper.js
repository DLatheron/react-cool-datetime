import moment from 'moment';
import range from 'lodash/range';

export const DateHelper = {
    myDateToMoment: date => {
        return moment({
            date: date.dayOfMonth,
            month: (date.month - 1),
            year: date.year
        });
    },

    momentToMyDate: moment => {
        return {
            dayOfMonth: moment.date(),
            month: (moment.month() + 1),
            year: moment.year()
        };
    },

    defaultDate: () => ({
        dayOfMonth: 11,
        month: 5,
        year: 2020
    }),

    isValid: date => DateHelper.myDateToMoment(date).isValid(),

    startOfMonth: date => {
        const moment = DateHelper.myDateToMoment(date).startOf('month');

        return DateHelper.momentToMyDate(moment);
    },

    endOfMonth: date => {
        const moment = DateHelper.myDateToMoment(date).endOf('month');

        return DateHelper.momentToMyDate(moment);
    },

    startOfMonthWeek: startOfMonth => {
        const moment = DateHelper.myDateToMoment(startOfMonth);
        if (moment.day() === 0) {
            // The start of the month & start of the week already align.
            return startOfMonth;
        }
        return DateHelper.momentToMyDate(moment.startOf('week'));
    },

    getLongMonth: ({ month }) => {
        return DateHelper.myDateToMoment({
            dayOfMonth: 1,
            month,
            year: 2000
        }).format('MMMM');
    },

    getDayOfMonth: (date, plusDays, format = 'D') => {
        const moment = DateHelper.myDateToMoment(date).add(plusDays, 'days');

        return moment.format(format);
    },

    weeksToDisplayMonth: (startOfMonthWeek, endOfMonth) => {
        const startOfMonthWeekMoment = DateHelper.myDateToMoment(startOfMonthWeek);
        const endOfMonthWeekMoment = DateHelper.myDateToMoment(endOfMonth);

        return endOfMonthWeekMoment.diff(startOfMonthWeekMoment, 'weeks') + 1;
    },

    prevMonth: date => {
        const moment = DateHelper.myDateToMoment(date).subtract(1, 'month');

        return DateHelper.momentToMyDate(moment);
    },

    nextMonth: date => {
        const moment = DateHelper.myDateToMoment(date).add(1, 'month');

        return DateHelper.momentToMyDate(moment);
    },

    prevYear: date => {
        const moment = DateHelper.myDateToMoment(date).subtract(1, 'year');

        return DateHelper.momentToMyDate(moment);
    },

    nextYear: date => {
        const moment = DateHelper.myDateToMoment(date).add(1, 'year');

        return DateHelper.momentToMyDate(moment);
    },

    equals: (a, b) => {
        return (
            a.dayOfMonth === b.dayOfMonth &&
            a.month === b.month &&
            a.year === b.year
        );
    },

    getWeek: ({ startOfWeek, week, startOfMonth, endOfMonth }) => {
        const startOfMonthMoment = DateHelper.myDateToMoment(startOfMonth);
        const endOfMonthMoment = DateHelper.myDateToMoment(endOfMonth);

        const startOfWeekMoment = DateHelper.myDateToMoment(startOfWeek)
            .add(week, 'weeks');

        return range(0, 7).reduce((days, dayOfWeek) => {
            const dayMoment = moment(startOfWeekMoment).add(dayOfWeek, 'days');
            const label = dayMoment.format('DD-MMM-YYYY');
            const day = dayMoment.format('D');

            let monthOffset;

            if (dayMoment.isBefore(startOfMonthMoment)) {
                monthOffset = -1;
            } else if (dayMoment.isAfter(endOfMonthMoment)) {
                monthOffset = 1;
            } else {
                monthOffset = 0;
            }

            days.push({
                day,
                date: DateHelper.momentToMyDate(dayMoment),
                label,
                monthOffset
            });

            return days;
        }, []);
    },

    today: () => DateHelper.momentToMyDate(moment()),

    daysInMonth: date => {
        const isLeapYear = date.year === undefined || DateHelper.myDateToMoment({
            ...date,
            dayOfMonth: 1
        }).isLeapYear();
        const daysInMonth = {
            false: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            true: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        };

        const monthIndex = (date.month || 1) - 1;

        return daysInMonth[isLeapYear][monthIndex];
    },

    incDayOfMonth: (date, inc) => {
        const limit = DateHelper.daysInMonth(date);

        let dayOfMonth = date.dayOfMonth + inc;

        if (dayOfMonth > limit) {
            dayOfMonth = 1;
        } else if (dayOfMonth < 1) {
            dayOfMonth = limit;
        }

        return dayOfMonth;
    },

    incMonth: (date, inc) => {
        let month = date.month + inc;

        if (month > 12) {
            month = 1;
        } else if (month < 1) {
            month = 12;
        }

        return month;
    },

    incYear: (date, inc) => {
        let year = date.year + inc;

        if (year > 9999) {
            year = 0;
        } else if (year < 0) {
            year = 9999;
        }

        return year;
    }
};
