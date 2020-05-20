import React, { useMemo } from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import range from 'lodash/range';

// This is effectively a plug-in that given a date calculates
// all of the date it needs, caches it and renders the date
// picker.

export default function TwelveMonthPicker(renderProps) {
    const {
        date,
        methods,
        state
    } = renderProps;

    const months = useMemo(() =>
        DateHelper.getMonthWeekDetails(1, date.year, 12)
    , [date]);

    console.info('months', months);

    return (
        <div className='body twelve-month-picker'>
            <div className='year-section'>
                <button
                    className='year-button prev-year-button'
                    onClick={() => methods.setPickerDate(DateHelper.prevYear(date))}
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <span className='year'>{date.year}</span>
                <button
                    className='year-button next-year-button'
                    onClick={() => methods.setPickerDate(DateHelper.nextYear(date))}
                >
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>

            <div className='month-section'>
                {
                    months.map(({ monthName, weeks }, monthIndex) => {
                        return (
                            <span key={monthIndex}
                                className='month'
                            >
                                <span className='month-name'>{monthName}</span>
                                {
                                    weeks.map((week, weekIndex) =>
                                        week.days.map(({ day, date, label, monthOffset, today }, dayIndex) =>
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
                                    )
                                }
                                {
                                    range(weeks.length, 6).map(week =>
                                        range(0, 7).map(day =>
                                            <div
                                                key={day}
                                                className={classNames(
                                                    'day-of-month',
                                                    'blank-day'
                                                )}
                                            />
                                        )
                                    )
                                }
                            </span>
                        );
                    })
                }
                {/* {
                    months.map(({ monthName, year, weeks }) =>
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
                    )
                } */}
            </div>
            {/* {
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
            } */}
            {/* <button
                className='today-button'
                onClick={() => methods.setSelectedDate(DateHelper.today())}
            >
                Today
            </button> */}
        </div>
    );
}
