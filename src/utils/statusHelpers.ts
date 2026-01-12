/**
 * Status Helper Utilities
 * Centralized functions for status-related styling and formatting
 */

/**
 * Get badge classes for different status types
 * Returns combined classes for background, text, and border colors
 */
export const getStatusBadgeColor = (status: string): string => {
  const normalizedStatus = status.toLowerCase();
  
  switch (normalizedStatus) {
    // Active/Success states
    case 'active':
    case 'approved':
    case 'present':
      return 'bg-[#6ce9a620] text-[#039855] border-[#6ce9a640]';
    
    // On Leave/Warning states
    case 'on_leave':
    case 'on leave':
    case 'pending':
    case 'late':
      return 'bg-[#fde68a20] text-[#f59e0b] border-[#fde68a40]';
    
    // Inactive/Error states
    case 'inactive':
    case 'rejected':
    case 'expired':
    case 'absent':
      return 'bg-[#fecdd320] text-[#ef4444] border-[#fecdd340]';
    
    // Remote state (Attendance)
    case 'remote':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    
    // Hold/Neutral states
    case 'hold':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    
    // Default fallback
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

/**
 * Format status string for display
 * Capitalizes first letter of status
 */
export const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

