/**
 * Cloudinary Cloud Upload Service for CYSOS ENERGY
 * Enables seamless, direct high-speed uploads of high-resolution photos and videos to Cloudinary.
 */

export const CLOUDINARY_CONFIG = {
  cloudName: 'wv92q44j',
  uploadPreset: 'vhu457oq',
  uploadUrl: 'https://api.cloudinary.com/v1_1/wv92q44j/auto/upload'
};

/**
 * Uploads a local File (photo or video) directly to Cloudinary CDN
 * @param {File} file - The file selected by the user
 * @param {Function} [onProgress] - Optional progress callback (percent)
 * @returns {Promise<{ url: string, secure_url: string, resource_type: string, public_id: string }>}
 */
export const uploadToCloudinary = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl, true);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.secure_url || response.url,
            secure_url: response.secure_url,
            resource_type: response.resource_type, // 'image' or 'video'
            public_id: response.public_id,
            bytes: response.bytes,
            format: response.format,
            duration: response.duration
          });
        } catch (err) {
          reject(new Error('Error al procesar respuesta de Cloudinary: ' + err.message));
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(new Error(errorResponse.error?.message || 'Error al subir a Cloudinary'));
        } catch {
          reject(new Error(`Error de subida (${xhr.status}): ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Error de conexión con los servidores de Cloudinary.'));
    };

    xhr.send(formData);
  });
};
