import { Client } from "app/common/client";

export class Account {
  id: number;
  name: string;
  clients: Client[];
}