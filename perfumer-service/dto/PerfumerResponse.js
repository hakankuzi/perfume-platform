class PerfumerResponse {
  constructor(perfumer) {
    this.name = perfumer.name;
    this.surname = perfumer.surname;
    this.company = perfumer.company;
    this.website = perfumer.website;
    this.workWith = perfumer.workWith;
    this.image = perfumer.image;
    this.photoURL = perfumer.photoURL;
    this.uuid = perfumer.uuid;
    this.id = perfumer._id;
  }
}
module.exports = PerfumerResponse;
