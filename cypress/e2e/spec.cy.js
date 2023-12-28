describe("Tic Tac Toe Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("allows X to make a move", () => {
    cy.get("[data-testid=gameBoard]").within(() => {
      cy.get("button").eq(0).click();
      cy.get("button").eq(0).should("have.text", "X");
    });
    cy.get("[data-testid=status]").should("contain", "Next player: O");
  });

  it("allows O to make a move", () => {
    cy.get("[data-testid=gameBoard]").within(() => {
      cy.get("button").eq(0).click();
      cy.get("button").eq(1).click();
      cy.get("button").eq(1).should("have.text", "O");
    });
    cy.get("[data-testid=status]").should("contain", "Next player: X");
  });

  it("prevents clicking on an already filled square", () => {
    cy.get("[data-testid=gameBoard]").within(() => {
      cy.get("button").eq(0).click(); 
      cy.get("button").eq(0).click(); 
      cy.get("button").eq(0).should("have.text", "X");
    });
    cy.get("[data-testid=status]").should("contain", "Next player: O");
  });

  it("displays the winner when a player wins", () => {
    cy.get("[data-testid=gameBoard]").within(() => {
      cy.get("button").eq(0).click(); 
      cy.get("button").eq(1).click(); 
      cy.get("button").eq(3).click(); 
      cy.get("button").eq(4).click(); 
      cy.get("button").eq(6).click(); 
    });
    cy.get("[data-testid=status]").should("contain", "Winner: X");
  });

  it("displays draw", () => {
    cy.get("[data-testid=gameBoard]").within(() => {
      cy.get("button").eq(0).click(); 
      cy.get("button").eq(1).click(); 
      cy.get("button").eq(2).click(); 
      cy.get("button").eq(3).click(); 
      cy.get("button").eq(5).click(); 
      cy.get("button").eq(4).click(); 
      cy.get("button").eq(6).click(); 
      cy.get("button").eq(8).click(); 
      cy.get("button").eq(7).click(); 
    });
    cy.get("[data-testid=status]").should("contain", "Draw");
  });
});