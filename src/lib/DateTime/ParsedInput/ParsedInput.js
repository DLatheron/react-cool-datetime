import React, { useState } from 'react';

function formatLeadingZero(str) {
    const int = parseInt(str);
    if (int > 0 && int < 10) {
        return '0' + str;
    }

    return str;
}

export const InputTypes = {
    D: {
        type: 'number',
        min: 1,
        max: 31,
        maxLength: 2,
        pattern: '[0-9]{1,2}'
    },
    DD: {
        type: 'number',
        min: 1,
        max: 31,
        maxLength: 2,
        pattern: '[0-3]{1}[0-9]{1}',
        formatValue: formatLeadingZero
    },

    M: {
        type: 'number',
        min: 1,
        max: 12,
        maxLength: 2,
        pattern: '[0-9]{1,2}'
    },
    MM: {
        type: 'number',
        min: 1,
        max: 12,
        maxLength: 2,
        pattern: '[0-1]{1}[0-9]{1}',
        formatValue: formatLeadingZero
    },
    MMM: {
        type: 'text'
    },
    MMMM: {
        type: 'text'
    },

    YYYY: {
        type: 'number',
        min: 0,
        max: 9999,
        maxLength: 4,
        pattern: '[0-9]{4}'
     }
};

// TODO:
// - When we get to maxLength the field should skip to the next one;
// - We should check each character against the pattern and only permit characters that are valid;
// - We should implement the up and down arrows and keys ourselves so that we can wrap them;
// - If the month has been set then we should affect the max day-of-month available (same with year) - otherwise limit to 31.

export default function ParsedInput(renderProps) {
    const { props } = renderProps;

    const inputTypes = InputTypes[renderProps.type];

    const [value, setValue] = useState(
        inputTypes.formatValue
            ? inputTypes.formatValue(renderProps.value)
            : renderProps.value
    );

    return (
        <input
            type={inputTypes.type}
            min={inputTypes.min}
            max={inputTypes.max}
            maxlength={inputTypes.maxLength}
            pattern={inputTypes.pattern}
            value={value}
            onChange={event => {
                const value = event.target.value;

                setValue(value);
                renderProps.onChange(value);
            }}
            placeholder={renderProps.type}
            disabled={props.disabled}
            onBlur={() => {
                const formattedValue = inputTypes.formatValue && inputTypes.formatValue(renderProps.value, renderProps.onChange);
                if (formattedValue) {
                    renderProps.onChange(formattedValue);
                }
            }}
        />
    );
}