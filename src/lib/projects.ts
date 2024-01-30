import emojiRegex from 'emoji-regex';
import { log } from 'next-axiom';

import type { GitHubRepos, Project, ProjectPost, ProjectOverride} from '~/types';

export async function fetchProjects(): Promise<Array<Project> | null> {
	const response = await fetch('https://api.github.com/users/qvipin/repos', {
		headers: {
			...(process.env.GITHUB_PAT && {
				authorization: `token ${process.env.GITHUB_PAT}`,
			}),
		},
	});
	if (response.status !== 200) {
		const json = (await response.json()) as {
			documentation_url: string;
			message: string;
		};

		console.error({ error: json });
		log.error('Failed to fetch projects', {
			error: json,
		});

		return null;
	}

	const json = (await response.json()) as GitHubRepos;

	const { default: rawProjectPosts } = await import('~/data/projects.json');
	const projectPosts = rawProjectPosts as Array<ProjectPost>;
	const { default: rawProjectOverrides } = await import('~/data/projects.json');
	const projectOverrides = rawProjectOverrides as Array<ProjectOverride>;

	const projects: Array<Project> = json
		.map((repo) => {
			if (!repo.topics.includes('project')) return null;

			if (repo.archived) return null;

			// Strip the emoji suffix from the repo description
			const trimmedDescription = repo.description.split(' ');
			trimmedDescription.shift();
			const description = trimmedDescription.join(' ');

			// Check if there is a matching blog post to attach
			const repoPost =
				projectPosts.length > 0 &&
				projectPosts.find(
					(post) => post.repository.toLowerCase() === repo.full_name.toLowerCase(),
				);

				// Check if there is a matching details override
			const projectOverride =
				projectOverrides.length > 0 &&
				projectOverrides.find(
					(override) => override.repository.toLowerCase() === repo.full_name.toLowerCase(),
				);
			let description = projectOverride ? projectOverride.description : repo.description;

			if (!description) return null;
			const [emoji, ...desc] = description.split(' ');
			description = desc.join(' ');

			return {
				description,
				icon: ((): string => {
					if (!repo.description) return undefined;

					const char = repo.description.split(' ')[0];

					return emojiRegex().test(char) ? char : undefined;
				})(),
				homepage: repo.homepage ?? undefined,
				name: repo.name,
				post: repoPost ? `/blog/${repoPost.post}` : undefined,
				template: false,
				url: repo.html_url.toLowerCase(),
			} as Project;
		})
		.filter((project) => project !== null);
