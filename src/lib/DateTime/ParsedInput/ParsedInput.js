import React, { useState, useEffect } from 'react';

export const InputTypes = {
    D: {
        type: 'number',
        min: 1,
        max: 31,
        maxLength: 2,
        pattern: /[1-9]{1}|[12]{1}[012]{1}|[3]{1}[01]{1}/
    },
    DD: {
        type: 'number',
        min: 1,
        max: 31,
        maxLength: 2,
        pattern: /[0]{1}[1-9]{1}|[12]{1}[012]{1}|[3]{1}[01]{1}/,
        formatValue: (inputType, value) => value && value.toString().padStart(inputType.maxLength, '0')
    },

    M: {
        type: 'number',
        min: 1,
        max: 12,
        maxLength: 2,
        pattern: /[1-9]{1}|[1]{1}[012]{1}/
    },
    MM: {
        type: 'number',
        min: 1,
        max: 12,
        maxLength: 2,
        pattern: /[0]{1}[1-9]{1}|[1]{1}[012]{1}/,
        formatValue: (inputType, value) => value && value.toString().padStart(inputType.maxLength, '0')
    },
    MMM: {
        type: 'text',
        pattern: /[a-z][A-Z]{3}/
    },
    MMMM: {
        type: 'text',
        pattern: /[a-z][A-Z]*/
    },

    YYYY: {
        type: 'number',
        min: 0,
        max: 9999,
        maxLength: 4,
        pattern: /[0-9]{4}/
     }
};

// TODO:
// - When we get to maxLength the field should skip to the next one;
// - We should check each character against the pattern and only permit characters that are valid;
// - We should implement the up and down arrows and keys ourselves so that we can wrap them;
// - If the month has been set then we should affect the max day-of-month available (same with year) - otherwise limit to 31.

export default function ParsedInput(renderProps) {
    const { methods, props } = renderProps;

    const inputType = InputTypes[renderProps.type];

    const [hasFocus, setHasFocus] = useState(false);
    const [value, setValue] = useState(
        inputType.formatValue
            ? inputType.formatValue(inputType, renderProps.value)
            : renderProps.value || ''
    );

    useEffect(() => {
        if (hasFocus) {
            return;
        }

        setValue(inputType.formatValue
            ? inputType.formatValue(inputType, renderProps.value)
            : renderProps.value || ''
        );
    }, [inputType, hasFocus, renderProps.value]);

    return (
        <input
            ref={renderProps.inputRef}
            type='text'
            style={{
                width: `${inputType.maxLength + 1}ch`
            }}
            value={value}
            onChange={event => {
                const value = event.target.value;
                const intValue = parseInt(value);

                const lengthOk = inputType.maxLength === undefined || value.length <= inputType.maxLength;
                const minOk = inputType.min === undefined || intValue >= inputType.min;
                const maxOk = inputType.max === undefined || intValue <= inputType.max;

                if (lengthOk) {
                    setValue(value);
                }

                if (lengthOk && minOk && maxOk) {
                    renderProps.onChange(intValue);
                }
            }}
            onKeyDown={event => {

                if (renderProps.onIncrement && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
                    methods.suppressEvent(event);
                }
                else if (event.key === 'ArrowRight') {
                    const position = event.target.selectionStart;
                    const length = value.length;
                    console.info('Pos:', position, length);

                    if (position === length) {
                        renderProps.onNext('start');
                    }
                }
            }}
            onKeyUp={event => {
                if (renderProps.onIncrement && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
                    methods.suppressEvent(event);
                    setValue(renderProps.onIncrement(
                        event.key === 'ArrowUp'
                            ? 1
                            : -1
                    ));
                }
                // } else if (event.key === 'ArrowRight') {
                //     const position = event.target.selectionStart;
                //     const length = value.length;
                //     console.info('Pos:', position, length);

                //     if (position === length) {
                //         renderProps.onNext();
                //     }
                // }
            }}
            placeholder={renderProps.type}
            disabled={props.disabled}
            onBlur={() => {
                setHasFocus(false);

                console.info('Blur');
                // Format on loss of input focus.
                setValue(
                    inputType.formatValue
                        ? inputType.formatValue(inputType, value)
                        : value
                );
            }}
            onFocus={() => {
                setHasFocus(true);
            }}
        />
    );
}