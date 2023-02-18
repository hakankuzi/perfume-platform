class UserDetailResponse {
  constructor(email, isActiveEmail, isActiveUser, photoURL, savedDate) {
    this.email = email;
    this.isActiveEmail = isActiveEmail;
    this.isActiveUser = isActiveUser;
    this.photoURL = photoURL;
    this.savedDate = savedDate;
  }
}
module.exports = UserDetailResponse;
