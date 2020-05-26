import moment from 'moment';
import range from 'lodash/range';

function formatValue(value, { format, length }) {
    if (value === undefined) {
        return '';
    } else {
        if (format === 'DD' || format === 'MM' || format === 'YY' || format === 'YYYY') {
            return value.toString().padStart(length, '0');
        } else {
            return value.toString();
        }
    }
}

const formatTypes = {
    D: {
        property: 'dayOfMonth',
        min: 1,
        max: 'daysInMonth',
        length: 2,
        format: 'D',
        formatValue
    },
    DD: {
        property: 'dayOfMonth',
        min: 1,
        max: 'daysInMonth',
        length: 2,
        format: 'DD',
        formatValue
    },
    M: {
        property: 'month',
        min: 1,
        max: 12,
        length: 2,
        format: 'M',
        formatValue
    },
    MM: {
        property: 'month',
        min: 1,
        max: 12,
        length: 2,
        format: 'MM',
        formatValue
    },
    YY: {
        property: 'year',
        min: 0,
        max: 99,
        length: 2,
        format: 'YY',
        formatValue
    },
    YYYY: {
        property: 'year',
        min: 0,
        max: 9999,
        length: 4,
        format: 'YYYY',
        formatValue
    }
}

export const DateHelper = {
    parseFormat: format => {
        const tokenRegExp = /{(.*?)}/g;
        const matches = [...format.matchAll(tokenRegExp)];

        const types = [];

        for (let i = 0; i < matches.length; ++i) {
            const match = matches[i];
            const token = match[0];
            const length = token.length;
            const type = match[1];
            const { index: start } = match;

            const end = (start + length);
            const separator = (i < matches.length - 1) && format.substr(end, matches[i + 1].index - end);

            types.push({
                ...formatTypes[type],
                defaultValue: DateHelper.today()[formatTypes[type].property],
                suffix: separator,
                separator: (separator.length === 1) ? separator : undefined
            });
        }

        return types;
    },

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

    getDayOfWeek: date => {
        const moment = DateHelper.myDateToMoment(date);

        return moment.day();
    },

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
        if (!a || !b) {
            return false;
        }

        return (
            a.dayOfMonth === b.dayOfMonth &&
            a.month === b.month &&
            a.year === b.year
        );
    },

    inRangeExclusive: (date, start, end) => {
        const dateMoment = DateHelper.myDateToMoment(date);
        const startMoment = DateHelper.myDateToMoment(start);
        const endMoment = DateHelper.myDateToMoment(end);

        return dateMoment.isAfter(startMoment) && dateMoment.isBefore(endMoment);
    },

    isBefore: (a, b) => {
        const aMoment = DateHelper.myDateToMoment(a);
        const bMoment = DateHelper.myDateToMoment(b);

        return aMoment.isBefore(bMoment);
    },

    getWeek: ({ startOfWeek, week, startOfMonth, endOfMonth }) => {
        const startOfMonthMoment = DateHelper.myDateToMoment(startOfMonth);
        const endOfMonthMoment = DateHelper.myDateToMoment(endOfMonth);
        const todayMoment = DateHelper.myDateToMoment(DateHelper.today());

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

            const today = dayMoment.isSame(todayMoment);

            days.push({
                day,
                date: DateHelper.momentToMyDate(dayMoment),
                label,
                monthOffset,
                today
            });

            return days;
        }, []);
    },

    today: () => DateHelper.momentToMyDate(moment()),

    daysInMonth: date => {
        if (!date) {
            return 31;
        }

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
    },

    getMonthWeekDetails: (month, year, numMonths = 1) => {
        const date = {
            dayOfMonth: 1,
            month,
            year
        };

        return range(0, numMonths).map(monthOffset => {
            if (monthOffset > 0) {
                ++date.month;
                if (date.month > 12) {
                    ++date.year;
                    date.month = 1;
                }
            }

            const startOfMonth = DateHelper.startOfMonth(date);
            const startOfWeek = DateHelper.startOfMonthWeek(startOfMonth);
            const endOfMonth = DateHelper.endOfMonth(startOfMonth);
            const numWeeksToDisplayMonth = DateHelper.weeksToDisplayMonth(startOfWeek, endOfMonth);

            const weeks = range(0, numWeeksToDisplayMonth).map(week => {
                return {
                    index: week,
                    days: DateHelper.getWeek({
                        startOfWeek,
                        week,
                        startOfMonth,
                        endOfMonth
                    })
                };
            });

            return {
                year: date.year,
                monthName: DateHelper.getLongMonth(date),
                weeks
            };
        });
    },

    getMonthDayDetails: (month, year, numMonths = 1) => {
        const date = {
            dayOfMonth: 1,
            month,
            year
        };

        const months = range(0, numMonths).map(monthOffset => {
            if (monthOffset > 0) {
                ++date.month;
                if (date.month > 12) {
                    ++date.year;
                    date.month = 1;
                }
            }

            const startOfMonth = DateHelper.startOfMonth(date);
            const startOfWeek = DateHelper.startOfMonthWeek(startOfMonth);
            const endOfMonth = DateHelper.endOfMonth(startOfMonth);
            const numWeeksToDisplayMonth = DateHelper.weeksToDisplayMonth(startOfWeek, endOfMonth);

            const weeks = range(0, numWeeksToDisplayMonth).map(week => {
                const days = DateHelper.getWeek({
                    startOfWeek,
                    week,
                    startOfMonth,
                    endOfMonth
                });

                return {
                    index: week,
                    days
                };
            });

            const firstDayInMonth = weeks[0].days.find(day => day.monthOffset === 0);

            return {
                year: date.year,
                month: date.month,
                monthName: DateHelper.getLongMonth(date),
                days: [].concat(...weeks.map(week => week.days)),
                firstDayInMonth: DateHelper.getDayOfWeek(firstDayInMonth.date)
            };
        });

        const monthWithLowestStartDoW = months.reduce((acc, { firstDayInMonth }) => {
            if (acc.firstDayInMonth === undefined || firstDayInMonth < acc.firstDayInMonth) {
                return {
                    month,
                    firstDayInMonth
                }
            }

            return acc;
        }, {});

        const monthThatNeedsMostDays = months.reduce((acc, { month, year, firstDayInMonth }) => {
            const date = {
                dayOfMonth: 1,
                month,
                year
            };
            const daysInMonth = DateHelper.daysInMonth(date);
            const latestDay = firstDayInMonth + daysInMonth;

            if (acc.latestDay === undefined || latestDay > acc.latestDay) {
                return {
                    month,
                    latestDay
                }
            }

            return acc;
        }, {});

        months.forEach(month => {
            month.days = month.days.slice(0, monthThatNeedsMostDays.latestDay);
        });

        return {
            months,
            skipStartDays: monthWithLowestStartDoW.firstDayInMonth,
            worstCaseNumDays: monthThatNeedsMostDays.latestDay
        };
    }
};
