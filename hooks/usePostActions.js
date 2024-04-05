import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useCallback } from "react";
import Share from "react-native-share";

const usePostActions = (item) => {
  const sharePost = useCallback(async () => {
    const imageAsset = await Asset.loadAsync(item.image);
    const imageBase64 = await FileSystem.readAsStringAsync(
      imageAsset[0].localUri,
      { encoding: "base64" }
    );

    Share.open({
      title: "Share Post",
      filename: `${item.place}.png`,
      url: `data:image/png;base64, ${imageBase64}`,
      failOnCancel: false,
    });
  }, [item?.place]);

  return { sharePost };
};

export default usePostActions;
