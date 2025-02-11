"use client";
import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Plus, 
  Loader2,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  UserCircle
} from 'lucide-react';
import supabase from '../../app/utils/supabase';

interface Admin {
  id: number;
  name: string;
  email: string;
  qualification: string;
  created_at: string;
}

interface Department {
  id: number;
  name: string;
  admin_id: number;
  created_at: string;
  admin?: Admin;
}

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([fetchDepartments(), fetchAdmins()]);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to load initial data. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admin')
        .select('id, name, email, qualification, created_at')
        .order('name');

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Failed to load admin data');
    }
  };

  const fetchDepartments = async () => {
    try {
      // First, fetch all departments
      const { data: departmentData, error: deptError } = await supabase
        .from('department')
        .select('id, name, admin_id, created_at')
        .order('created_at', { ascending: false });

      if (deptError) throw deptError;

      // Then fetch admin details for each department
      const departmentsWithAdmins = await Promise.all(
        (departmentData || []).map(async (dept) => {
          if (dept.admin_id) {
            const { data: adminData, error: adminError } = await supabase
              .from('admin')
              .select('id, name, email, qualification')
              .eq('id', dept.admin_id)
              .single();

            if (adminError) {
              console.warn(`Failed to fetch admin for department ${dept.id}:`, adminError);
              return dept;
            }

            return {
              ...dept,
              admin: adminData
            };
          }
          return dept;
        })
      );

      setDepartments(departmentsWithAdmins);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setError('Failed to load department data');
    }
  };

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (!selectedAdminId) {
        throw new Error('Please select an admin for the department');
      }

      const { error: insertError } = await supabase
        .from('department')
        .insert({ 
          name: departmentName,
          admin_id: selectedAdminId
        });

      if (insertError) throw insertError;

      await fetchDepartments();
      setSuccess('Department created successfully');
      setDepartmentName('');
      setSelectedAdminId(null);
    } catch (error) {
      console.error('Error creating department:', error);
      setError(error instanceof Error ? error.message : 'Failed to create department');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDepartment = async (id: number, newName: string, newAdminId: number) => {
    try {
      const { error: updateError } = await supabase
        .from('department')
        .update({ 
          name: newName,
          admin_id: newAdminId 
        })
        .eq('id', id);

      if (updateError) throw updateError;

      await fetchDepartments();
      setEditingDepartment(null);
      setSuccess('Department updated successfully');
    } catch (error) {
      console.error('Error updating department:', error);
      setError(error instanceof Error ? error.message : 'Failed to update department');
    }
  };

  const handleDeleteDepartment = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('department')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      await fetchDepartments();
      setSuccess('Department deleted successfully');
    } catch (error) {
      console.error('Error deleting department:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete department');
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.admin?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="mt-2 text-gray-600">Manage and organize academic departments</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search departments or admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
          />
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDepartments.map((dept) => (
          <div
            key={dept.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-900 transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Building className="h-6 w-6 text-gray-900" />
                  </div>
                  {editingDepartment?.id === dept.id ? (
                    <input
                      type="text"
                      value={editingDepartment.name}
                      onChange={(e) => setEditingDepartment({...editingDepartment, name: e.target.value})}
                      className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 focus:outline-none bg-transparent"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {editingDepartment?.id === dept.id ? (
                    <>
                      <button
                        onClick={() => handleUpdateDepartment(
                          dept.id, 
                          editingDepartment.name,
                          editingDepartment.admin_id
                        )}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingDepartment(null)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingDepartment(dept)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDepartment(dept.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Admin Information */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserCircle className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Department Admin</p>
                      {editingDepartment?.id === dept.id ? (
                        <select
                          value={editingDepartment.admin_id || ''}
                          onChange={(e) => setEditingDepartment({
                            ...editingDepartment,
                            admin_id: Number(e.target.value)
                          })}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-md text-gray-900"
                        >
                          <option value="">Select an admin</option>
                          {admins.map((admin) => (
                            <option key={admin.id} value={admin.id}>
                              {admin.name} - {admin.qualification}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm text-gray-600">
                          {dept.admin ? (
                            <>
                              <p className="font-medium text-gray-900">{dept.admin.name}</p>
                              <p className="text-gray-500">{dept.admin.email}</p>
                            </>
                          ) : (
                            <p className="text-gray-500">No admin assigned</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Created {new Date(dept.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Department Form */}
      <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Plus className="h-6 w-6 mr-2 text-gray-900" />
          Create New Department
        </h2>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleCreateDepartment} className="max-w-2xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 mb-2">
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
                placeholder="Enter department name"
                required
              />
            </div>

            <div>
              <label htmlFor="adminSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Select Department Admin
              </label>
              <select
                id="adminSelect"
                value={selectedAdminId || ''}
                onChange={(e) => setSelectedAdminId(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900"
                required
              >
                <option value="">Select an admin</option>
                {admins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name} - {admin.qualification}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Plus className="h-5 w-5 mr-2" />
            )}
            Create Department
          </button>
        </form>
      </section>
    </div>
  );
}