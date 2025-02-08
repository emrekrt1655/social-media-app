import { registerData } from "../fixtures/registerData";
import { loginData } from "../fixtures/loginData";
import { updatedUserData } from "../fixtures/updatedUserData";

import {
  IUserData,
  IResponseLogin,
  IUserResponse,
  IResponseUpdatedUser,
  IResponseRegister,
  IActiveResponse,
} from "../support/interfaces";

describe("Backend Auth API Test Suite", function () {
  for (let i = 0; i < 5; i++) {
    describe("It saves the user to the database", function () {
      before("should send the activation token", function () {
        cy.request("POST", Cypress.env("url_Backend") + "register", {
          userName: registerData[i].userName,
          email: registerData[i].email,
          password: registerData[i].password,
        }).then((response: IResponseRegister) => {
          cy.checkPostApiMessage(response.body, "Please active your account");
          this.activate_token = response.body["activeToken"];
        });
      });
      it("should avtive the account", function () {
        cy.request("POST", Cypress.env("url_Backend") + "active", {
          active_token: this.activate_token,
        }).then((response: IActiveResponse) => {
          cy.checkPostApiMessage(response.body, "Account has been activated");
        });
      });
    });
  }

  for (let i = 0; i < 5; i++) {
    describe("It logins to the app and get the users", function () {
      before("It logins to the api", function () {
        cy.request("POST", Cypress.env("url_Backend") + "login", {
          email: loginData[i].email,
          password: loginData[i].password,
        }).then((response: IResponseLogin) => {
          cy.checkPostApiMessage(
            response.body,
            "Login successfully completed!"
          );
          expect(response.body).to.have.property("access_token");
          this.token = response.body["access_token"];
          this.user = response.body["user"];
        });
      });
      it("it gets users", function () {
        const options = {
          method: "GET",
          url: `${Cypress.env("url_Backend")}users`,
          headers: {
            token: this.token,
          },
        };

        cy.request(options).then(function (response: IUserResponse) {
          cy.checkPostApiMessage(response.body, "All users found");
          expect(response.body).to.have.property("status", "success");
        });
      });
    });
  }

  for (let i = 0; i < 5; i++) {
    describe("Update User Test Case", function () {
      before("It logins to the api", function () {
        cy.request("POST", Cypress.env("url_Backend") + "login", {
          email: loginData[i].email,
          password: loginData[i].password,
        }).then((response: IResponseLogin) => {
          cy.checkPostApiMessage(
            response.body,
            "Login successfully completed!"
          );
          expect(response.body).to.have.property("access_token");
          this.token = response.body["access_token"];
          this.user = response.body["user"];
        });
      });
      it("It updates the userData in the database", function () {
        const options = {
          method: "PUT",
          url: Cypress.env("url_Backend") + `useredit/${this.user.userId}`,
          headers: {
            token: this.token,
          },
          body: {
            userId: updatedUserData[i].userId,
            userName: updatedUserData[i].userName,
            email: updatedUserData[i].email,
            password: updatedUserData[i].password,
          },
        };
        // @ts-ignore
        cy.request(options).then((response: IResponseUpdatedUser) => {
          cy.checkPostApiMessage(response.body, "User updated successfully");
          let updatedUser: IUserData = response.body["data"];
          expect(updatedUser).to.have.property("userId");
        });
      });
    });
  }
  for (let i = 0; i < 5; i++) {
    describe("Delete api test case", function () {
      before("It logins to the api", function () {
        cy.request("POST", Cypress.env("url_Backend") + "login", {
          email: updatedUserData[i].email,
          password: updatedUserData[i].password,
        }).then((response: IResponseLogin) => {
          cy.checkPostApiMessage(
            response.body,
            "Login successfully completed!"
          );
          expect(response.body).to.have.property("access_token");
          this.token = response.body["access_token"];
          this.user = response.body["user"];
        });
      });
      it("It deletes the userData from the database", function () {
        const options = {
          method: "DELETE",
          url: Cypress.env("url_Backend") + `userdelete/${this.user.userId}`,
          headers: {
            token: this.token,
          },
        };
        cy.request(options).then((response: any) => {
          cy.checkPostApiMessage(
            response.body,
            `${this.user.userId} deleted successfully`
          );
        });
      });
    });
  }
});
