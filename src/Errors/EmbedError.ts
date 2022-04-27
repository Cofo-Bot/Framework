export class EmbedError extends Error {
	/**
     * Create a new Embed Error
     * @since 1.0.0
     * @param message
     */
	constructor(message: string) {
		super(message);
		this.name = 'EmbedError';
	}
}
