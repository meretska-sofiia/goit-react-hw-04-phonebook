import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../AddContactForm/AddContactForm';
import ContactList from '../ContactList/ContactList';
import SearchContactFilter from '../Filter/Filter';
import { Container, Title } from './App.styled';

const COUNTER_KEY = 'contacts';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem(COUNTER_KEY));
};

export const App = () => {
  const [contacts, setContacts] = useState(() => getLocalStorage() ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContactClick = ({ name, number }) => {
    const nameArray = contacts.map(({ name }) => name);

    if (nameArray.includes(name)) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prev => (prev = [...prev, { id: nanoid(), name, number }]));
    }
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const handlerDeleteItem = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm addContact={handleAddContactClick} />
      {!!contacts?.length && (
        <>
          <Title>Contacts</Title>
          <SearchContactFilter changeFilter={changeFilter} />

          <ContactList
            contacts={contacts.filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )}
            onDelete={handlerDeleteItem}
          />
        </>
      )}
    </Container>
  );
};
