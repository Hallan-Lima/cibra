"use client";

import { useEffect, useState } from 'react';
import { User } from '../types/user';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    username: '',
    address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' }
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users: User[] = await res.json();
        setUsers(users);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Dados salvos no localStorage:', localStorage.getItem('users'));
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      id: 0,
      name: '',
      email: '',
      username: '',
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
      phone: '',
      website: '',
      company: { name: '', catchPhrase: '', bs: '' }
    });
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({
      id: 0,
      name: '',
      email: '',
      username: '',
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
      phone: '',
      website: '',
      company: { name: '', catchPhrase: '', bs: '' }
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <input
        type="text"
        placeholder="Pesquisar por nome ou email"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <form onSubmit={handleAddUser} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={newUser.name}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
          Adicionar Usuário
        </button>
      </form>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div>
              <Link
                href={{
                  pathname: `/users/${user.id}`,
                  query: { user: JSON.stringify(user) },
                }}
              >
                <p className="hover:underline cursor-pointer">{user.name}</p>
              </Link>
              <Link
                href={{
                  pathname: `/users/${user.id}`,
                  query: { user: JSON.stringify(user) },
                }}
              >
                <p className="text-sm text-gray-600 hover:underline cursor-pointer">{user.email}</p>
              </Link>
            </div>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="ml-4 p-2 bg-red-500 text-white rounded"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}