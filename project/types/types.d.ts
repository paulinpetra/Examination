// Wonton Schema
// A Wonton represents an item in the menu. It has properties for type, name, description, price, and ingredients.
export type Wonton = {
  id: number; // Unique ID for the item
  type: "wonton"; // Type of the item, can only be 'wonton' for this schema
  name: string; // Name of the Wonton
  description: string; // A brief description of the Wonton
  price: number; // Price of the Wonton in SEK
  ingredients: string[]; // List of ingredients for the Wonton
};

// Dip Schema
// A Dip represents an item in the menu, like a sauce or dip. It has properties for type, name, description, and price.
export type Dip = {
  id: number; // Unique ID for the item
  type: "dip"; // Type of the item, can only be 'dip' for this schema
  name: string; // Name of the Dip
  description: string; // A brief description of the Dip
  price: number; // Price of the Dip in SEK
};

// Drink Schema
// A Drink represents a drink in the menu. It has properties for type, name, description, and price.
export type Drink = {
  id: number; // Unique ID for the item
  type: "drink"; // Type of the item, can only be 'drink' for this schema
  name: string; // Name of the Drink
  description: string; // A brief description of the Drink
  price: number; // Price of the Drink in SEK
};

// Menu Response Schema
// The API may return a list of menu items. The 'items' array contains different types of items, such as Wonton, Dip, and Drink.
export type Menu = {
  items: (Wonton | Dip | Drink)[]; // Array of items, which can be Wonton, Dip, or Drink
};

// Order Schema
// Represents an order, including its unique ID, items, total value, estimated time, timestamp, and state.
export type Order = {
  id: string; // Unique order ID
  items: (Wonton | Dip | Drink)[]; // Items included in the order
  orderValue: number; // Total value of the order in SEK
  eta: number; // Estimated time of order processing in minutes
  timestamp: string; // Time of the order in ISO8601 format
  state: "3"; // Order state, here we assume '3' represents a specific state (e.g., completed)
};

// Receipt Schema
// Represents the receipt details after an order has been processed.
export type Receipt = {
  orderId: string; // Unique ID for the order
  items: (Wonton | Dip | Drink)[]; // Items in the receipt, which can be of type Wonton, Dip, or Drink
  totalAmount: number; // Total amount of the order
  timestamp: string; // Timestamp of the receipt in ISO8601 format
};
