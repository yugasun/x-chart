import { msg, mode } from './worker-import';

let counter = 1;

self.onmessage = (e) => {
    if (e.data === 'ping') {
        self.postMessage({ msg: `${msg} - ${counter++}`, mode });
    } else if (e.data === 'clear') {
        counter = 1;
        self.postMessage({ msg: null, mode: null });
    }
};
