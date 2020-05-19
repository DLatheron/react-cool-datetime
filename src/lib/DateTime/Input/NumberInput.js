import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

NumberInput.propTypes = {
    inputRef: PropTypes.object,
    value: PropTypes.string,
    type: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
        length: PropTypes.number,
        format: PropTypes.string,
        separator: PropTypes.string
    }),
    onChange: PropTypes.func,
    onUpdateDate: PropTypes.func,
    onNext: PropTypes.func,
    onFormat: PropTypes.func
};

export default function NumberInput(renderProps) {
    const {
        methods,
        props,
        onFormat,
        type,
        value
    } = renderProps;
    const {
        format,
        length,
        max,
        min,
        defaultValue,
        separator
    } = type;

    const [localValue, setLocalValue] = useState(onFormat(value, type));

    const cascadeNewValueToParent = newValue => {
        let intValue = parseInt(newValue);
        console.info('intValue', intValue, defaultValue);
        if (isNaN(intValue)) {
            intValue = defaultValue;
        } else if (intValue > max) {
            intValue = max;
        } else if (intValue < min) {
            intValue = min;
        }

        setLocalValue(onFormat(intValue, type));
        renderProps.onUpdateDate(intValue);
    };

    useEffect(() => {
        setLocalValue(onFormat(value, type));
    }, [onFormat, value, type]);

    return (
        <input
            ref={renderProps.inputRef}
            disabled={props.disabled}
            className={
                classNames(
                    'number-input',
                    format
                )
            }
            type='text'
            value={localValue || ''}
            onChange={event => {
                const newValue = event.target.value;
                if (newValue.length <= length) {
                    const intValue = parseInt(newValue);

                    if (isNaN(intValue)) {
                        setLocalValue('');
                    } else {
                        setLocalValue(newValue);
                    }
                }
            }}
            placeholder={type.format}
            onKeyDown={event => {
                let suppress = false;

                switch (event.key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        suppress = true;
                        break;

                    default:
                        suppress = false;
                        break;
                }

                if (suppress) {
                    methods.suppressEvent(event);
                }
            }}
            onKeyUp={event => {
                if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    const intValue = parseInt(localValue);
                    if (!isNaN(intValue)) {
                        if (event.key === 'ArrowUp' && intValue < max) {
                            cascadeNewValueToParent(intValue + 1);
                        } else if (event.key === 'ArrowDown' && intValue > min) {
                            cascadeNewValueToParent(intValue - 1);
                        }
                    }
                }
            }}
            onKeyPress={event => {
                let suppress = true;

                switch (event.key) {
                    case 'Enter':
                    case separator:
                        renderProps.onNext();
                        break;

                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        suppress = false;
                        break;

                    default:
                        break;
                }

                if (suppress) {
                    methods.suppressEvent(event);
                }
            }}
            onFocus={() => {
                renderProps.inputRef.current.selectionStart = 0;
                renderProps.inputRef.current.selectionEnd = length;
            }}
            onBlur={() => {
                cascadeNewValueToParent(localValue);
            }}
        />
    );
}
