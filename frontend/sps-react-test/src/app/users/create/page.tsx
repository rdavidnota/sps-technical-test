'use client'
import { createUser } from '@/services/userService';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export default function CreateUser() {
    const router = useRouter();
    const [user, setUser] = useState({ name: '', email: '', type: '', password: '' });
    const [error, setError] = useState('');
    const params = useParams();
    const options = [
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuario' }
    ];
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login'); // Redirigir si no hay token
            return;
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        try {
            await createUser(user);
            router.push('/users');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>

                    <select
                        value={user.type}
                        onChange={(e) => setUser({ ...user, type: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg">
                        <option value="" disabled>
                            Select an option
                        </option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save User
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => router.push(`/users`)}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}
