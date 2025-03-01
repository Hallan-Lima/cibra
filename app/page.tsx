"use client";

import { useEffect, useState } from 'react';
import { User } from '../types/user';
import Link from 'next/link';

// Componente principal da página Home
export default function Home() {

  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState<User[]>([]);

  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Estado para armazenar os dados do novo usuário a ser adicionado
  const [newUser, setNewUser] = useState<Partial<User>>({});

  // useEffect para buscar os usuários da API quando o componente é montado
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

  // Função para atualizar o termo de pesquisa
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Função para deletar um usuário da lista
  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Função para atualizar os dados do novo usuário a ser adicionado
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Função para adicionar um novo usuário à lista
  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newUser.name && newUser.email) {
      const userWithId = { ...newUser, id: users.length + 1 } as User;
      const updatedUsers = [...users, userWithId];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      // Resetar o estado do novo usuário após adicionar
      setNewUser({});
    }
  };

  // Filtrar usuários com base no termo de pesquisa
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
        className="mb-4 p-2 border rounded w-full text-black"
      />
      <form onSubmit={handleAddUser} className="mb-4">
        <h2 className="text-xl font-bold mb-2">Cadastrar Novo Usuário</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={newUser.name || ''}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full text-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email || ''}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full text-black"
          required
        />
        <input
          type="text"
          name="avatarUrl"
          placeholder="URL do Avatar"
          value={newUser.avatarUrl || ''}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
          Adicionar Usuário
        </button>
      </form>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div className="flex items-center">
              {user.avatarUrl && <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className="w-10 h-10 rounded-full mr-4" />}
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