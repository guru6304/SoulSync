import React, { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

import useMemories from "../../hooks/useMemories";
import ThemeProvider from "../../theme/ThemeProvider";
import MemoryForm from "../../components/memories/MemoryForm";
import { useToast } from "../../context/ToastContext";
import apiClient from "../../services/apiClient";

import "./CreateMemoryPage.css";

const CreateMemoryContent = () => {
  const navigate = useNavigate();
  const { addMemory } = useMemories();
  const { showSuccess, showError } = useToast();
  const [uploading, setUploading] = useState(false);

  /**
   * Upload a single image file to Cloudinary via the backend upload route.
   * Returns { url, public_id, media_type, file_size }
   */
  const uploadImageFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post("/uploads/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data; // { url, public_id, media_type, file_size }
  };

  const handleSubmit = async (values) => {
    if (uploading) return;

    const { images, ...memoryData } = values;

    try {
      setUploading(true);

      // Step 1 — Upload all selected image files to Cloudinary
      let uploadedMedia = [];
      if (images && images.length > 0) {
        const uploadPromises = images.map((item) => uploadImageFile(item.file));
        uploadedMedia = await Promise.all(uploadPromises);
      }

      // Step 2 — Create the memory record (text/metadata only)
      const result = await addMemory({
        title: memoryData.title,
        description: memoryData.description,
        visibility: "shared",
      });

      const createdMemory = result?.payload || result?.data?.data;
      const memoryId = createdMemory?.id;

      // Step 3 — Attach uploaded media to the memory (if any images)
      if (memoryId && uploadedMedia.length > 0) {
        try {
          const attachPayload = uploadedMedia.map((m) => ({
            file_url: m.url,
            public_id: m.public_id,
            media_type: "image",
            file_size: m.file_size,
            mime_type: "image/jpeg",
          }));
          await apiClient.post(`/memory-media/attach/${memoryId}`, {
            media: attachPayload,
          });
        } catch (_attachErr) {
          // Non-critical — memory was created successfully, media attachment optional
          console.warn("Memory created but media attachment failed:", _attachErr?.message);
        }
      }

      showSuccess("Memory saved ❤️");
      navigate("/memories");
    } catch (error) {
      showError(error, "Unable to save memory. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="ss-create-memory-page-wrapper">
      <div className="ss-create-memory-page-container">
        {/* Top Navigation */}
        <div className="ss-create-memory-top-nav">
          <button
            type="button"
            className="ss-memory-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Back</span>
          </button>

          <div className="ss-create-memory-title-group">
            <h1>📸 Create a Memory</h1>
            <p>"Save one more beautiful moment forever. ❤️"</p>
          </div>
        </div>

        {/* Upload progress indicator */}
        {uploading && (
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              padding: "0.75rem 1.25rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              textAlign: "center",
              fontSize: "0.95rem",
            }}
          >
            ⏳ Uploading your photos and saving memory...
          </div>
        )}

        {/* Memory Form */}
        <MemoryForm onSubmit={handleSubmit} disabled={uploading} />
      </div>
    </div>
  );
};

const CreateMemoryPage = () => (
  <ThemeProvider>
    <CreateMemoryContent />
  </ThemeProvider>
);

export default CreateMemoryPage;