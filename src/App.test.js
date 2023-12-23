import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe("App",()=>{
  it("should display board",()=>{
      render(<App/>);
      const gameBoard=screen.getByTestId("gameBoard");
      expect(gameBoard).not.toBeNull();
      expect(gameBoard.textContent).toBe("");
  });
 

  it("should have 9 squares",()=>{
    render(<App/>);
    const buttons=screen.getAllByRole("button");
    expect(buttons.length).toBe(9);
  });


  it("should render X on first move",()=>{
    render(<App/>);
    const button =screen.getAllByRole("button")[0];
    fireEvent.click(button);
    expect(button.textContent).toBe("X");
  });

it("should render O on the second move",()=>{
    render(<App/>);
    const Square=screen.getAllByRole("button");
    fireEvent.click(Square[0]);
    expect(Square[0].textContent).toBe("X");
    fireEvent.click(Square[1]);
    expect(Square[1].textContent).toBe("O");
});

it("should not change value of a square",()=>{
  render(<App/>);
  const square=screen.getAllByRole("button");
  fireEvent.click(square[0]);
  expect(square[0].textContent).toBe("X");
  fireEvent.click(square[0]);
  expect(square[0].textContent).toBe("X");
});

it("should be able to calculate winner",()=>{
  render(<App/>);
  const squares=screen.getAllByRole("button");
  const status=screen.getByTestId("status");
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[6]);
  expect(status.textContent).toBe("winner: X");
});

});
