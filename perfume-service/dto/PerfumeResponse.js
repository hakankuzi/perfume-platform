class PerfumeResponse {
  constructor(perfume) {
    this.name = perfume.name;
    this.brand = perfume.brand;
    this.gender = perfume.gender;
    this.image = perfume.image;
    this.perfumer = perfume.perfumer;
    this.description = perfume.description;
    this.quote = perfume.quote;
    this.accordImage = perfume.accordImage;
    this.logo = perfume.logo;
    this.industry = perfume.industry;
    this.endYear = perfume.endYear;
    this.startYear = perfume.startYear;
    this.amazonLink = perfume.amazonLink;
    this.ebayLink = perfume.ebayLink;
    this.sellerLink = perfume.sellerLink;
    this.accords = perfume.accords;
    this.uuid = perfume.uuid;
    this.id = perfume._id;
  }
}
module.exports = PerfumeResponse;
