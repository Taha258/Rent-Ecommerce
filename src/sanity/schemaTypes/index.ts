import { type SchemaTypeDefinition } from 'sanity'
import { card } from './carCard'
import { recommendedCar } from './recommendedCar'
import { category } from '../../sanity/schemaTypes/CategoryData'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [card,recommendedCar,category],
}
