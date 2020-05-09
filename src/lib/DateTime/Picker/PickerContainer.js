import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function PickerContainer(renderProps) {
    const {
        state
    } = renderProps;

    return (
        <div className='picker-container'>
            <div
                className={
                    classNames(
                        'picker',
                        state.open ? 'open' : 'closed'
                    )
                }
            >
                <div className='body'>
                    <div className='year-section'>
                        <button className='year-button prev-year-button'>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <span className='year'>2020</span>
                        <button className='year-button next-year-button'>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                    </div>

                    <div className='month-section'>
                        <button className='month-button prev-month-button'>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <span className='month'>April</span>
                        <button className='month-button next-month-button'>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                    </div>

                    <div className='day-of-month-section'>
                        <div className='header'>
                            <div className='day-of-week'>Sun</div>
                            <div className='day-of-week'>Mon</div>
                            <div className='day-of-week'>Tue</div>
                            <div className='day-of-week'>Wed</div>
                            <div className='day-of-week'>Thu</div>
                            <div className='day-of-week'>Fri</div>
                            <div className='day-of-week'>Sat</div>
                        </div>
                        <div className='week'>
                            <div className='day-of-month prev-month'>30</div>
                            <div className='day-of-month prev-month'>31</div>
                            <div className='day-of-month curr-month'>1</div>
                            <div className='day-of-month curr-month'>2</div>
                            <div className='day-of-month curr-month'>3</div>
                            <div className='day-of-month curr-month'>4</div>
                            <div className='day-of-month curr-month'>5</div>
                        </div>
                        <div className='week'>
                            <div className='day-of-month curr-month'>6</div>
                            <div className='day-of-month curr-month'>7</div>
                            <div className='day-of-month curr-month'>8</div>
                            <div className='day-of-month curr-month'>9</div>
                            <div className='day-of-month curr-month'>10</div>
                            <div className='day-of-month curr-month'>11</div>
                            <div className='day-of-month curr-month'>12</div>
                        </div>
                        <div className='week'>
                            <div className='day-of-month curr-month'>13</div>
                            <div className='day-of-month curr-month'>14</div>
                            <div className='day-of-month curr-month'>15</div>
                            <div className='day-of-month curr-month'>16</div>
                            <div className='day-of-month curr-month'>17</div>
                            <div className='day-of-month curr-month'>18</div>
                            <div className='day-of-month curr-month'>19</div>
                        </div>
                        <div className='week'>
                            <div className='day-of-month curr-month'>20</div>
                            <div className='day-of-month curr-month'>21</div>
                            <div className='day-of-month curr-month'>22</div>
                            <div className='day-of-month curr-month'>23</div>
                            <div className='day-of-month curr-month'>24</div>
                            <div className='day-of-month curr-month'>25</div>
                            <div className='day-of-month curr-month'>26</div>
                        </div>
                        <div className='week'>
                            <div className='day-of-month curr-month'>27</div>
                            <div className='day-of-month curr-month'>28</div>
                            <div className='day-of-month curr-month'>29</div>
                            <div className='day-of-month curr-month'>30</div>
                            <div className='day-of-month curr-month'>31</div>
                            <div className='day-of-month next-month'>1</div>
                            <div className='day-of-month next-month'>2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
