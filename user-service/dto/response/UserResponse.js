class UserResponse {
  constructor(email, isActiveEmail, photoURL, token) {
    this.email = email;
    this.token = token;
    this.isActiveEmail = isActiveEmail;
    this.photoURL = photoURL;
    this.token = token;
  }
}
module.exports = UserResponse;
