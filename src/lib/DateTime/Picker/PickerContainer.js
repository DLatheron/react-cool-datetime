import React from 'react';
import classNames from 'classnames';
import { DateHelper } from '../Helpers/DateHelper';
import DayOfMonth from './DayOfMonth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'


export default function PickerContainer(renderProps) {
    const {
        methods,
        state
    } = renderProps;

    const date = state.date
        ? state.date
        : DateHelper.defaultDate();

    const startOfMonth = DateHelper.startOfMonth(date);
    const startOfMonthWeek = DateHelper.startOfMonthWeek(startOfMonth);
    const endOfMonth = DateHelper.endOfMonth(startOfMonth);
    const weeksToDisplayMonth = DateHelper.weeksToDisplayMonth(startOfMonthWeek, endOfMonth);

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

                    <DayOfMonth
                        {...renderProps}
                        startOfMonthWeek={startOfMonthWeek}
                        startOfMonth={startOfMonth}
                        endOfMonth={endOfMonth}
                        numWeeks={weeksToDisplayMonth}
                        date={date}
                    />
                </div>
            </div>
        </div>
    );
}
