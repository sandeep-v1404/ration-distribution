import { Client, Account, Databases, Functions } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.REACT_APP_API_ENDPOINT) // Your API Endpoint
  .setProject(process.env.REACT_APP_PROJECT_ID); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
