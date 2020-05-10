import React, { useState } from 'react';

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
        formatValue: (inputType, value) => value.toString().padStart(inputType.maxLength, '0')
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
        formatValue: (inputType, value) => value.toString().padStart(inputType.maxLength, '0')
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

    const inputTypes = InputTypes[renderProps.type];

    const [value, setValue] = useState(
        inputTypes.formatValue
            ? inputTypes.formatValue(inputTypes, renderProps.value)
            : renderProps.value
    );

    return (
        <input
            ref={renderProps.inputRef}
            type='text'//{inputTypes.type}
            // min={inputTypes.max.toString()}
            // max={inputTypes.max.toString()}
            // min={inputTypes.min.toString()}
            // max={inputTypes.max.toString()}
            // maxLength={inputTypes.maxLength.toString()}
            // pattern={inputTypes.pattern}
            style={{
                width: `${inputTypes.maxLength + 1}ch`
            }}
            value={value}
            onChange={event => {
                const value = event.target.value;
                const intValue = parseInt(value);

                const lengthOk = inputTypes.maxLength === undefined || value.length <= inputTypes.maxLength;
                const minOk = inputTypes.min === undefined || intValue >= inputTypes.min;
                const maxOk = inputTypes.max === undefined || intValue <= inputTypes.max;

                if (lengthOk) {
                    setValue(value);
                }

                if (lengthOk && minOk && maxOk) {
                    renderProps.onChange(value);
                }

                // if (value.match(inputTypes.pattern)) {
                //     setValue(value);
                // }

                // if (value.match(inputTypes.pattern) && intValue >= inputTypes.min && intValue <= inputTypes.max) {
                //     setValue(value);
                // }


                // if (lengthOk && minOk && maxOk) {
                //     renderProps.onNext();
                // }
            }}
            placeholder={renderProps.type}
            disabled={props.disabled}
            onBlur={event => {
                const intValue = parseInt(value);

                const lengthOk = inputTypes.maxLength === undefined || value.length <= inputTypes.maxLength;
                const minOk = inputTypes.min === undefined || intValue >= inputTypes.min;
                const maxOk = inputTypes.max === undefined || intValue <= inputTypes.max;

                if (!lengthOk || !minOk || !maxOk) {
                    setValue(
                        inputTypes.formatValue
                            ? inputTypes.formatValue(inputTypes, renderProps.value)
                            : renderProps.value
                    );
                } else {
                    const newValue = inputTypes.formatValue
                        ? inputTypes.formatValue(inputTypes, value)
                        : renderProps.value;

                    setValue(newValue);
                    renderProps.onChange(newValue);
                }

                methods.suppressEvent(event);

                // const formattedValue = inputTypes.formatValue && inputTypes.formatValue(renderProps.value, renderProps.onChange);
                // if (formattedValue) {
                //     renderProps.onChange(formattedValue);
                // }
            }}
        />
    );
}