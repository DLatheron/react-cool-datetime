import React, { useRef, useState, useEffect } from 'react';

import NumberInput from './NumberInput';
import { DateHelper } from '../Helpers/DateHelper';

export default function Input(renderProps) {
    const {
        methods,
        props,
        state
    } = renderProps;

    const dayOfMonthRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();

    const [localCopyOfDate, setLocalCopyOfDate] = useState(state.selectedDate);

    useEffect(() => {
        setLocalCopyOfDate(state.selectedDate);
    }, [state.selectedDate]);

    const updateLocalCopyOfDate = newDate => {
        const daysInMonth = DateHelper.daysInMonth(newDate);
        if (newDate.dayOfMonth > daysInMonth) {
            newDate.dayOfMonth = daysInMonth;
        }

        console.info('newDate', newDate);

        setLocalCopyOfDate(newDate);
        methods.setSelectedDate(newDate);
    };

    const daysInMonth = DateHelper.daysInMonth(localCopyOfDate);

    const dayOfMonth = localCopyOfDate ? localCopyOfDate.dayOfMonth : undefined;
    const month = localCopyOfDate ? localCopyOfDate.month : undefined;
    const year = localCopyOfDate ? localCopyOfDate.year : undefined;
    console.info('localCopyOfDate', localCopyOfDate, dayOfMonth, month, year);

    return (
        <div className='input'>
            <NumberInput
                {...renderProps}
                inputRef={dayOfMonthRef}
                min={1}
                max={daysInMonth}
                length={2}
                disabled={props.disabled}
                value={dayOfMonth}
                onBlur={dayOfMonth => {
                    console.info('DoM onChange');
                    updateLocalCopyOfDate({
                        ...localCopyOfDate,
                        dayOfMonth
                    });
                }}
            />
            /
            <NumberInput
                {...renderProps}
                inputRef={monthRef}
                min={1}
                max={12}
                length={2}
                disabled={props.disabled}
                value={month}
                onBlur={month => {
                    console.info('month onChange');
                    updateLocalCopyOfDate({
                        ...localCopyOfDate,
                        month
                    });
                }}
            />
            /
            <NumberInput
                {...renderProps}
                inputRef={yearRef}
                type='YYYY'
                min={0}
                max={9999}
                length={4}
                disabled={props.disabled}
                value={year}
                onBlur={year => {
                    console.info('year onChange');
                    updateLocalCopyOfDate({
                        ...localCopyOfDate,
                        year
                    });
                }}
            />
        </div>
    );
}