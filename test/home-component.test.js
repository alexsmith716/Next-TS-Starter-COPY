import React, { useEffect, useReducer } from 'react';
import Home from '../src/components/Home/Home';
import { NavLinks } from '../src/components/NavBar/NavLinks';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

beforeEach(() => {
	jest.useFakeTimers()
})

afterEach(() => {
	jest.useRealTimers();
});

describe('Home Component', () => {
	it('test Masthead MastheadLink setInterval NavLinks iteration', () => {
		act(() => {
			render(<Home />);
		});

		for (const link of NavLinks) {
			act(() => {
				jest.advanceTimersByTime(2000);
			});

			expect(screen.getByTestId('mastheadLink').textContent)
				.toBe(`${link.title}`+String.fromCharCode(160)+String.fromCharCode(62)+String.fromCharCode(62));
		}
	});
});
