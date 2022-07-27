describe("Apartments", () => {
  beforeEach(() => {
    console.log("beforeEach");
    cy.task("reset");
  });

  it("should show heading", () => {
    cy.visit("/apartments");
    cy.get("h1").contains("Apartments");
  });

  it("should show fixture apartments", () => {
    cy.fixture("apartments").then((data) => {
      cy.task("seed:apartments", data);
    });
    cy.visit("/apartments");
    cy.get("a").contains("Berlin Apartment");
    cy.get("a").contains("Helsinki Apartment");
  });

  it("should show follow the correct apartment", () => {
    cy.fixture("apartments").then((data) => {
      cy.task("seed:apartments", data);
    });
    cy.visit("/apartments");
    cy.get("a").contains("Berlin Apartment").click();
  });

  it("should show heading", () => {
    cy.visit("/apartments/create");
    cy.get("h1").contains("Create a New Apartment");
  });

  it("create new apartment", () => {
    cy.visit("/apartments/create");
    cy.contains("Name").type("New Apartment");
    cy.contains("Rooms").type("2");
    cy.contains("Create Apartment").click();
    cy.get("h1").contains("New Apartment");
    cy.contains("Rooms");
  });
});
