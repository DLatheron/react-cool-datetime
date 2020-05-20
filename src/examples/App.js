import React, { useState } from 'react';
import { DateTime } from '../lib';
import styled from 'styled-components';
import _ from 'lodash';

import DoubleMonthPicker from '../lib/DateTime/Picker/DoubleMonthPicker';
import TwelveMonthPicker from '../lib/DateTime/Picker/TwelveMonthPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

import './App.scss';

const examples = {
    basic: {
        title: 'Basic Example',
        props: {
            open: true,
            format: '{D}/{M}/{YYYY}'
        }
    }
};

const Examples = styled.div`
`;

const Title = styled.h1`
`;

const Example = styled.div`
`;

const ExampleTitle = styled.h2`
`;

const Code = styled.pre`
`;

const Controls = styled.div`
    border: 1px solid gray;
    padding: 10px;
`;

const Checkbox = styled.div`
    margin: 5px 0;

    input {
        margin-right: 10px;
    }

    label {
        vertical-align: middle;
    }
`;

function generatePropsExampleCode(props) {
    function summariseValue(value, propertyName) {
        switch (typeof value) {
            case 'object':
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        return '[]';
                    } else {
                        return `[...${value.length} item(s)...]`
                    }
                } else {
                    return `{...object...}`;
                }

            case 'string':
                return `'${value}'`;

            case 'boolean':
                return value;

            case 'number':
                return value;

            case 'function':
                return `() => { ...custom function for ${propertyName}... }`;

            default:
                throw new Error(`Unknown value type: ${typeof value}`);
        }
    }

    function getLine(value, propertyName) {
        if (value === undefined || value === null) {
            return;
        }

        return `    ${propertyName}: ${summariseValue(value, propertyName)}`;
    }

    return [
        '{',
        _.filter(
            _.map(props, getLine),
            line => line !== undefined
        ).join(',\n'),
        '}'
    ].join('\n');
};

function App() {
    const [clear, setClear] = useState(false);
    const [prefix, setPrefix] = useState(false);
    const [suffix, setSuffix] = useState(false);
    const [handle, setHandle] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [dualMonth, setDualMonth] = useState(false);
    const [twelveMonth, setTwelveMonth] = useState(true);

    const overrides = {
        clear: clear ? () => <FontAwesomeIcon icon={faTimes} /> : null,
        prefix: prefix ? () => <FontAwesomeIcon icon={faCaretRight} /> : undefined,
        suffix: suffix ? () => <FontAwesomeIcon icon={faCaretLeft} /> : undefined,
        handle: handle ? ({ state: { open } }) => <FontAwesomeIcon icon={open ? faCaretRight : faCaretLeft} /> : undefined,
        disabled,
        datePicker: dualMonth ? DoubleMonthPicker : twelveMonth ? TwelveMonthPicker : undefined
    };

    return (
        <Examples className='app'>
            <Title>DateTime Examples</Title>
            <Example>
                <ExampleTitle>{examples.basic.title}</ExampleTitle>
                <DateTime
                    {...examples.basic.props}
                    {...overrides}
                />
                <Code>{generatePropsExampleCode({...examples.basic.props, ...overrides})}</Code>
            </Example>

            <Controls>
            {
                [
                    { id: 'clear', value: clear, type: 'checkbox', setValue: setClear, text: 'Clear Button' },
                    { id: 'prefix', value: prefix, type: 'checkbox', setValue: setPrefix, text: 'Prefix' },
                    { id: 'suffix', value: suffix, type: 'checkbox', setValue: setSuffix, text: 'Suffix' },
                    { id: 'handle', value: handle, type: 'checkbox', setValue: setHandle, text: 'Handle' },
                    { id: 'disabled', value: disabled, type: 'checkbox', setValue: setDisabled, text: 'Disabled' },
                    { id: 'dualMonth', value: dualMonth, type: 'checkbox', setValue: setDualMonth, text: 'Two Months at a time' },
                    { id: 'twelveMonth', value: twelveMonth, type: 'checkbox', setValue: setTwelveMonth, text: 'Twelve Months at a time' }
                ]
                    .map(({ id, value, type, setValue, min, max, text }) => {
                        return (
                            <Checkbox key={id}>
                                <input
                                    id={id}
                                    type={type}
                                    value={value}
                                    min={min}
                                    max={max}
                                    checked={type === 'checkbox' ? value : undefined}
                                    onChange={e => {
                                        if (type === 'checkbox') {
                                            setValue(!value);
                                        } else if (type === 'number') {
                                            setValue(parseInt(e.target.value));
                                        } else {
                                            throw new Error('Unsupported type');
                                        }
                                    }}
                                />
                                <label htmlFor={id}>{text}</label>
                            </Checkbox>
                        );
                    })
            }
            </Controls>
        </Examples>
    );
}

export default App;
