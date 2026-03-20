import type { Translations } from './pt-BR.js';

export const en: Translations = {
	app: {
		title: 'Re-zero',
		description: 'A task management app based on Mark Forster\'s Resistance Zero system',
	},
	sync: {
		synced: 'Synced',
		syncing: 'Syncing',
		offline: 'Offline',
		local: 'Local only',
	},
	tasks: {
		addPlaceholder: 'Add a new task...',
		add: 'Add',
		empty: 'No tasks yet. Add one above.',
		dotTitle: 'Dot this task',
		rephrase: 'Rephrase',
		delete: 'Delete',
		undotTitle: 'Undot this task',
		done: 'Done',
		reenter: 'Re-enter',
		reenterTitle: 'Re-enter with new text',
		markDone: 'Mark as done',
		dottedHeader: 'Dotted tasks',
		undotAll: 'Undot all',
	},
	header: {
		howItWorks: 'How it works',
		viewOnGitHub: 'View on GitHub',
	},
	login: {
		title: 'Login - Re-zero',
		subtitle: 'Sign in to sync across devices',
		usernamePlaceholder: 'Username',
		passwordPlaceholder: 'Password',
		submit: 'Sign in',
		submitting: 'Signing in...',
		createAccount: 'Create an account',
		useWithoutSync: 'Use without syncing',
		invalidCredentials: 'Invalid credentials',
		failed: 'Failed to sign in',
	},
	signup: {
		title: 'Create account - Re-zero',
		subtitle: 'Create an account to sync across devices',
		usernamePlaceholder: 'Username',
		passwordPlaceholder: 'Password',
		confirmPasswordPlaceholder: 'Confirm password',
		submit: 'Create account',
		submitting: 'Creating account...',
		alreadyHaveAccount: 'Already have an account? Sign in',
		passwordsMismatch: 'Passwords do not match',
		usernameTaken: 'Username already taken',
		failed: 'Failed to create account',
	},
	howItWorks: {
		title: 'How Re-zero works',
		backToTasks: 'Back to tasks',
		whatIsTitle: 'What is Resistance Zero?',
		whatIsText:
			'Resistance Zero (Re-zero) is a time management system created by',
		whatIsAuthor: 'Mark Forster',
		whatIsTextAfter:
			'. It is designed to gradually reduce resistance to harder tasks as the "easy" tasks around them are completed.',
		principlesTitle: 'Core Principles',
		principleZeroResistance:
			'Identify Zero Resistance:',
		principleZeroResistanceText:
			' Read your task list from bottom to top. Dot any task you feel absolutely no resistance to doing.',
		principleBottomUp: 'Work Bottom-Up:',
		principleBottomUpText:
			' Execute dotted tasks starting from the end of the list.',
		principleLittleOften: '"Little and Often":',
		principleLittleOftenText:
			' You don\'t need to finish a task in one go. If you feel resistance increasing, stop and move on to another task.',
		principleReenter: 'Re-enter Tasks:',
		principleReenterText:
			' If a task wasn\'t completed, rewrite it at the end of the list.',
		principleRephrase: 'Rephrase Resistance:',
		principleRephraseText:
			' If a task consistently causes resistance, rephrase it to be smaller, like "do 5 minutes of...".',
		howToUseTitle: 'How to use this app',
		step1Title: 'Add tasks:',
		step1Text:
			' Type your tasks in the input field at the top. Each task is added to the end of the list.',
		step2Title: 'Look for zero resistance:',
		step2Text:
			' Read your list from bottom to top. Click the circle next to any task you feel no resistance to doing. It will be "dotted" and move to the dotted section.',
		step3Title: 'Work on dotted tasks:',
		step3Text:
			' In the dotted section, work on the tasks. Click "Done" when a task is finished.',
		step4Title: 'Re-enter unfinished tasks:',
		step4Text:
			' If you didn\'t finish a task, click "Re-enter" to add it back to the end of the list with updated text. The original is marked as completed.',
		step5Title: 'Rephrase resistant tasks:',
		step5Text:
			' If a task keeps causing resistance, click the edit icon to rephrase it into something smaller or more approachable.',
		step6Title: 'Repeat:',
		step6Text:
			' After completing a pass, click "Undot all" to reset and scan again. The list naturally prioritizes itself as easy tasks are completed and hard tasks are rephrased into manageable pieces.',
		whyTitle: 'Why it works',
		whyText:
			'Traditional task systems ask you to prioritize. Re-zero takes the opposite approach: always do what feels easy right now. As easy tasks are removed, the tasks that once seemed hard become the "easiest remaining" and resistance drops naturally. Rephrasing resistant tasks into smaller steps further lowers the barrier. Over time, everything gets done.',
	},
} as const;
