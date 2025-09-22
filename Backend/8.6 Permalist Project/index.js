import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todo_list",
  password: "alex1989",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function loadItems() {
  const result = await db.query("SELECT * FROM list_items");
  let items = result.rows;
  return items;
}

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

app.get("/", async (req, res) => {
  const items = await loadItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO list_items (title) VALUES ($1)",[item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedId = req.body.updatedItemId;
  const updatedTitle = req.body.updatedItemTitle;
  await db.query("UPDATE list_items SET title = ($1) WHERE id = ($2)", [updatedTitle, updatedId])
  res.redirect("/")
});

app.post("/delete", async (req, res) => {
  const deletedId = req.body.deleteItemId
  await db.query("DELETE FROM list_items WHERE id = ($1)",
    [deletedId])
  res.redirect("/")

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
