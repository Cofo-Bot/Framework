import moment from 'moment';
export class Logger {
	async warn(message: string) {
		process.stdout.write(
			`\x1b[2m${moment().format(
				'DD:mm:yy HH:MM:ss',
			)}\x1b[0m \x1b[33m[WARN]\x1b[0m: ${message}\n`,
		);
	}

	async debug(message: string) {
		process.stdout.write(
			`\x1b[2m${moment().format(
				'DD:mm:yy HH:MM:ss',
			)}\x1b[0m \x1b[37m[DEBUG]\x1b[37m: ${message}\n`,
		);
	}
}

/**
 * Reason Behind Usage Of process.stdout.write
 * A Faster And Better Alternative for console.warn
 * Check https://github.com/Cofo-Bot/Framework/issues/1 for more information
 */
