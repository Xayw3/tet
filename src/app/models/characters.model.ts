export interface CharacterApi {
  info: CharacterApiInfo;
  results: Character;
}

export interface CharacterApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterOrigin {
  name: string;
  url: string;
}

interface CharacterLocation {
  name: string;
  url: string;
}