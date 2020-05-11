import moment from 'moment';

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
    }
};
