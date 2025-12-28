/**
 * Status Helper Utilities
 * Centralized functions for status-related styling and formatting
 */

/**
 * Get badge classes for different status types
 * Returns combined classes for background, text, and border colors
 */
export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    // Active/Success states
    case 'Active':
      return 'bg-green-100 text-green-700 border-green-200';
    
    // Approved states
    case 'Approved':
      return 'bg-green-100 text-green-700 border-green-200';
    
    // Present state (Attendance)
    case 'Present':
      return 'bg-green-100 text-green-700 border-green-200';
    
    // Pending/Warning states
    case 'Pending':
    case 'pending':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    
    // On Leave states
    case 'On Leave':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    
    // Late state (Attendance)
    case 'Late':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    
    // Remote state (Attendance)
    case 'Remote':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    
    // Rejected/Error states
    case 'Rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    
    // Expired states
    case 'Expired':
      return 'bg-red-100 text-red-700 border-red-200';
    
    // Inactive states
    case 'Inactive':
      return 'bg-red-100 text-red-700 border-red-200';
    
    // Absent state (Attendance)
    case 'Absent':
      return 'bg-red-100 text-red-700 border-red-200';
    
    // Hold/Neutral states
    case 'Hold':
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

