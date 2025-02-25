"use client";

import { useEffect, useState } from 'react';
import { User } from '../../../types/user';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const UserDetails = () => {

  // Hook para acessar os parâmetros da URL
  const searchParams = useSearchParams();

  // Obtém o parâmetro 'user' da URL
  const userParam = searchParams.get('user');
  
  // Estado para armazenar os dados do usuário
  const [user, setUser] = useState<User | null>(null);

  // useEffect para converter o parâmetro 'user' em um objeto User quando o componente é montado
  useEffect(() => {
    if (userParam) {
      // Converte o query parameter de volta para um objeto User
      const userData = JSON.parse(userParam);
      setUser(userData);
    }
  }, [userParam]);

  // Renderiza um texto de carregamento enquanto os dados do usuário não são carregados
  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Usuário</h1>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Empresa:</strong> {user.company?.name || 'N/A'}</p>
      <p><strong>Endereço:</strong> {user.address ? `${user.address.street}, ${user.address.city}` : 'N/A'}</p>
      
      {/* Botão para voltar à lista de usuários */}
      <Link href="/">
        <button className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar à lista
        </button>
      </Link>
    </div>
  );
};

export default UserDetails;