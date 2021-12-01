import axios from 'axios'
import { Card, CardType, CardRace, Attribute, Response, LinkMarker } from './types'

export default class YGOClient {
  cards?: Card[]

  /**
   * Load the cards from the YGOProDeck API.
   * Can be overridden by passing `cards`.
   */
  async load(cards?: Card[]) {
    if (cards) this.cards = cards
    else {
      const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      this.cards = (response.data as Response).data
    }
  }

  /** Get a list of cards that match the value to the property */
  getByProperty(property: keyof Card, value: any) {
    if (!this.cards) throw new Error('No cards loaded. Call .load() to fetch them')
    return this.cards.filter(card => card[property] === value)
  }

  /** Get the card with the exact `id` */
  getById(id: string): Card | undefined { return this.getByProperty('id', id)[0] }
  /** Get the card with the exact `name` */
  getByName(name: string): Card | undefined { return this.getByProperty('name', name)[0] }
  /** Get a list of cards with the same `type` */
  getByType(type: CardType) { return this.getByProperty('type', type) }
  /** Get a list of cards with the same `atk` */
  getByAtk(atk: number) { return this.getByProperty('atk', atk) }
  /** Get a list of cards with the same `def` */
  getByDef(def: number) { return this.getByProperty('def', def) }
  /** Get a list of cards with the same `level` */
  getByLevel(level: number) { return this.getByProperty('level', level) }
  /** Get a list of cards with the same `race` */
  getByRace(race: CardRace) { return this.getByProperty('race', race) }
  /** Get a list of cards with the same `attribute` */
  getByAttribute(attribute: Attribute) { return this.getByProperty('attribute', attribute) }
  /** Get a list of cards with the same `archetype` */
  getByArchetype(archetype: string) { return this.getByProperty('archetype', archetype) }
  /** Get a list of cards with the same `scale` */
  getByScale(scale: number) { return this.getByProperty('scale', scale) }
  /** Get a list of cards with the same `linkval` */
  getByLinkval(linkval: number) { return this.getByProperty('linkval', linkval) }

  /** Get a list of cards with the same `set_code` */
  getBySet(set_code: string) {
    if (!this.cards) throw new Error('No cards loaded. Call .load() to fetch them')
    return this.cards.filter(card => card.card_sets?.find(set => set.set_code === set_code))
  }

  /** Get a list of cards with the same `set_name` */
  getBySetName(set_name: string) {
    if (!this.cards) throw new Error('No cards loaded. Call .load() to fetch them')
    return this.cards.filter(card => card.card_sets?.find(set => set.set_name === set_name))
  }

  /** Get a list of cards with the same `linkmarkers` */
  getByLinkMarkers(linkmarkers: LinkMarker[]) {
    if (!this.cards) throw new Error('No cards loaded. Call .load() to fetch them')
    return this.cards.filter(card => card.linkmarkers?.find(link => linkmarkers.includes(link)))
  }

  /** 
   * Search for cards that match the search query.
   * Searches by name & description, ranking name higher than description.
   * Limits the results to `limit` (default: 10).
   */
  search(query: string, limit = 10) {
    const matches: Card[] = [];
    query = query.toLowerCase().replaceAll('-', ' ');

    for (const card of this.cards!) {
      let name = card.name.toLowerCase().replaceAll('-', ' ');
      // exact match
      if (name == query) return [card];
      if (name.includes(query)) {
        matches.push(card);
      }
    }

    return matches
  }
}
