import type { LanyardData } from 'sk-lanyard';
interface VSCodeData {
	lang?: string;
	workspace?: string;
	branch?: string;
	idling?: boolean;
}

interface Activity {
	name: string;
	start?: Date;
}

export const getCodeData = (data?: LanyardData): VSCodeData | undefined => {
	const codeActivity = data?.activities.find((a) => a.application_id === '383226320970055681');

	if (!codeActivity) {
		return undefined;
	}

	const idling = codeActivity.details === 'Idling';
	if (idling) {
		return {
			idling: true
		};
	}

	const lang = codeActivity.assets.small_text?.split(' ')[2];
	const workspace = codeActivity.state.split(" ")[1];
	// const branch = codeActivity.state.split(" ")[3];

	return {
		lang,
		workspace,
	};
};

export const getOtherActivities = (data?: LanyardData): Activity[] | undefined => {
	const otherActivities = data?.activities.filter(
		(a) => a.application_id !== '383226320970055681' && a.type === 0
	);
	return otherActivities?.map((activity) => ({
		name: activity.name,
		start: activity.timestamps ? new Date(activity.timestamps.start) : undefined
	}));
};
