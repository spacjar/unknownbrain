import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'modules',
		title: 'Menu',
		translate: 'Menu',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Přehled',
				translate: 'Přehled',
				type: 'item',
				icon: 'categoryoutlined',
				url: '/prehled'
			},
			{
				id: 'category',
				title: 'Kategorie',
				translate: 'Kategorie',
				type: 'item',
				icon: 'eventsoutlined',
				url: '/category'
			},
			{
				id: 'events',
				title: 'Akce',
				translate: 'Akce',
				type: 'collapse',
				icon: 'eventsoutlined',
				url: '/events',
				children: [
					{
						id: 'eventsOnce',
						title: 'Jednorázové akce',
						translate: 'Jednorázové akce',
						type: 'item',
						url: '/events/once'
					},
					{
						id: 'eventsRegular',
						title: 'Pravidelné akce',
						translate: 'Pravidelné akce',
						type: 'item',
						url: '/events/regular'
					},
					{
						id: 'eventsTrainingGroups',
						title: 'Akce tréninkových skupin',
						translate: 'Akce tréninkových skupin',
						type: 'item',
						url: '/events/groups'
					},
					{
						id: 'eventsType',
						title: 'Typy akcí',
						translate: 'Typy akcí',
						type: 'item',
						url: '/events/type'
					}
				]
			},
			{
				id: 'users',
				title: 'Uživatelé',
				translate: 'Uživatelé',
				type: 'collapse',
				icon: 'groupoutlined',
				url: '/users',
				children: [
					{
						id: 'userMembers',
						title: 'Členové',
						translate: 'Členové',
						type: 'item',
						url: '/users/members'
					},
					{
						id: 'userPublic',
						title: 'Veřejnost',
						translate: 'Veřejnost',
						type: 'item',
						url: '/users/public'
					},
					{
						id: 'userCoaches',
						title: 'Trenéři',
						translate: 'Trenéři',
						type: 'item',
						url: '/users/coaches'
					}
				]
			},
			{
				id: 'payments',
				title: 'Transakce',
				translate: 'Transakce',
				type: 'item',
				icon: 'paymentsoutlined',
				url: '/payments'
			},
			{
				id: 'mailing',
				title: 'Mailing',
				translate: 'Mailing',
				type: 'collapse',
				icon: 'emailoutlined',
				url: '/mailing',
				children: [
					{
						id: 'mailingSend',
						title: 'Odeslané maily',
						translate: 'Odeslané maily',
						type: 'item',
						url: '/mailing/send'
					},
					{
						id: 'mailingNew',
						title: 'Nový mail',
						translate: 'Nový mail',
						type: 'item',
						url: '/mailing/new'
					},
					{
						id: 'mailingTemplates',
						title: 'Šablony',
						translate: 'Šablony',
						type: 'item',
						url: '/mailing/templates'
					}
				]
			},
			/* {
				id: 'members',
				title: 'Evidence členů',
				translate: 'MEMBERS',
				type: 'item',
				icon: 'person',
				url: '/members'
			},
			{
				id: 'calendar',
				title: 'Calendar',
				translate: 'CALENDAR',
				type: 'item',
				icon: 'today',
				url: '/calendar'
			},*/
		]
	}
];

export default navigationConfig;
