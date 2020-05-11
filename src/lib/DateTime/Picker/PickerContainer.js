import React from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';
import moment from 'moment';
import range from 'lodash/range';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

// TODO: Remove need for moment in here... by encapsulation...

export function DayOfMonthPicker({
    startOfMonthWeek,
    startOfMonth,
    endOfMonth,
    numWeeks
}) {
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
                    <DayOfWeekPicker
                        key={week}
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


export function DayOfWeekPicker({
    startOfWeek,
    startOfMonth,
    endOfMonth,
    week = 0
}) {
    console.info('RenderWeek', startOfWeek, startOfMonth, endOfMonth);

    const startOfWeekMoment = DateHelper.myDateToMoment(startOfWeek);
    const startOfMonthMoment = DateHelper.myDateToMoment(startOfMonth);
    const endOfMonthMoment = DateHelper.myDateToMoment(endOfMonth);

    startOfWeekMoment.add(week, 'weeks');

    const addClasses = dayMoment => {
        if (dayMoment.isBefore(startOfMonthMoment)) {
            return 'prev-month';
        } else if (dayMoment.isAfter(endOfMonthMoment)) {
            return 'next-month'
        }
        return 'curr-month';
    }

    return (
        <div className='week'>
            {
                [0, 1, 2, 3, 4, 5, 6]
                    .map(dayOffset => {
                        const dayMoment = moment(startOfWeekMoment).add(dayOffset, 'days');
                        const label = dayMoment.format('DD-MMM-YYYY');

                        return (
                            <div
                                key={label}
                                data-id={label}
                                className={`day-of-month ${addClasses(dayMoment)}`}
                                aria-label={label}
                            >
                                {dayMoment.format('D')}
                            </div>
                        );
                    })
            }
        </div>
    );
}


export default function PickerContainer(renderProps) {
    const {
        methods,
        state
    } = renderProps;

    const date = state.date
        ? state.date
        : DateHelper.defaultDate();
        console.info('date', date);

    const startOfMonth = DateHelper.startOfMonth(date);
    const startOfMonthWeek = DateHelper.startOfMonthWeek(startOfMonth);
    const endOfMonth = DateHelper.endOfMonth(startOfMonth);
    const weeksToDisplayMonth = DateHelper.weeksToDisplayMonth(startOfMonthWeek, endOfMonth);

    console.info('startOfMonth', startOfMonth);
    console.info('startOfMonthWeek', startOfMonthWeek);
    console.info('weeksToDisplayMonth', weeksToDisplayMonth);

    return (
        <div className='picker-container'>
            <div
                className={
                    classNames(
                        'picker',
                        state.open ? 'open' : 'closed'
                    )
                }
            >
                <div className='body'>
                    <div className='year-section'>
                        <button
                            className='year-button prev-year-button'
                            onClick={() => methods.setDate(DateHelper.prevYear(date))}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <span className='year'>{date.year}</span>
                        <button
                            className='year-button next-year-button'
                            onClick={() => methods.setDate(DateHelper.nextYear(date))}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                    </div>

                    <div className='month-section'>
                        <button
                            className='month-button prev-month-button'
                            onClick={() => methods.setDate(DateHelper.prevMonth(date))}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <span className='month'>{DateHelper.getLongMonth(date)}</span>
                        <button
                            className='month-button next-month-button'
                            onClick={() => methods.setDate(DateHelper.nextMonth(date))}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                    </div>

                    <DayOfMonthPicker
                        startOfMonthWeek={startOfMonthWeek}
                        startOfMonth={startOfMonth}
                        endOfMonth={endOfMonth}
                        numWeeks={weeksToDisplayMonth}
                    />
                </div>
            </div>
        </div>
    );
}
