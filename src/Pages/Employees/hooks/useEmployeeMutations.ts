import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployeesFile,
  exportEmployees,
} from '../api/employeesApi';

export function useEmployeeMutations() {
  const queryClient = useQueryClient();

  const invalidateEmployeesList = async () => {
    await queryClient.invalidateQueries({ queryKey: ['employees', 'list'] });
  };

  const createMutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const res = await createEmployee(payload);
      if (res && typeof res === 'object' && 'success' in res && (res as any).success === false) {
        throw Object.assign(new Error((res as any).message || 'Failed to save employee'), { response: { data: res } });
      }
      return res;
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Employee created successfully');
      await invalidateEmployeesList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to save employee';
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (args: { id: number | string; patch: Record<string, any> }) => {
      const res = await updateEmployee(args.id, args.patch);
      if (res && typeof res === 'object' && 'success' in res && (res as any).success === false) {
        throw Object.assign(new Error((res as any).message || 'Failed to save employee'), { response: { data: res } });
      }
      return res;
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Employee updated successfully');
      await invalidateEmployeesList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to save employee';
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const res = await deleteEmployee(id);
      if (res && typeof res === 'object' && 'success' in res && (res as any).success === false) {
        throw Object.assign(new Error((res as any).message || 'Failed to delete employee'), { response: { data: res } });
      }
      return res;
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Employee deleted successfully');
      await invalidateEmployeesList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to delete employee';
      toast.error(msg);
    },
  });

  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      return importEmployeesFile(file);
    },
    onSuccess: async () => {
      await invalidateEmployeesList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to import employees';
      toast.error(msg);
    },
  });

  const exportMutation = useMutation({
    mutationFn: async () => {
      const res = await exportEmployees();
      if (!res?.success || !res?.data?.download_url) {
        throw new Error(res?.message || 'Failed to export employees');
      }
      return res;
    },
    onSuccess: (res) => {
      const link = document.createElement('a');
      link.href = res.data.download_url;
      link.download = res.data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(res.message || `Successfully exported ${res.data.total_records} employees`);
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to export employees';
      toast.error(msg);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    importMutation,
    exportMutation,
  };
}

