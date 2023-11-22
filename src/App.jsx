import {useEffect, useLayoutEffect, useState} from "react";
import "./App.css";
import InputComponent from "./components/InputComponent";
import ShoppingList from "./components/ShoppingList";
import { getItems, getItem, createItem, updateItem, deleteItem } from "./api/api.js";

function App() {

  const [shoppingCart, setShoppingCart] = useState([]);

  async function fetchItems() {
    const items = await getItems();
    setShoppingCart(await items);
  }

  useEffect(() => {

    fetchItems();


  }, []);


  async function addShoppingListItem(item, list) {
    await createItem(shoppingCart, item);
    fetchItems();
  }

  async function onDeleteItem(id) {
    await deleteItem(id);
    fetchItems();
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center my-2">Shoppinglist</h1>

      <ShoppingList list={shoppingCart} onDeleteItem={onDeleteItem} />

      <InputComponent
          nextId={shoppingCart.length}
          shoppingCart={shoppingCart}
          addShoppingListItem={addShoppingListItem}
      />
    </div>
  );
}

export default App;
