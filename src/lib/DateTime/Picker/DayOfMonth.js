import React from 'react';
import DayOfWeek from './DayOfWeek';
import range from 'lodash/range';

export default function DayOfMonth(renderProps) {
    const {
        startOfMonthWeek,
        startOfMonth,
        endOfMonth,
        numWeeks,
        ...otherProps
    } = renderProps;

    return (
        <div className='day-of-month-section'>
            <div className='header'>
                <div className='day-of-week'>Sun</div>
                <div className='day-of-week'>Mon</div>
                <div className='day-of-week'>Tue</div>
                <div className='day-of-week'>Wed</div>
                <div className='day-of-week'>Thu</div>
                <div className='day-of-week'>Fri</div>
                <div className='day-of-week'>Sat</div>
            </div>
            {
                range(0, numWeeks).map(week =>
                    <DayOfWeek
                        key={week}
                        {...otherProps}
                        startOfWeek={startOfMonthWeek}
                        startOfMonth={startOfMonth}
                        endOfMonth={endOfMonth}
                        week={week}
                    />
                )
            }
        </div>
    );
}
