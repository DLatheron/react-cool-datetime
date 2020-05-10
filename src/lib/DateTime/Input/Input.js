import React, { useState } from 'react';

import ParsedInput from '../ParsedInput/ParsedInput';

export default function Input(renderProps) {
    const [dayOfMonth, setDayOfMonth] = useState(10);
    const [month, setMonth] = useState(5);
    const [year, setYear] = useState(2020);

    return (
        <div className='input'>
            <ParsedInput
                {...renderProps}
                type='DD'
                value={dayOfMonth}
                onChange={dayOfMonth => setDayOfMonth(dayOfMonth)}
            />
            /
            <ParsedInput
                {...renderProps}
                type='MM'
                value={month}
                onChange={month => setMonth(month)}
            />
            /
            <ParsedInput
                {...renderProps}
                type='YYYY'
                value={year}
                onChange={year => setYear(year)}
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