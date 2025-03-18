<script lang="ts">
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

	const dimensions = 3;
	const timeZone = 'America/Chicago';
	const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;

	let timeZoneToggle = false;
	let cubes: { position: [number, number, number] }[] = [];

	const offset = (dimensions - 1) / 2;

	// Generate cube positions
	cubes = Array.from({ length: dimensions ** 3 }, (_, i) => {
		const x = i % dimensions;
		const y = Math.floor((i / dimensions) % dimensions);
		const z = Math.floor(i / dimensions ** 2);
		return {
			position: [x - offset, y - offset, z - offset]
		};
	});

	const loader = new THREE.CubeTextureLoader();
	loader.setPath('https://threejs.org/examples/textures/cube/MilkyWay/');

	const envMap = loader.load([
		'dark-s_px.jpg',
		'dark-s_nx.jpg',
		'dark-s_py.jpg',
		'dark-s_ny.jpg',
		'dark-s_pz.jpg',
		'dark-s_nz.jpg'
	]);

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
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#202020" />
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

<SC.Canvas antialias alpha shadows>
	{#each cubes as cube}
		<SC.Mesh
			geometry={new RoundedBoxGeometry(0.95, 0.95, 0.95, 8, 0.05)}
			material={new THREE.MeshPhysicalMaterial({
				color: 'black',
				metalness: 0.8,
				roughness: 0.1,
				clearcoat: 1,
				clearcoatRoughness: 0.05,
				envMap: envMap
			})}
			position={cube.position}
			castShadow
			receiveShadow
		/>
	{/each}

	<SC.PerspectiveCamera position={[5, 5, 5]} />
	<SC.AmbientLight intensity={0.4} />
	<SC.DirectionalLight intensity={0.6} position={[10, 10, 10]} />
	<SC.OrbitControls
		enablePan={false}
		enableZoom={false}
		maxPolarAngle={Math.PI * 0.8}
		autoRotate
		autoRotateSpeed={0.5}
		enableDamping
		dampingFactor={0.1}
	/>
</SC.Canvas>

<style>
	:global(canvas) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: transparent;
		z-index: 1;
	}
	section {
		position: relative;
		z-index: 2;
	}
</style>
