import emojiRegex from 'emoji-regex';
import { log } from 'next-axiom';

import type { GitHubRepos, Project, ProjectPost } from '~/types';

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

	const projects: Array<Project> = json
		.map((repo) => {
			if (!repo.topics.includes('project')) return null;

			if (repo.archived) return null;

			const projectPost = projectPosts.find((post) => post.repository === repo.full_name);

			return {
				description: repo.description.split(' ').slice(1).join(' '), // Remove the leading emoji from the description
				icon: ((): string => {
					if (!repo.description) return undefined;
					const char = repo.description.split(' ')[0];
					return emojiRegex().test(char) ? char : undefined;
				})(),
				homepage: repo.homepage ?? undefined,
				name: repo.name,
				post: projectPost ? `/blog/${projectPost.post}` : undefined,
				template: false,
				url: repo.html_url.toLowerCase(),
			} as Project;
		})
		.filter((project) => project !== null);

	const formattedProjectPosts: Array<Project> = projectPosts
		.filter((post) => projects.every((p) => p.name !== post.repository.split(' ')[1])) // Filter out projects that are already in the projects array
		.map((post) => ({
			...post,
			description: post.description.split(' ').slice(1).join(' '), // Remove the leading emoji from the description
			icon: ((): string => {
				if (!post.description) return undefined;
				const char = post.description.split(' ')[0];
				return emojiRegex().test(char) ? char : undefined;
			})(),
			name: post.repository.split('/')[1],
			url: `https://github.com/${post.repository}`,
			post: post.post ? `/blog/${post.post}` : undefined,
		}));

	return [...projects, ...formattedProjectPosts];
}
