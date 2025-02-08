import { topicData } from "../fixtures/topicData";
import { loginData } from "../fixtures/loginData";
import { IResponseLogin, IResponseTopic } from "../support/interfaces";

describe("Backend Topic API Test Suite", function () {
  before("it should login", function () {
    cy.request("POST", Cypress.env("url_Backend") + "login", {
      email: loginData[0].email,
      password: loginData[0].password,
    }).then((response: IResponseLogin) => {
      cy.checkPostApiMessage(response.body, "Login successfully completed!");
      expect(response.body).to.have.property("access_token");
      this.token = response.body["access_token"];
      this.user = response.body["user"];
    });
  });
  for (let i = 0; i < 6; i++) {
    it("should create a new topic", function () {
      const options = {
        method: "POST",
        url: Cypress.env("url_Backend") + "topicCreate",
        headers: {
          token: this.token,
        },
        body : {
            text: topicData[i].text
        }
      };
      cy.request(options).then((response: any) => {
        cy.checkPostApiMessage(response.body, "Topic has been created");
      })
    });
  }

  it("should return all the topics", () => {
    cy.request("GET", Cypress.env("url_Backend")+ "topics").then((response: IResponseTopic) => {
      cy.checkPostApiMessage(response.body, "All topics found")
      expect(response.body).to.have.property("status", "success");
    })

  })

});
