export interface ApiOptions {
  cardUrl?: string
  archetypesUrl?: string
  setUrl?: string
  setInfoUrl?: string
  randomCardUrl?: string
}

export type LinkMarker = 'Top' | 'Bottom' | 'Left' | 'Right' | 'Bottom-Left' | 'Bottom-Right' | 'Top-Left' | 'Top-Right'
export type Format = 'tcg' | 'goat' | 'ocg goat' | 'speed duel' | 'rush duel' | 'duel links'

export interface CardFilters {
  name?: string
  fname?: string
  id?: string
  type?: string
  atk?: number | string
  def?: number | string
  level?: number | string
  race?: string
  attribute?: string
  link?: string
  linkmarker?: LinkMarker[]
  scale?: number
  cardset?: string
  archetype?: string
  banlist?: string
  sort?: string
  format?: Format
  misc?: boolean
  staple?: boolean
  has_effect?: boolean
  startdate?: string
  enddate?: string
  dateregion?: string
}
