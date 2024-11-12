const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "yum-B2mWxADrthdHqd22";
const TENANT_ID = "ppmm";

export default async function MenuPage() {
  try {
    // Fetch menu data with API key and tenant ID
    const response = await fetch(`${BASE_URL}/menu`, {
      headers: {
        "x-zocom": API_KEY,
        //"x-tenant-id": TENANT_ID,
      },
      //cache: "no-store", // Fetch fresh data each request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menu");
    }

    const menu = await response.json();

    // Render the menu with `id` and `name` fields from menu.items
    return (
      <main>
        <h1>Menu</h1>
        <ul>
          {menu.items.map((item: { id: number; name: string }) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    console.error("Error loading menu:", error);
    return <div>Error loading menu.</div>;
  }
}
