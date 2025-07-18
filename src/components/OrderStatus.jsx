import React from 'react';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

const OrderStatus = ({ status, createdAt }) => {
  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100', text: 'Order Placed' };
      case 'processing':
        return { icon: Package, color: 'text-blue-500', bg: 'bg-blue-100', text: 'Processing' };
      case 'shipped':
        return { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-100', text: 'Shipped' };
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', text: 'Delivered' };
      default:
        return { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100', text: 'Unknown' };
    }
  };

  const statusInfo = getStatusInfo(status);
  const Icon = statusInfo.icon;

  return (
    <div className="flex items-center space-x-2">
      <div className={`p-2 rounded-full ${statusInfo.bg}`}>
        <Icon className={`w-4 h-4 ${statusInfo.color}`} />
      </div>
      <div>
        <p className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderStatus;