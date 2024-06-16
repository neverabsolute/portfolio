<script lang="ts">
	export let lang = '';

	let nodeVersion = '18.16.0';
	let pythonVersion = '3.10.11';

	let langMap: Record<string, string>;
	$: langMap = {
		js: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		jsx: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		ts: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		tsx: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		typescript: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		svelte: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		python: `<span class="dark:text-ocean-blue"> 🐍 ${pythonVersion}</span>`,
	};
</script>

{#if langMap[lang]}
	<span class="inline-block">
		via {@html langMap[lang]}
	</span>
{/if}
