import React, { useRef, useState } from 'react';

import ParsedInput from '../ParsedInput/ParsedInput';

export default function Input(renderProps) {
    const dayOfMonthRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();

    const [dayOfMonth, setDayOfMonth] = useState(10);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2020);

    return (
        <div className='input'>
            <ParsedInput
                {...renderProps}
                inputRef={dayOfMonthRef}
                type='DD'
                value={dayOfMonth}
                onChange={dayOfMonth => { console.info('dayOfMonth', dayOfMonth); setDayOfMonth(dayOfMonth); }}
                onNext={() => monthRef.current && monthRef.current.focus()}
            />
            /
            <ParsedInput
                {...renderProps}
                inputRef={monthRef}
                type='MM'
                value={month}
                onChange={month => { console.info('month', month); setMonth(month); }}
                onNext={() => yearRef.current && yearRef.current.focus()}
            />
            /
            <ParsedInput
                {...renderProps}
                inputRef={yearRef}
                type='YYYY'
                value={year}
                onChange={year => { console.info('year', year); setYear(year); }}
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