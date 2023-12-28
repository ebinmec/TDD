import { render, fireEvent, screen } from "@testing-library/react";
import App, { Board, Square } from "./App";

test("renders the game board", () => {
  render(<Board />);
  const gameBoard = screen.getByTestId("gameBoard");
  expect(gameBoard).toBeInTheDocument();
});

test("renders status correctly", () => {
  render(<Board />);
  const status = screen.getByTestId("status");
  expect(status).toHaveTextContent("Next player: X");
});

test("allows X and O to take turns", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");

  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent("X");

  fireEvent.click(squares[1]);
  expect(squares[1]).toHaveTextContent("O");

  fireEvent.click(squares[2]);
  expect(squares[2]).toHaveTextContent("X");

  fireEvent.click(squares[3]);
  expect(squares[3]).toHaveTextContent("O");
});

test("does not allow a square to be clicked if it's already filled", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");

  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent("X");

  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent("X");
});

test("declares a winner", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");

  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X

  const status = screen.getByTestId("status");
  expect(status).toHaveTextContent("Winner: X");
});

test("declares a draw", () => {
  render(<Board />);
  const squares = screen.getAllByRole("button");

  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[1]); // O
  fireEvent.click(squares[2]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[5]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[6]); // X
  fireEvent.click(squares[8]); // O
  fireEvent.click(squares[7]); // X

  const status = screen.getByTestId("status");
  expect(status).toHaveTextContent("Draw");
});
