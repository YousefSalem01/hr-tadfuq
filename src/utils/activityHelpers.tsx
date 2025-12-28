/**
 * Activity Log Helper Utilities
 * Functions for activity log icons, colors, and formatting
 */

import {
  UserPlus,
  Edit,
  Trash2,
  FileText,
  Clock,
  User
} from 'lucide-react';

/**
 * Get icon component for activity log actions
 */
export const getActionIcon = (action: string) => {
  switch (action) {
    case 'Created':
      return <UserPlus className="text-green-600" size={18} />;
    case 'Updated':
      return <Edit className="text-blue-600" size={18} />;
    case 'Deleted':
      return <Trash2 className="text-red-600" size={18} />;
    case 'Permission Changed':
      return <User className="text-purple-600" size={18} />;
    case 'Logged In':
      return <Clock className="text-green-600" size={18} />;
    case 'Logged Out':
      return <Clock className="text-gray-600" size={18} />;
    default:
      return <FileText className="text-gray-600" size={18} />;
  }
};

/**
 * Get badge classes for activity log actions
 */
export const getActionBadgeColor = (action: string): string => {
  switch (action) {
    case 'Created':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Updated':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Deleted':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Permission Changed':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Logged In':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Logged Out':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

