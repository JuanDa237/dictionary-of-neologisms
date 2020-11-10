export interface Video {
	src: string;
	type: string;
}

export function createEmptyVideo(): Video {
	return {
		src: '',
		type: ''
	} as Video;
}
