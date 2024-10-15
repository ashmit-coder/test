import { Loader2 } from "lucide-react";
import PropTypes from 'prop-types';

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500 w-12 h-12 mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Searching for a driver...
          </p>
        </div>
      </div>
    </div>
  );
};
LoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default LoadingModal;
