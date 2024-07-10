import { unstable_flag as flag } from "@vercel/flags/next";

export const showNewTextBlock = flag({
  key: "show-new-text-block",
  decide: () => {
    return false;
  },
});
