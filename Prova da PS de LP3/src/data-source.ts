import { DataSource } from "typeorm";
import { Produto } from "./entity/Produto";
import { Item } from "./entity/Item";

export const DatabaseConnection = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Produto, Item],
});
