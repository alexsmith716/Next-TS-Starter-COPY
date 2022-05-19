import NavBar from '../../src/components/NavBar/NavBar';
import { NavLinks } from '../../src/components/NavBar/NavLinks';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
	useRouter() {
		return ({
			route: '/',
			pathname: '/',
			query: '',
			asPath: '',
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn()
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null)
		});
	},
}));

describe('Navbar Component', () => {
	it('should render all NavBarNav items', () => {
		render(<NavBar />);

		expect(screen.getByText('DarkTheme')).toBeInTheDocument();

		for (const link of NavLinks) {
			expect(screen.getByText(`${link.title}`)).toBeInTheDocument();
		}

	});
});
