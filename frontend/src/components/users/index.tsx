import { User } from 'lucide-react';
import UserList from './UserList';
import { api } from '@/services/api';

// buscar dados na api
async function GetUsers(): Promise<[]> {

    const responseApi = await api.get('/users');

    if(!responseApi.status) {
        throw new Error(`Falha ao buscar API, status: ${responseApi.status}`);
    }
    return responseApi.data;
}

export default async function DataUsersPage() {
    const users = await GetUsers();

    return (
        
        <UserList users={users} />

    )
}