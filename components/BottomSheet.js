import GHBottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { forwardRef, memo, useCallback, useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { sizes } from "../assets/styles/globalStyles";

const { height } = Dimensions.get("window");

const DETACHED_INITIAL_PROPS = {
  snapPoints: ["30%"],
  detached: true,
  enablePanDownToClose: true,
  index: -1,
};

const DETACHED_INITIAL_STYLES = {
  marginHorizontal: sizes.xlarge,
};

const BottomSheet = forwardRef(
  (
    {
      children,
      detached,
      enableBlurAndroid = true,
      containerStyle,
      handleIndicatorStyle,
      zIndex,
      ...props
    },
    ref
  ) => {
    const bottomSheetBackground = useCallback(
      () => (
        <BlurView
          tint="dark"
          intensity={100}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: sizes.large, overflow: "hidden" },
          ]}
          experimentalBlurMethod={
            enableBlurAndroid ? "dimezisBlurView" : "none"
          }
        />
      ),
      [enableBlurAndroid]
    );

    const bottomSheetBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          // pressBehavior="none"
        />
      ),
      []
    );

    const sheetContainerStyle = useMemo(() => {
      return {
        zIndex,
        ...(detached && DETACHED_INITIAL_STYLES),
        ...containerStyle,
      };
    }, [containerStyle, detached, zIndex]);

    const sheetHandleIndicatorStyle = useMemo(() => {
      return {
        backgroundColor: "gray",
        ...handleIndicatorStyle,
      };
    }, [handleIndicatorStyle]);

    return (
      <GHBottomSheet
        ref={ref}
        backgroundComponent={bottomSheetBackground}
        containerStyle={sheetContainerStyle}
        handleIndicatorStyle={sheetHandleIndicatorStyle}
        {...(detached && {
          ...DETACHED_INITIAL_PROPS,
          backdropComponent: bottomSheetBackdrop,
          bottomInset: height * 0.1,
        })}
        {...props}
      >
        {children}
      </GHBottomSheet>
    );
  }
);

export default memo(BottomSheet);
