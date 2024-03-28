import { Colors, Typography } from "react-native-ui-lib";

import { colors } from "./assets/styles/globalStyles";

Colors.loadColors({
  $textPrimary: colors.primary,
  $backgroundPrimaryHeavy: colors.primary,
  $backgroundDefault: colors.dark,
});

Typography.loadTypographies({
  h1: {
    fontSize: 30,
    fontWeight: "500",
    includeFontPadding: false,
  },
  h2: { fontSize: 24 },
  h3: { fontSize: 20 },
  h4: { fontSize: 16 },
  semibold: { fontWeight: "500" },
  body: { fontSize: 14 },
  emoji: { fontSize: 40 },
  globe: { fontSize: 150, includeFontPadding: false },
  profile: { fontSize: 30, fontWeight: "bold" },
  achievement: { fontSize: 60 },
});
