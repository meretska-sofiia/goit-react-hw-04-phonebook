import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Input, Button } from './AddContactForm.styled';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const setMap = {
    name: setName,
    number: setNumber,
  };

  const handlerAddValue = e => {
    const { value, name } = e.target;
    setMap[name](value);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handlerSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Enter contact name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handlerAddValue}
        />
        <Input
          type="tel"
          name="number"
          placeholder="Enter contact number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handlerAddValue}
        />
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
