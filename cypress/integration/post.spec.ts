import { loginData } from "../fixtures/loginData";
import { IResponseLogin, IResponsePost } from "../support/interfaces";
import { postData } from "../fixtures/postData";

describe("Backend Topic API Test Suite", function () {
  before("it should login", function () {
    cy.request("POST", Cypress.env("url_Backend") + "login", {
      email: loginData[0].email,
      password: loginData[0].password,
    }).then((response: IResponseLogin) => {
      cy.checkPostApiMessage(response.body, "Login successfully completed!");
      expect(response.body).to.have.property("access_token");
      this.token = response.body["access_token"];
    });
  });

  postData.map((post) => {
    it("should create a new post", function () {
      const options = {
        method: "POST",
        url: Cypress.env("url_Backend") + "postCreate",
        headers: {
          token: this.token,
        },
        body: {
          text: post.text,
          postTopicId: post.postTopicId,
          userId: post.postUserId,
        },
      };
      cy.request(options).then((response: any) => {
        cy.checkPostApiMessage(response.body, "Post has been created");
      });
    });
  });

  it("should return all the posts", () => {
    cy.request("GET", Cypress.env("url_Backend") + "posts").then(
      (response: IResponsePost) => {
        cy.checkPostApiMessage(response.body, "All posts found");
        expect(response.body).to.have.property("status", "success");
      }
    );
  });

  it("should return all the posts by ID", () => {
    cy.request(
      "GET",
      Cypress.env("url_Backend") + `posts/${"testUser31190"}`
    ).then((response: IResponsePost) => {
      cy.checkPostApiMessage(response.body, "All posts found");
      expect(response.body).to.have.property("status", "success");
    });
  });
});
