import React, { useRef, useState, useEffect } from 'react';

import NumberInput from './NumberInput';
import { DateHelper } from '../Helpers/DateHelper';

function formatValue(value, { length }) {
    if (value === undefined) {
        return ''
    } else {
        return value.toString().padStart(length, '0');
    }
}

export default function Input(renderProps) {
    const separator = '/';

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
        console.info('updateLocalCopyOfDate: daysInMonth', daysInMonth, newDate);

        if (newDate.dayOfMonth > daysInMonth) {
            newDate.dayOfMonth = daysInMonth;
        }

        setLocalCopyOfDate(newDate);
        methods.setSelectedDate(newDate);
    };

    const daysInMonth = DateHelper.daysInMonth(localCopyOfDate);
    console.info('daysInMonth', daysInMonth, localCopyOfDate);

    const dayOfMonth = localCopyOfDate ? localCopyOfDate.dayOfMonth : undefined;
    const month = localCopyOfDate ? localCopyOfDate.month : undefined;
    const year = localCopyOfDate ? localCopyOfDate.year : undefined;
    console.info('localCopyOfDate', localCopyOfDate, dayOfMonth, month, year);

    return (
        <div className='input'>
            <NumberInput
                {...renderProps}
                inputRef={dayOfMonthRef}
                type={{
                    min: 1,
                    max: daysInMonth,
                    length: 2,
                    format: 'DD',
                    separator
                }}
                disabled={props.disabled}
                value={dayOfMonth.toString()}
                onUpdateDate={dayOfMonth => {
                    console.info('DoM onChange');
                    updateLocalCopyOfDate({
                        ...localCopyOfDate,
                        dayOfMonth
                    });
                }}
                onFormat={formatValue}
                onNext={() => monthRef.current.focus()}
            />
            {separator}
            <NumberInput
                {...renderProps}
                inputRef={monthRef}
                type={{
                    min: 1,
                    max: 12,
                    length: 2,
                    format: 'MM',
                    separator
                }}
                disabled={props.disabled}
                value={month.toString()}
                onUpdateDate={month => {
                    console.info('month onChange');
                    updateLocalCopyOfDate({
                        ...localCopyOfDate,
                        month
                    });
                }}
                onFormat={formatValue}
                onNext={() => yearRef.current.focus()}
            />
            {separator}
            <NumberInput
                {...renderProps}
                inputRef={yearRef}
                type={{
                    min: 0,
                    max: 9999,
                    length: 4,
                    format: 'YYYY',
                    separator
                }}
                disabled={props.disabled}
                value={year.toString()}
                onUpdateDate={year => {
                    console.info('year onChange');
                    updateLocalCopyOfDate({
                        ...localCopyOfDate,
                        year
                    });
                }}
                onFormat={formatValue}
                onNext={() => dayOfMonthRef.current.focus()}
            />
        </div>
    );
}