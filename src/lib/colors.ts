import defaultTheme from 'windicss/defaultTheme';

export const colors: Record<string, Record<number, string>> = {
	...defaultTheme.colors,
	gray: {
		50: '#f1f5f9',
		100: '#e2e8f0',
		200: '#cbd5e1',
		300: '#94a3b8',
		400: '#64748b',
		500: '#475569',
		600: '#374151',
		700: '#1f2937',
		800: '#111827',
		900: '#09090b',
	},
	primary: {
		50: '#F1F5F9',
		100: '#E2E8F0',
		200: '#CBD5E1',
		300: '#94A3B8',
		400: '#64748B',
		500: '#475569',
		600: '#334155',
		700: '#1E293B',
		800: '#0F172A',
		900: '#020617',
	},
};
