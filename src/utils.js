"use strict";

// Require Third-party Dependencies
const httpie = require("httpie");

function isNullOrUndefined(value) {
    return typeof value === "undefined" || value === null;
}

async function discoverIntuitConfiguration(url) {
    const { data } = await httpie.get(url, {
        headers: { Accept: "application/json" }
    });

    return {
        authorization_endpoint: data.authorization_endpoint,
        token_endpoint: data.token_endpoint,
        userinfo_endpoint: data.userinfo_endpoint,
        revocation_endpoint: data.revocation_endpoint
    };
}

module.exports = {
    isNullOrUndefined,
    discoverIntuitConfiguration
};

