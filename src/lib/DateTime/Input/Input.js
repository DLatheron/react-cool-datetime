import React, { useRef, useState, useEffect } from 'react';

import NumberInput from './NumberInput';
import { DateHelper } from '../Helpers/DateHelper';

export default function Input(renderProps) {
    const {
        methods,
        props,
        state
    } = renderProps;

    const formatTypes = DateHelper.parseFormat(props.format);

    const refs = {
        dayOfMonth: useRef(),
        month: useRef(),
        year: useRef()
    };

    const [localCopyOfDate, setLocalCopyOfDate] = useState(state.selectedDate.start);

    useEffect(() => {
        setLocalCopyOfDate(state.selectedDate.start);
    }, [state.selectedDate.start]);

    const updateLocalCopyOfDate = newDate => {
        const daysInMonth = DateHelper.daysInMonth(newDate);

        if (newDate.dayOfMonth > daysInMonth) {
            newDate.dayOfMonth = daysInMonth;
        }

        setLocalCopyOfDate(newDate);
        methods.setSelectedDate(newDate);
    };

    return (
        <div className='input'>
            {
                formatTypes.map(({ property, min, max, defaultValue, length, format, separator, suffix, formatValue }, index) => {
                    return (
                        <span key={format}>
                            <NumberInput
                                {...renderProps}
                                inputRef={refs[property]}
                                type={{
                                    min,
                                    max: (max === 'daysInMonth') ? DateHelper.daysInMonth(localCopyOfDate) : max,
                                    defaultValue,
                                    length,
                                    format,
                                    separator
                                }}
                                disabled={props.disabled}
                                value={localCopyOfDate ? localCopyOfDate[property].toString() : undefined}
                                onUpdateDate={newValue => {
                                    updateLocalCopyOfDate({
                                        ...localCopyOfDate,
                                        [property]: newValue
                                    });
                                }}
                                onFormat={formatValue}
                                onNext={() => {
                                    const safeNextIndex = (index + 1) % formatTypes.length;
                                    const nextRef = refs[formatTypes[safeNextIndex].property];

                                    nextRef.current.focus();
                                }}
                            />
                            {suffix && <span className='suffix'>{suffix}</span>}
                        </span>
                    );
                })
            }
        </div>
    );
}