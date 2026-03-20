<script lang="ts">
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
</script>

<svelte:head>
	<title>{t.howItWorks.title} - Re-zero</title>
</svelte:head>

<div class="max-w-xl mx-auto px-4 py-8">
	<div class="flex items-center justify-between mb-8">
		<h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{t.howItWorks.title}</h1>
		<a href="/" class="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">{t.howItWorks.backToTasks}</a>
	</div>

	<div class="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
		<section>
			<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t.howItWorks.whatIsTitle}</h2>
			<p>
				{t.howItWorks.whatIsText}
				<a href="http://markforster.squarespace.com/blog/2022/6/14/resistance-how-to-make-the-most-of-it-the-resistance-zero-sy.html" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 underline">{t.howItWorks.whatIsAuthor}</a>{t.howItWorks.whatIsTextAfter}
			</p>
		</section>

		<section>
			<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t.howItWorks.principlesTitle}</h2>
			<ul class="list-disc list-inside space-y-2">
				<li>
					<strong>{t.howItWorks.principleZeroResistance}</strong>{t.howItWorks.principleZeroResistanceText}
				</li>
				<li>
					<strong>{t.howItWorks.principleBottomUp}</strong>{t.howItWorks.principleBottomUpText}
				</li>
				<li>
					<strong>{t.howItWorks.principleLittleOften}</strong>{t.howItWorks.principleLittleOftenText}
				</li>
				<li>
					<strong>{t.howItWorks.principleReenter}</strong>{t.howItWorks.principleReenterText}
				</li>
				<li>
					<strong>{t.howItWorks.principleRephrase}</strong>{t.howItWorks.principleRephraseText}
				</li>
			</ul>
		</section>

		<section>
			<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t.howItWorks.howToUseTitle}</h2>
			<ol class="list-decimal list-inside space-y-3">
				<li>
					<strong>{t.howItWorks.step1Title}</strong>{t.howItWorks.step1Text}
				</li>
				<li>
					<strong>{t.howItWorks.step2Title}</strong>{t.howItWorks.step2Text}
				</li>
				<li>
					<strong>{t.howItWorks.step3Title}</strong>{t.howItWorks.step3Text}
				</li>
				<li>
					<strong>{t.howItWorks.step4Title}</strong>{t.howItWorks.step4Text}
				</li>
				<li>
					<strong>{t.howItWorks.step5Title}</strong>{t.howItWorks.step5Text}
				</li>
				<li>
					<strong>{t.howItWorks.step6Title}</strong>{t.howItWorks.step6Text}
				</li>
			</ol>
		</section>

		<section>
			<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{t.howItWorks.whyTitle}</h2>
			<p>{t.howItWorks.whyText}</p>
		</section>
	</div>
</div>
