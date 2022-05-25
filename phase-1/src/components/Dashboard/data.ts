import type { DashboardComponent, DashboardItem } from '../../types';
import EditFiles from './components/Files/EditFiles';
import NewsFeed from './components/NewsFeed';

export const regularOptions: Array<DashboardItem> = [
  {
    title: 'News feed',
    href: '/dashboard/news_feed',
  },
  {
    title: 'View Vreel',
    href: '/',
  },
  {
    title: 'Edit Vreel',
    href: '/dashboard/edit_vreel',
    children: [
      { title: 'File Manager', href: '/dashboard/edit_vreel/files' },
      { title: 'Slides', href: '/dashboard/edit_vreel/slides' },
      { title: 'Elements', href: '/dashboard/edit_vreel/elements' },
      {
        title: 'Display Options',
        href: '/dashboard/edit_vreel/display_options',
      },
      {
        title: 'Account',
        href: '/dashboard/edit_vreel/account',
      },
    ],
  },
];

export const editOptions: Array<DashboardItem> = [
  { title: 'File Manager', href: '/dashboard/edit_vreel/files' },
  { title: 'Slides', href: '/dashboard/edit_vreel/slides' },
  { title: 'Elements', href: '/dashboard/edit_vreel/elements' },
  {
    title: 'Display Options',
    href: '/dashboard/edit_vreel/display_options',
  },
  {
    title: 'Account',
    href: '/dashboard/edit_vreel/account',
  },
];

export const advanceOptions: Array<DashboardItem> = [
  {
    title: 'Events',
    href: '/dashboard/events',
  },
  {
    title: 'Display Mode',
    href: '/dashboard/display_mode',
  },
  {
    title: 'Networks',
    href: '/dashboard/networks',
  },
  {
    title: 'Tags',
    href: '/dashboard/tags',
  },
  {
    title: 'Enterprise',
    href: '/dashboard/enterprise',
  },
];

export const footerOptions: Array<DashboardItem> = [
  {
    title: 'Analytics',
    href: '/analytics',
  },
  {
    title: 'Contacts',
    href: '/contacts',
  },
  {
    title: 'Help',
    href: '/help',
  },
];

export const components: Array<DashboardComponent> = [
  {
    title: 'news_feed',
    component: NewsFeed,
  },
  {
    title: 'files',
    component: EditFiles,
  },
];
