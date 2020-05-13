import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import range from 'lodash/range';
import { DateHelper } from '../Helpers/DateHelper';

// TODO: Remove need for moment in here... by encapsulation...

export default function DayOfWeek(renderProps) {
    const {
        startOfWeek,
        startOfMonth,
        endOfMonth,
        week = 0,
        state: { selectedDate },
        methods
    } = renderProps;

    const startOfWeekMoment = DateHelper.myDateToMoment(startOfWeek);
    const startOfMonthMoment = DateHelper.myDateToMoment(startOfMonth);
    const endOfMonthMoment = DateHelper.myDateToMoment(endOfMonth);

    startOfWeekMoment.add(week, 'weeks');

    return (
        <div className='week'>
        {
            range(0, 7).map(dayOfWeek => {
                const dayMoment = moment(startOfWeekMoment).add(dayOfWeek, 'days');
                const label = dayMoment.format('DD-MMM-YYYY');

                let monthOffset;

                if (dayMoment.isBefore(startOfMonthMoment)) {
                    monthOffset = -1;
                } else if (dayMoment.isAfter(endOfMonthMoment)) {
                    monthOffset = 1;
                } else {
                    monthOffset = 0;
                }

                return (
                    <div
                        key={label}
                        data-id={label}
                        className={classNames(
                            'day-of-month',
                            monthOffset === -1 && 'prev-month',
                            monthOffset === 0 && 'curr-month',
                            monthOffset === 1 && 'next-month',
                            selectedDate && DateHelper.equals(selectedDate, DateHelper.momentToMyDate(dayMoment)) && 'curr-date'
                        )}
                        aria-label={label}
                        onClick={() => methods.setSelectedDate(DateHelper.momentToMyDate(dayMoment))}
                    >
                        {dayMoment.format('D')}
                    </div>
                );
            })
        }
        </div>
    );
}
