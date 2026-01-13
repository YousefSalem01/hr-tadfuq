import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  createAttendance,
  updateAttendance,
  deleteAttendance,
  importAttendanceFile,
  exportAttendance,
} from '../api/attendanceApi';
import { ATTENDANCE_QUERY_KEY } from './useAttendanceQuery';

/**
 * React Query mutations for attendance CRUD + import/export
 * TODO: Wire up once backend ready
 */
export function useAttendanceMutations() {
  const queryClient = useQueryClient();

  const invalidateList = async () => {
    await queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY });
  };

  // TODO: Uncomment/enable when backend ready
  const createMutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const res = await createAttendance(payload);
      if (res && typeof res === 'object' && 'success' in res && (res as any).success === false) {
        throw Object.assign(new Error((res as any).message || 'Failed to create attendance'), { response: { data: res } });
      }
      return res;
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Attendance created successfully');
      await invalidateList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to create attendance';
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (args: { id: number | string; patch: Record<string, any> }) => {
      const res = await updateAttendance(args.id, args.patch);
      if (res && typeof res === 'object' && 'success' in res && (res as any).success === false) {
        throw Object.assign(new Error((res as any).message || 'Failed to update attendance'), { response: { data: res } });
      }
      return res;
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Attendance updated successfully');
      await invalidateList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to update attendance';
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const res = await deleteAttendance(id);
      if (res && typeof res === 'object' && 'success' in res && (res as any).success === false) {
        throw Object.assign(new Error((res as any).message || 'Failed to delete attendance'), { response: { data: res } });
      }
      return res;
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Attendance deleted successfully');
      await invalidateList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to delete attendance';
      toast.error(msg);
    },
  });

  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      return importAttendanceFile(file);
    },
    onSuccess: async (res: any) => {
      toast.success(res?.message || 'Attendance imported successfully');
      await invalidateList();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to import attendance';
      toast.error(msg);
    },
  });

  const exportMutation = useMutation({
    mutationFn: async () => {
      const res = await exportAttendance();
      if (!res?.success || !res?.data?.download_url) {
        throw new Error(res?.message || 'Failed to export attendance');
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
      toast.success(res.message || `Successfully exported ${res.data.total_records} records`);
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || err?.message || 'Failed to export attendance';
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
