import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React, { memo, useMemo } from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-ui-lib";

import SocialActions from "./SocialActions";
import globalStyles, { colors, sizes } from "../assets/styles/globalStyles";
import usePostActions from "../hooks/usePostActions";
import getImageSource from "../utils/getImageSource";

const PostItem = ({ item, onPress, isUser = false }) => {
  const { claimPostPoints } = usePostActions({ item });

  const imageSource = useMemo(
    () => getImageSource(item?.imageKey, item?.id),
    [item?.imageKey, item?.id]
  );

  return (
    <Card
      backgroundColor={colors.dark}
      enableShadow={false}
      onPress={onPress}
      style={{ overflow: "hidden" }}
    >
      <Image
        source={imageSource}
        style={{ height: 150, backgroundColor: "gray" }}
        transition={100}
      />

      <View
        style={{
          paddingVertical: sizes.xlarge,
          paddingHorizontal: sizes.large,
        }}
      >
        <View style={{ rowGap: sizes.small }}>
          <Text h3>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>

        <View
          style={[
            globalStyles.center,
            globalStyles.spaceBetween,
            { marginTop: sizes.xxlarge, flexDirection: "row-reverse" },
          ]}
        >
          {isUser && (
            <Button
              label="Claim Points"
              link
              onPress={claimPostPoints}
              disabled={item.points === 0}
              style={{ opacity: item.points > 0 ? 1 : 0.5 }}
            >
              <Ionicons
                name="gift"
                size={20}
                color={item.points > 0 ? colors.primary : colors.gray}
                style={{ marginRight: sizes.small }}
              />
            </Button>
          )}

          <SocialActions item={item} />
        </View>
      </View>
    </Card>
  );
};

export default memo(PostItem);
