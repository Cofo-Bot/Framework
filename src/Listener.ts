/* eslint-disable no-unused-vars */
import {EventListeners} from 'eris';
import {Client} from './Client';

export class Listener<Key extends keyof EventListeners> {
	/**
     * Create a new Listener
     * @since 1.0.0
     * @param key
     * @param run
     */
	// eslint-disable-next-line no-useless-constructor
	constructor(
        public key: Key,
        public run: (client: Client, ...args: EventListeners[Key]) => any,
	) { }
}
