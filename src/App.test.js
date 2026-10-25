import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { AppProvider, useApp } from "./context/AppContext";

const mockProducts = [
  {
    id: 1,
    title: "Test Backpack",
    price: 10,
    description: "A test product",
    image: "test.png",
    rating: { rate: 4.5 },
  },
];

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockProducts) })
  );
});

test("App renders the header brand and the Flash Sales section", async () => {
  render(<App />);

  expect(screen.getByRole("link", { name: "Exclusive" })).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", { name: "Flash Sales" })
  ).toBeInTheDocument();
  expect((await screen.findAllByText("Test Backpack")).length).toBeGreaterThan(0);
});

test("AppContext handleCart adds a product and increments quantity", () => {
  function Probe() {
    const { cart, handleCart } = useApp();
    return (
      <>
        <span data-testid="count">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
        <button onClick={() => handleCart({ id: 1, title: "Test Backpack" })}>
          add
        </button>
      </>
    );
  }

  render(
    <AppProvider>
      <Probe />
    </AppProvider>
  );

  expect(screen.getByTestId("count")).toHaveTextContent("0");
  fireEvent.click(screen.getByText("add"));
  expect(screen.getByTestId("count")).toHaveTextContent("1");
  fireEvent.click(screen.getByText("add"));
  expect(screen.getByTestId("count")).toHaveTextContent("2");
});

test("clicking the header heart opens the wishlist with liked items", async () => {
  localStorage.setItem(
    "likes",
    JSON.stringify({ flash: [1], selling: [], explore: [] })
  );
  render(<App />);

  fireEvent.click(screen.getByRole("link", { name: "Wishlist" }));

  expect(
    await screen.findByRole("heading", { name: "Wishlist (1)" })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", { name: "Flash Sales (1)" })
  ).toBeInTheDocument();
});
