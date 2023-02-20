class BrandResponse {
  constructor(brand) {
    this.name = brand.name;
    this.logo = brand.logo;
    this.country = brand.country;
    this.quantity = brand.quantity;
    this.website = brand.website;
    this.industry = brand.industry;
    this.description = brand.description;
    this.id = brand._id;
    this.uuid = brand.uuid;
  }
}
module.exports = BrandResponse;
