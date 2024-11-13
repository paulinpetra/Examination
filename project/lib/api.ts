"use client";
//API helper functions
const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "yum-B2mWxADrthdHqd22";

// Function to post an order
async function postOrder(tenant: string, itemIds: number[]) {
  try {
    const response = await fetch(`${BASE_URL}/${tenant}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ items: itemIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit order");
    }

    const data = await response.json();
    console.log("Order submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}

// Function to get orders
async function getOrders(tenant: string) {
  try {
    const response = await fetch(`${BASE_URL}/${tenant}/orders`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    console.log("Orders fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
