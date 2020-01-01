
import { ID, newAlterIDs, NewID } from "./id";

export interface User {
  ID: ID,
  AlterID: ID[],
  Email: string,
}
