import React, { useMemo } from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import './SingleMonthPicker.scss';

// This is effectively a plug-in that given a date calculates
// all of the date it needs, caches it and renders the date
// picker.

export default function SingleMonthPicker(renderProps) {
    const {
        date,
        props,
        methods,
        state
    } = renderProps;

    const months = useMemo(() =>
        DateHelper.getMonthWeekDetails(date.month, date.year)
    , [date]);

    return (
        <div className='body single-month-picker'>
            <div className='year-section'>
                <button
                    className='year-button prev-year-button'
                    onClick={() => methods.setPickerDate(DateHelper.prevYear(date))}
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <span className='year'>{months[0].year}</span>
                <button
                    className='year-button next-year-button'
                    onClick={() => methods.setPickerDate(DateHelper.nextYear(date))}
                >
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>

            <div className='month-section'>
                <button
                    className='month-button prev-month-button'
                    onClick={() => methods.setPickerDate(DateHelper.prevMonth(date))}
                >
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <span className='month'>{months[0].monthName}</span>
                <button
                    className='month-button next-month-button'
                    onClick={() => methods.setPickerDate(DateHelper.nextMonth(date))}
                >
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>

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
                    months[0].weeks.map((week, index) =>
                        <div
                            key={index}
                            className='week'
                        >
                            {
                                week.days.map(({ day, date, label, monthOffset, today }) => {
                                    const classes = [];

                                    if (props.selectionType === 'single') {
                                        if (state.selectedDate &&
                                            DateHelper.equals(state.selectedDate.start, date)) {
                                                console.info('hi');
                                                classes.push('curr-date');
                                        }
                                    } else if (props.selectionType === 'range') {
                                        if (state.selectionHover.start && state.selectionHover.end) {
                                            const hoverStart = DateHelper.isBefore(state.selectionHover.start, state.selectionHover.end)
                                                ? state.selectionHover.start
                                                : state.selectionHover.end;
                                            const hoverEnd = DateHelper.isBefore(state.selectionHover.start, state.selectionHover.end)
                                                ? state.selectionHover.end
                                                : state.selectionHover.start;

                                            if (DateHelper.equals(hoverStart, date)) {
                                                classes.push('selection-start-date-hover');
                                            }
                                            if (DateHelper.equals(hoverEnd, date)) {
                                                classes.push('selection-end-date-hover');
                                            }
                                            if (DateHelper.inRangeExclusive(date, hoverStart, hoverEnd)) {
                                                classes.push('selection-in-range-hover');
                                            }
                                        } else {
                                            if (state.selectedDate) {
                                                if (DateHelper.equals(state.selectedDate.start, date)) {
                                                    classes.push('selection-start-date');
                                                }
                                                if (DateHelper.equals(state.selectedDate.end, date)) {
                                                    classes.push('selection-end-date');
                                                }
                                                if (state.selectedDate.start &&
                                                    state.selectedDate.end &&
                                                    DateHelper.inRangeExclusive(date, state.selectedDate.start, state.selectedDate.end)) {
                                                    classes.push('selection-in-range');
                                                }
                                            }
                                        }
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
                                                today && 'today'
                                            )}
                                            aria-label={label}
                                            onClick={() => methods.setSelectedDate(date)}
                                            onMouseEnter={() => {
                                                if (state.selectionHover.start) {
                                                    console.info('Hovering', date);
                                                    methods.setSelectionHover(state.selectionHover.start, date);
                                                }
                                            }}
                                        >
                                            {day}
                                            {
                                                classes.length > 0 &&
                                                    <div
                                                        className={classNames(
                                                            'selection',
                                                            classes
                                                        )}
                                                    >
                                                        {day}
                                                    </div>
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>

            <button
                className='today-button'
                onClick={() => methods.setSelectedDate(DateHelper.today())}
            >
                Today
            </button>
        </div>
    );
}
