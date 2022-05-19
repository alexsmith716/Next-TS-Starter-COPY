import Home from '../../src/components/Home/Home';
import { NavLinks } from '../../src/components/NavBar/NavLinks';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

const FAKE_TIMER_DELAY = 2500;

beforeEach(() => {
	jest.useFakeTimers();
})

afterEach(() => {
	jest.useRealTimers();
});

describe('Home Component', () => {
	it('Masthead MastheadLink setInterval iterates NavLinks', () => {
		render(<Home />);

		for (const link of NavLinks) {
			expect(screen.getByTestId('mastheadLink').textContent)
				.toBe(`${link.title}`+String.fromCharCode(160)+String.fromCharCode(62)+String.fromCharCode(62));

			act(() => {
				jest.advanceTimersByTime(FAKE_TIMER_DELAY);
			});
		}
	});

	it('should render all container content', () => {
		render(<Home />);
		expect(screen.getByText('Card Title 1')).toBeInTheDocument();
		expect(screen.getByText('Card Title 2')).toBeInTheDocument();
		expect(screen.getByText('Card Title 3')).toBeInTheDocument();
	});
});
