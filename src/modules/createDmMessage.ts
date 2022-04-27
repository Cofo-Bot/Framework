/* eslint-disable no-unused-vars */
import Eris from 'eris';

declare module 'Eris' {
    interface User {
        createMessage(content: Eris.MessageContent, file: Eris.FileContent | Eris.FileContent[] | undefined): void;
    }
}

Eris.User.prototype.createMessage = function (content: Eris.MessageContent, file: Eris.FileContent | Eris.FileContent[] | undefined) {
	return new Promise((resolve, reject) => {
		this.getDMChannel().then(channel => {
			channel.createMessage(content, file).then(resolve).catch(reject);
		}).catch(reject);
	});
};
