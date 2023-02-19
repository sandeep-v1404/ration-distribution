import { Client, Account, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint("http://142.93.212.117/v1") // Your API Endpoint
  .setProject("63ee4f176fb8f0fead98"); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
