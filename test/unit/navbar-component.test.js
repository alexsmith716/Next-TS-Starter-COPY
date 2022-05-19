import NavBar from '../../src/components/NavBar/NavBar';
import { NavLinks } from '../../src/components/NavBar/NavLinks';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
	useRouter() {
		return ({
			route: '/',
			pathname: '/',
			query: {},
			asPath: '/',
			isFallback: false,
			basePath: '',
			locale: undefined,
			locales: undefined,
			defaultLocale: undefined,
			isReady: true,
			domainLocales: undefined,
			isPreview: false,
			isLocaleDomain: false
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

// https://github.com/vercel/next.js/blob/canary/docs/api-reference/next/router.md#router-object
// test layout for media query 'max-width: 992px'
// test activeRoute highlighting
// test activeRoute home link visibility
// test 'NavBarNavLink hover background-color' for media query 'max-width: 992px'
// test Toggler onClick svg style
// add/configure Jest Styled Components
