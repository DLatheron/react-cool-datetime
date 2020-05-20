import React, { useMemo } from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import range from 'lodash/range';

// This is effectively a plug-in that given a date calculates
// all of the date it needs, caches it and renders the date
// picker.

export default function DoubleMonthPicker(renderProps) {
    const {
        date,
        methods,
        state
    } = renderProps;

    const months = useMemo(() =>
        DateHelper.getMonthWeekDetails(date.month, date.year, 2)
    , [date]);

    console.info('months', months);

    return (
        <div className='body double-month-picker'>
            <div className='month-section'>
                <button
                    className='month-button prev-month-button'
                    onClick={() => methods.setPickerDate(DateHelper.prevMonth(date))}
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                {
                    months.map(({ monthName, year }, index) =>
                        <span key={index}
                            className={
                                classNames(
                                    'month',
                                    `month-${index}`
                                )
                            }
                        >
                            {monthName} {year}
                        </span>
                    )
                }
                <div className='gap' />
                <button
                    className='month-button next-month-button'
                    onClick={() => methods.setPickerDate(DateHelper.nextMonth(date))}
                >
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>

            {
                months.map(({ monthName, year, weeks }, index) =>
                    <div
                        key={index}
                        className={
                            classNames(
                                'day-of-month-section',
                                `day-of-month-${index}`
                            )
                        }
                    >
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
                            weeks.map((week, index) =>
                                <div
                                    key={index}
                                    className='week'
                                >
                                    {
                                        week.days.map(({ day, date, label, monthOffset, today }) =>
                                            <div
                                                key={day}
                                                data-id={label}
                                                className={classNames(
                                                    'day-of-month',
                                                    monthOffset === -1 && 'prev-month',
                                                    monthOffset === 0 && 'curr-month',
                                                    monthOffset === 1 && 'next-month',
                                                    state.selectedDate && DateHelper.equals(state.selectedDate, date) && 'curr-date',
                                                    today && 'today'
                                                )}
                                                aria-label={label}
                                                onClick={() => methods.setSelectedDate(date)}
                                            >
                                                {day}
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            range(weeks.length, 6).map(week =>
                                <div
                                    key={week}
                                    className='week blank-week'
                                >
                                    {
                                        range(0, 7).map(day =>
                                            <div
                                                key={day}
                                                className={classNames(
                                                    'day-of-month',
                                                    'blank-day'
                                                )}
                                            />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
            {/* <button
                className='today-button'
                onClick={() => methods.setSelectedDate(DateHelper.today())}
            >
                Today
            </button> */}
        </div>
    );
}
