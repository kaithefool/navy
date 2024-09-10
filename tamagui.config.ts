import { config as configBase } from "@tamagui/config";
import { createTamagui } from "tamagui";

const config = createTamagui(configBase);

export default config;

export type Conf = typeof config;

// declare module 'tamagui' {
//   // or '@tamagui/core'
//   // overrides TamaguiCustomConfig so your custom types
//   // work everywhere you import `tamagui`
//   interface TamaguiCustomConfig extends Conf {}
// }