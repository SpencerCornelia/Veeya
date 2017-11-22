/* Property.ts */
export interface Property {
  _id?: Number,
  address: String,
  city: String,
  state: String,
  zipCode: Number,
  purchasePrice: Number,
  bedrooms: Number,
  bathrooms: Number,
  rehabCostMin: Number,
  rehabCostMax: Number,
  afterRepairValue: Number,
  averageRent: Number,
  squareFootage: Number,
  propertyType: String,
  yearBuilt: Number,
  status: String
}