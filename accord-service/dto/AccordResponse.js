class AccordResponse {
  constructor(accord) {
    this.name = accord.name;
    this.id = accord._id;
    this.uuid = accord.uuid;
  }
}
module.exports = AccordResponse;
