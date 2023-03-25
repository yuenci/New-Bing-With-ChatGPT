let color = {
    creative: "linear-gradient(90deg, #904887 10.79%, #8B257E 87.08%)",
    balanced: "linear-gradient(90deg, #2870EA 10.79%, #1B4AEF 87.08%)",
    precise: "linear-gradient(90deg, #006880 10.79%, #005366 87.08%)"
}

let icon = {
    creative: "#75306c",
    balanced: "#174ae4",
    precise: "#006880"
}

class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    publish(eventName, data) {
        const eventCallbacks = this.events[eventName];
        if (eventCallbacks) {
            eventCallbacks.forEach(callback => {
                callback(data);
            });
        }
    }
}

let pubsub = new PubSub();

export { color, icon, pubsub }