export interface Pokemon {
  abilities?: AbilitiesEntity[] | null;
  base_experience: number;
  cries: Cries;
  forms?: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies[] | null;
  game_indices?: GameIndicesEntity[] | null;
  height: number;
  held_items?: null[] | null;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves?: MovesEntity[] | null;
  name: string;
  order: number;
  past_abilities?: PastAbilitiesEntity[] | null;
  past_types?: null[] | null;
  species: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
  sprites: Sprites;
  stats?: StatsEntity[] | null;
  types?: TypesEntity[] | null;
  weight: number;
}
export interface AbilitiesEntity {
  ability: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
  is_hidden: boolean;
  slot: number;
}
export interface AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies {
  name: string;
  url: string;
}
export interface Cries {
  latest: string;
  legacy: string;
}
export interface GameIndicesEntity {
  game_index: number;
  version: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
}
export interface MovesEntity {
  move: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
  version_group_details?: VersionGroupDetailsEntity[] | null;
}
export interface VersionGroupDetailsEntity {
  level_learned_at: number;
  move_learn_method: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
  version_group: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
}
export interface PastAbilitiesEntity {
  abilities?: AbilitiesEntity[] | null;
  generation: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
}
export interface Sprites {
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
  other: Other;
  versions: Versions;
}
export interface Other {
  dream_world: DreamWorldOrIcons;
  home: HomeOrOmegaruby_alphasapphireOrX_yOrUltra_sun_ultra_moon;
  official_artwork: Official_artwork;
  showdown: ShowdownOrDiamond_pearlOrHeartgold_soulsilverOrPlatinumOrAnimated;
}
export interface DreamWorldOrIcons {
  front_default: string;
  front_female?: null;
}
export interface HomeOrOmegaruby_alphasapphireOrX_yOrUltra_sun_ultra_moon {
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface Official_artwork {
  front_default: string;
  front_shiny: string;
}
export interface ShowdownOrDiamond_pearlOrHeartgold_soulsilverOrPlatinumOrAnimated {
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface Versions {
  generation_i: Generation_i;
  generation_ii: Generation_ii;
  generation_iii: Generation_iii;
  generation_iv: Generation_iv;
  generation_v: Generation_v;
  generation_vi: Generation_vi;
  generation_vii: Generation_vii;
  generation_viii: Generation_viii;
}
export interface Generation_i {
  red_blue: Red_blueOrYellow;
  yellow: Red_blueOrYellow;
}
export interface Red_blueOrYellow {
  back_default?: null;
  back_gray?: null;
  back_transparent?: null;
  front_default?: null;
  front_gray?: null;
  front_transparent?: null;
}
export interface Generation_ii {
  crystal: Crystal;
  gold: GoldOrSilver;
  silver: GoldOrSilver;
}
export interface Crystal {
  back_default?: null;
  back_shiny?: null;
  back_shiny_transparent?: null;
  back_transparent?: null;
  front_default?: null;
  front_shiny?: null;
  front_shiny_transparent?: null;
  front_transparent?: null;
}
export interface GoldOrSilver {
  back_default?: null;
  back_shiny?: null;
  front_default?: null;
  front_shiny?: null;
  front_transparent?: null;
}
export interface Generation_iii {
  emerald: Emerald;
  firered_leafgreen: Firered_leafgreenOrRuby_sapphire;
  ruby_sapphire: Firered_leafgreenOrRuby_sapphire;
}
export interface Emerald {
  front_default?: null;
  front_shiny?: null;
}
export interface Firered_leafgreenOrRuby_sapphire {
  back_default?: null;
  back_shiny?: null;
  front_default?: null;
  front_shiny?: null;
}
export interface Generation_iv {
  diamond_pearl: ShowdownOrDiamond_pearlOrHeartgold_soulsilverOrPlatinumOrAnimated;
  heartgold_soulsilver: ShowdownOrDiamond_pearlOrHeartgold_soulsilverOrPlatinumOrAnimated;
  platinum: ShowdownOrDiamond_pearlOrHeartgold_soulsilverOrPlatinumOrAnimated;
}
export interface Generation_v {
  black_white: Black_white;
}
export interface Black_white {
  animated: ShowdownOrDiamond_pearlOrHeartgold_soulsilverOrPlatinumOrAnimated;
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface Generation_vi {
  omegaruby_alphasapphire: HomeOrOmegaruby_alphasapphireOrX_yOrUltra_sun_ultra_moon;
  x_y: HomeOrOmegaruby_alphasapphireOrX_yOrUltra_sun_ultra_moon;
}
export interface Generation_vii {
  icons: DreamWorldOrIcons;
  ultra_sun_ultra_moon: HomeOrOmegaruby_alphasapphireOrX_yOrUltra_sun_ultra_moon;
}
export interface Generation_viii {
  icons: DreamWorldOrIcons;
}
export interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
}
export interface TypesEntity {
  slot: number;
  type: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrGenerationOrStatOrTypeOrSpecies;
}
