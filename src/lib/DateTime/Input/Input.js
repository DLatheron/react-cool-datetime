import React, { useRef, useState, useEffect } from 'react';

import ParsedInput from '../ParsedInput/ParsedInput';

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
    console.info('localCopyOfDate', localCopyOfDate);

    useEffect(() => {
        setLocalCopyOfDate(state.selectedDate);
    }, [state.selectedDate]);

    return (
        <div className='input'>
            <ParsedInput
                {...renderProps}
                inputRef={dayOfMonthRef}
                type='DD'
                disabled={props.disabled}
                value={localCopyOfDate ? localCopyOfDate.dayOfMonth : undefined}
                onChange={dayOfMonth => {
                    const newDate = {
                        ...localCopyOfDate,
                        dayOfMonth
                    };

                    setLocalCopyOfDate(newDate);
                    methods.setSelectedDate(newDate);
                }}
                onNext={() => monthRef.current && monthRef.current.focus()}
            />
            /
            <ParsedInput
                {...renderProps}
                inputRef={monthRef}
                type='MM'
                disabled={props.disabled}
                value={localCopyOfDate ? localCopyOfDate.month : undefined}
                onChange={month => {
                    const newDate = {
                        ...localCopyOfDate,
                        month
                    };

                    setLocalCopyOfDate(newDate);
                    methods.setSelectedDate(newDate);
                }}
                onNext={() => yearRef.current && yearRef.current.focus()}
            />
            /
            <ParsedInput
                {...renderProps}
                inputRef={yearRef}
                type='YYYY'
                disabled={props.disabled}
                value={localCopyOfDate ? localCopyOfDate.year : undefined}
                onChange={year => {
                    const newDate = {
                        ...localCopyOfDate,
                        year
                    };

                    setLocalCopyOfDate(newDate);
                    methods.setSelectedDate(newDate);
                }}
                onNext={() => dayOfMonthRef.current && dayOfMonthRef.current.focus()}
            />
        </div>
        // <input
        //     ref={state.inputRef}
        //     className='input'
        //     type='text'
        //     value={state.inputValue}
        //     onChange={event => methods.setInputValue(event.target.value)}
        //     placeholder={props.inputPlaceholder}
        //     disabled={props.disabled}
        //     autoFocus
        // />
    );
}