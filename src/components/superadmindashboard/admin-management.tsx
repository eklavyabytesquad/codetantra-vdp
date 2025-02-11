// src/components/superadmindashboard/hod-management.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { 
  Trash2, 
  PencilLine, 
  Mail, 
  GraduationCap,
  Search,
  AlertCircle,
  Calendar 
} from 'lucide-react';
import supabase from '@/app/utils/supabase';

interface HOD {
  id: number;
  email: string;
  name: string;
  qualification: string;
  created_at: string;
}

export default function HODManagement() {
  const [hods, setHODs] = useState<HOD[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingHOD, setEditingHOD] = useState<HOD | null>(null);

  useEffect(() => {
    fetchHODs();
  }, []);

  const fetchHODs = async () => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHODs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch HODs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this HOD?')) return;

    try {
      const { error } = await supabase
        .from('admin')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setHODs(hods.filter(hod => hod.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete HOD');
    }
  };

  const handleEdit = async (hod: HOD) => {
    try {
      const { error } = await supabase
        .from('admin')
        .update({
          name: editingHOD?.name,
          qualification: editingHOD?.qualification,
        })
        .eq('id', hod.id);

      if (error) throw error;
      
      setHODs(hods.map(h => h.id === hod.id ? { ...h, ...editingHOD } : h));
      setEditingHOD(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update HOD');
    }
  };

  const filteredHODs = hods.filter(hod => 
    hod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hod.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hod.qualification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Head of Departments</h2>
          <p className="text-sm text-gray-600 mt-1">Manage and update HOD information</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search HODs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 bg-gray-50 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))
        ) : filteredHODs.map(hod => (
          <div key={hod.id} 
            className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all 
            duration-200 transform hover:-translate-y-1">
            {editingHOD?.id === hod.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingHOD.name}
                    onChange={e => setEditingHOD({ ...editingHOD, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={editingHOD.qualification}
                    onChange={e => setEditingHOD({ ...editingHOD, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(hod)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors text-sm font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingHOD(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
                    transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">{hod.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingHOD(hod)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 
                      rounded-lg transition-colors"
                      title="Edit HOD"
                    >
                      <PencilLine className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(hod.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 
                      rounded-lg transition-colors"
                      title="Remove HOD"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded-lg">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {hod.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded-lg">
                    <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                    {hod.qualification}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded-lg">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {new Date(hod.created_at).toLocaleDateString()}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {!loading && filteredHODs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No HODs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}