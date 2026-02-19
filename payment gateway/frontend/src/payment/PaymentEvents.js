
// Simple Event Bus for Payment Modal
const listeners = [];

export const paymentEvents = {
    subscribe: (callback) => {
        listeners.push(callback);
        return () => {
            const index = listeners.indexOf(callback);
            if (index > -1) listeners.splice(index, 1);
        };
    },
    emit: (event, data) => {
        listeners.forEach(cb => cb(event, data));
    }
};
