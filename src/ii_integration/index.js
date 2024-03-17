import {
  AnonymousIdentity,
  SignIdentity,
  fromHex,
  toHex,
} from "@dfinity/agent";
import { Ed25519KeyIdentity, Ed25519PublicKey } from "@dfinity/identity";
import { defineElement, IILoginButton } from "@dfinity/ii-login-button";

async function main() {
  // initialize the login button
  defineElement();

  /**
   * @type {IILoginButton}
   */
  const loginButton = document.querySelector("ii-login-button");
  loginButton.addEventListener("ready", () => {
    try {
      const { internetIdentityUri, redirectUri, identity } = parseParams();

      loginButton.configure({
        createOptions: {
          identity,
        },
        loginOptions: {
          identityProvider:
            process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app"
              : `${internetIdentityUri}`,
          onSuccess: () => {
            const loginButton = document.querySelector("ii-login-button");
            const delegationIdentity = loginButton.identity;

            const delegationString = JSON.stringify(
              delegationIdentity.getDelegation().toJSON()
            );

            const encodedDelegation = encodeURIComponent(delegationString);
            const url = `${redirectUri}/redirect?delegation=${encodedDelegation}`;
            console.log(`Redirecting to ${url}`);

            //   render button to press when we're done
            const button = document.createElement("button");
            button.innerText = "Continue";
            button.addEventListener("click", () => {
              window.open(url, "_self");
            });
            document.body.appendChild(button);
          },
          onError: (error) => {
            console.log(error);
            // display as text
            renderError(error);
          },
        },
      });
    } catch (error) {
      renderError(error);
    }
  });
}

class IncompleteEd25519KeyIdentity extends SignIdentity {
  constructor(publicKey) {
    super();
    this._publicKey = publicKey;
  }

  getPublicKey() {
    return this._publicKey;
  }
}

/**
 * Parses the query string parameters from the URL.
 * @returns {{redirectUri: string; identity: SignIdentity}} The parsed query string parameters.
 */
function parseParams() {
  const url = new URL(window.location.href);
  const internetIdentityUri = decodeURIComponent(
    url.searchParams.get("internet_identity_uri")
  );
  const redirectUri = decodeURIComponent(url.searchParams.get("redirect_uri"));
  const pubKey = url.searchParams.get("pubkey");

  if (
    !redirectUri ||
    !pubKey ||
    (process.env.DFX_NETWORK !== "ic" && !internetIdentityUri) // if not on ic, we need the ii canister url
  ) {
    renderError(new Error("Missing params in query string"));
    throw new Error("Missing params in query string");
  }
  const identity = new IncompleteEd25519KeyIdentity(
    Ed25519PublicKey.fromDer(fromHex(pubKey))
  );

  return { internetIdentityUri, redirectUri, identity };
}

window.addEventListener("DOMContentLoaded", () => {
  main();
});

function renderError(error) {
  if (document.querySelector("#error")) {
    document.querySelector("#error").remove();
  }
  const errorText = document.createElement("p");
  errorText.id = "error";
  errorText.innerText = error.message;
  document.body.appendChild(errorText);
}
