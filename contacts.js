import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return [];
  }
}

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact ?? null;
  } catch (error) {
    return null;
  }
}

export const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const concreteContact = contacts.find(contact => contact.id === contactId);
        if (!concreteContact) return null;
        const newContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return concreteContact;
    }
    catch (error) {
        return null;
    }
}

export const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        const newContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return newContact;
    }
    catch (error) {
        return null;
    }
}
