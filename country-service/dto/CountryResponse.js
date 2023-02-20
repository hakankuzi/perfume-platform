class CountryResponse {
  constructor(country) {
    this.name = country.name;
    this.flag = country.flag;
    this.country = country.country;
    this.totalQuantity = country.totalQuantity;
    this.id = country._id;
    this.uuid = country.uuid;
  }
}
module.exports = CountryResponse;
