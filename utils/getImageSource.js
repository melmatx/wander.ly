import getPlatformNetwork from "../consts/network";
import sampleImages from "../consts/sampleImages";

const getImageSource = (imageKey, imageId = 0) => {
  const baseUrl = process.env.EXPO_PUBLIC_TUNNEL_URL1 || getPlatformNetwork();
  const storageCanisterId = process.env.EXPO_PUBLIC_CANISTER_ID_STORAGE;

  return imageKey
    ? {
        uri: `${baseUrl}/assets/${imageKey}?canisterId=${storageCanisterId}`,
      }
    : sampleImages[imageId];
};

export default getImageSource;
