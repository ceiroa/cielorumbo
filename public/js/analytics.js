import { ANALYTICS_CONFIG } from "./analyticsConfig.js";

const DISTINCT_ID_STORAGE_KEY = "cielorumbo.analytics.distinctId";
const SAFE_PROPERTY_KEYS = new Set([
    "app",
    "path",
    "source",
    "enabled",
    "mode",
    "leg_count",
    "checkpoint_count",
    "route_distance_nm",
    "leg_index",
    "event_source",
]);

function analyticsIsEnabled() {
    return Boolean(ANALYTICS_CONFIG.enabled && ANALYTICS_CONFIG.posthogProjectKey);
}

export function trackEvent(eventName, properties = {}) {
    if (!analyticsIsEnabled()) {
        return;
    }

    const event = String(eventName || "").trim();
    if (!event) {
        return;
    }

    const payload = {
        api_key: ANALYTICS_CONFIG.posthogProjectKey,
        event,
        distinct_id: getDistinctId(),
        properties: sanitizeProperties({
            ...properties,
            app: "cielorumbo",
            path: window.location.pathname,
        }),
    };
    sendPostHogEvent(payload);
}

function getDistinctId() {
    const existing = window.localStorage.getItem(DISTINCT_ID_STORAGE_KEY);
    if (existing) {
        return existing;
    }

    const distinctId = `anon_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(DISTINCT_ID_STORAGE_KEY, distinctId);
    return distinctId;
}

function sanitizeProperties(properties) {
    return Object.entries(properties).reduce((safe, [key, value]) => {
        if (!SAFE_PROPERTY_KEYS.has(key)) {
            return safe;
        }

        if (typeof value === "string" || typeof value === "boolean") {
            safe[key] = value;
            return safe;
        }

        if (Number.isFinite(Number(value))) {
            safe[key] = Number(value);
        }

        return safe;
    }, {});
}

function sendPostHogEvent(payload) {
    const host = String(ANALYTICS_CONFIG.posthogHost || "").replace(/\/+$/, "");
    if (!host) {
        return;
    }

    const url = `${host}/capture/`;
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
        return;
    }

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
    }).catch(() => {});
}
