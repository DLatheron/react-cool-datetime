import React from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';

export default function DayOfWeek(renderProps) {
    const {
        state,
        methods
    } = renderProps;

    return (
        <div className='week'>
        {
            DateHelper.getWeek(renderProps).map(({
                day,
                date,
                label,
                monthOffset
            }) =>
                <div
                    key={label}
                    data-id={label}
                    className={classNames(
                        'day-of-month',
                        monthOffset === -1 && 'prev-month',
                        monthOffset === 0 && 'curr-month',
                        monthOffset === 1 && 'next-month',
                        state.selectedDate && DateHelper.equals(state.selectedDate, date) && 'curr-date'
                    )}
                    aria-label={label}
                    onClick={() => methods.setSelectedDate(date)}
                >
                    {day}
                </div>
            )
        }
        </div>
    );
}
