<script lang="ts">
	import ProjectItem from '$lib/components/ProjectItem.svelte';

	const timeZone = 'America/Chicago';
	const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
	let timeZoneToggle = false;

	$: timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: timeZoneToggle ? timeZone : undefined
	});
	$: dateFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZoneName: 'short',
		timeZone: timeZoneToggle ? timeZone : undefined
	});

	let now = new Date();
	setInterval(() => {
		now = new Date();
	}, 100);

	$: date = dateFormatter.format(now).replace(' at ', ' ');
	$: time = timeFormatter.format(now);
</script>

<svelte:head>
	<title>hi</title>
	<meta name="og:title" content="portfolio" />
	<meta name="description" content="a collection of various things" />
	<meta name="og:description" content="a collection of various things" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9f0f5" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#383838" />
</svelte:head>

<section
	class="p-8 sm:p-12 lg:p-24 lg:py-16 font-cascadia z-10 flex flex-col sm:flex-row gap-y-10 justify-between"
	data-sveltekit-preload-data="false"
>
	<div class="flex flex-col gap-7">
		<div>
			<h1 class="text-ocean-900 dark:text-ocean-100">links</h1>
			<ul class="list-disc list-inside text-ocean-700 dark:text-ocean-blue">
				<ProjectItem href="https://linkedin.com/in/atx" name="linkedin" />
				<ProjectItem href="https://github.com/neverabsolute" name="github" />
				<ProjectItem href="mailto:hello@jackson.wtf" name="email" />
			</ul>
		</div>
	</div>
	<div
		class="text-ocean-900 dark:text-ocean-300 flex flex-col items-start sm:items-end gap-3 sm:gap-7 sm:text-right"
	>
		{#if !isTimeZoneSame}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="flex flex-col items-start sm:items-end hover:underline cursor-pointer"
				on:click={() => (timeZoneToggle = !timeZoneToggle)}
			>
				<span>{date}</span>
				<span>{time} ({timeZoneToggle ? 'My' : 'Your'} Time)</span>
			</div>
		{:else}
			<div class="flex flex-col items-start sm:items-end">
				<span>{date}</span>
				<span>{time}</span>
			</div>
		{/if}
	</div>
</section>
