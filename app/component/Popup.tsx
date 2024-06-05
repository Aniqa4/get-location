import React, { useState } from 'react';

interface PopupProps {
    onClose: () => void;
    onRequestPermission: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose, onRequestPermission }) => {
    const [showPopup, setShowPopup] = useState(true);

    const handleClose = () => {
        setShowPopup(false);
        onClose(); // Call the callback to handle closing from the parent component
    };

    const handleRequestPermission = () => {
        onRequestPermission(); // Call the callback to handle permission request
    };

    return (
        <div className="popup rounded shadow grid grid-cols-1 gap-5">
            <h2>Allow Location Access</h2>
            <p>This website would like to use your location to show nearby shops.</p>
            <div>
                <button onClick={handleRequestPermission} className=' bg-green-400 rounded px-5 py-1 me-5'>Allow</button>
                <button onClick={handleClose} className=' bg-red-400 rounded px-5 py-1'>Deny</button>
            </div>
            <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ddd;
          z-index: 10;
        }
      `}</style>
        </div>
    );
};

export default Popup;
