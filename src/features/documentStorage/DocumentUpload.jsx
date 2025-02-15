import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const encryptionKey = import.meta.env.VITE_PUBLIC_ENCRYPTION_KEY || 'default_key';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      console.log("Reading file for encryption:", file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const fileData = reader.result;
        const encrypted = CryptoJS.AES.encrypt(fileData, encryptionKey).toString();
        console.log("File encrypted, preparing to upload");
        const response = await fetch('/api/uploadDocument', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, data: encrypted }),
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        console.log("Document uploaded successfully");
        setStatus('Document uploaded successfully!');
      };
      reader.onerror = (error) => {
        throw error;
      };
    } catch (error) {
      console.error("Error uploading document:", error);
      import("@sentry/browser").then(Sentry => {
        Sentry.captureException(error);
      });
      setStatus('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input type="file" onChange={handleFileChange} className="box-border" />
      <button type="submit" disabled={loading} className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? 'Uploading...' : 'Upload Document'}
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}