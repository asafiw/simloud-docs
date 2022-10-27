export const SITE = {
	title: 'Simloud Docs',
	description: 'Simloud Portal documentation',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: '/logo.svg',
		alt:
			'Simloud logo',
	},
	twitter: 'simloud_',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = null;

export const COMMUNITY_INVITE_URL = null;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'Onboarding': [
			{ text: 'Getting started', link: 'en/getting-started' },
			{ text: 'How to create deployment using Simloud Portal', link: 'en/create-deployment' },
			{ text: 'Simloud connection to K8s and AWS services', link: 'en/connect-to-k8s-aws' },
			{ text: 'How to use Vault', link: 'en/vault-usage' },
		],
		'Jenkins': [
			{ text: 'How to manage and assign roles to users', link: 'en/assign-roles-to-users' },
			{ text: 'How to create your own slave image from Simloud jenkins image', link: 'en/create-your-slave-image' },
			{ text: 'How to hide parameters from "build with parameters" screen', link: 'en/hide-params' },
		],
		'Kubernetes': [
			{ text: 'Kubectl port forwarding', link: 'en/kubectl-port-forwarding' },
			{ text: 'How to access logs', link: 'en/how-to-access-logs' },
		],
		'Cost saving': [
			{ text: 'Simloud cost saving configuration', link: 'en/cost-saving-configuration' },
		],
		'SimloudFiles': [
			{ text: 'Simloudfile.yaml', link: 'en/simloudfile.yaml' },
			{ text: 'Simloud-pipeline.yaml', link: 'en/simloud-pipeline.yaml' },
		],
	},
};
