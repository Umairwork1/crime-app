import React from 'react';
import ReactDOM from 'react-dom';
import CrimeList from './index';
import { render, screen } from '@testing-library/react';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

it('Crime List renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CrimeList/>, div);
});

it('Crime List renders message', () => {
    render(<CrimeList />);
    expect(screen.getByText('UK CRIME TRACING APP')).toBeInTheDocument();
});