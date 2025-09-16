// Basic configuration values for the demo application and Vida integration.

// Name displayed in the UI
export const APP_NAME = "Alma";

// Base URL for the Vida public API. All Vida API requests are built from this.
export const VIDA_API_BASE_URL = "https://api.vida.dev/api/v2";

// URL of the Vida web app that we embed via an iframe once the user is
// authenticated with a one‑time auth token.

// Your reseller domain name, e.g. "$username.automatedphone.ai".
export const VIDA_DOMAIN = "alma.automatedphone.ai";

// Base URL for the iframe that embeds the Vida app in the demo.
export const VIDA_EMBED_BASE_URL = `https://${VIDA_DOMAIN}/app/embed`;

// The script that powers the Vida button is inserted globally in `app/layout.js`.
export const VIDA_BUTTON_SCRIPT_SRC = `https://${VIDA_DOMAIN}/embed/button/v1/script.js`;

// Target account used by the Vida button on the landing page to demonstrate an
// outbound call. This is typically your Vida username or slug.
export const VIDA_TARGET = "alma";
