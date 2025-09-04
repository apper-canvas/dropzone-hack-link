export const uploadService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "progress_c"}},
          {"field": {"Name": "uploaded_at_c"}},
          {"field": {"Name": "url_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('upload_c', params);
      
      if (!response.success) {
        console.error('Upload service getAll error:', response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching uploads:', error?.response?.data?.message || error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "progress_c"}},
          {"field": {"Name": "uploaded_at_c"}},
          {"field": {"Name": "url_c"}}
        ]
      };

      const response = await apperClient.getRecordById('upload_c', id, params);
      
      if (!response.success) {
        console.error(`Upload service getById error for ID ${id}:`, response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching upload ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async create(uploadData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          name_c: uploadData.name || uploadData.name_c,
          size_c: uploadData.size || uploadData.size_c,
          type_c: uploadData.type || uploadData.type_c,
          status_c: uploadData.status || uploadData.status_c || "pending",
          progress_c: uploadData.progress || uploadData.progress_c || 0,
          uploaded_at_c: uploadData.uploadedAt || uploadData.uploaded_at_c || null,
          url_c: uploadData.url || uploadData.url_c || null
        }]
      };

      const response = await apperClient.createRecord('upload_c', params);
      
      if (!response.success) {
        console.error('Upload service create error:', response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create upload:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful[0]?.data;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error creating upload:', error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updatePayload = {
        Id: parseInt(id)
      };

      // Map fields properly
      if (updateData.name !== undefined) updatePayload.name_c = updateData.name;
      if (updateData.name_c !== undefined) updatePayload.name_c = updateData.name_c;
      if (updateData.size !== undefined) updatePayload.size_c = updateData.size;
      if (updateData.size_c !== undefined) updatePayload.size_c = updateData.size_c;
      if (updateData.type !== undefined) updatePayload.type_c = updateData.type;
      if (updateData.type_c !== undefined) updatePayload.type_c = updateData.type_c;
      if (updateData.status !== undefined) updatePayload.status_c = updateData.status;
      if (updateData.status_c !== undefined) updatePayload.status_c = updateData.status_c;
      if (updateData.progress !== undefined) updatePayload.progress_c = updateData.progress;
      if (updateData.progress_c !== undefined) updatePayload.progress_c = updateData.progress_c;
      if (updateData.uploadedAt !== undefined) updatePayload.uploaded_at_c = updateData.uploadedAt;
      if (updateData.uploaded_at_c !== undefined) updatePayload.uploaded_at_c = updateData.uploaded_at_c;
      if (updateData.url !== undefined) updatePayload.url_c = updateData.url;
      if (updateData.url_c !== undefined) updatePayload.url_c = updateData.url_c;

      const params = {
        records: [updatePayload]
      };

      const response = await apperClient.updateRecord('upload_c', params);
      
      if (!response.success) {
        console.error(`Upload service update error for ID ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update upload:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful[0]?.data;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error updating upload ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('upload_c', params);
      
      if (!response.success) {
        console.error(`Upload service delete error for ID ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete upload:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting upload ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async simulateUpload(id, onProgress) {
    try {
      // Simulate upload progress with updates to database
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Update progress in database
        await this.update(id, {
          status_c: progress === 100 ? "completed" : "uploading",
          progress_c: progress,
          uploaded_at_c: progress === 100 ? new Date().toISOString() : null,
          url_c: progress === 100 ? `/uploads/file_${id}` : null
        });
        
        if (onProgress) {
          onProgress(progress);
        }
      }

      // Return updated record
      return await this.getById(id);
    } catch (error) {
      // Mark as error status
      await this.update(id, {
        status_c: "error",
        progress_c: 0
      });
      
      console.error(`Error simulating upload ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "text/csv",
      "application/json"
    ];

    if (file.size > maxSize) {
      throw new Error(`File size exceeds 10MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type "${file.type}" is not allowed. Supported types: images, PDF, Word documents, text files.`);
    }

    return true;
  },

  async createSession(files) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const totalSize = files.reduce((sum, file) => sum + (file.size || file.size_c || 0), 0);
      const fileIds = files.map(f => f.Id).join(',');
      
      const params = {
        records: [{
          files_c: fileIds,
          total_size_c: totalSize,
          started_at_c: new Date().toISOString(),
          completed_at_c: null
        }]
      };

      const response = await apperClient.createRecord('upload_session_c', params);
      
      if (!response.success) {
        console.error('Upload session create error:', response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create upload session:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful[0]?.data;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error creating upload session:', error?.response?.data?.message || error);
      throw error;
    }
  },

  async completeSession(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          completed_at_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.updateRecord('upload_session_c', params);
      
      if (!response.success) {
        console.error(`Upload session complete error for ID ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to complete upload session:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful[0]?.data;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error completing upload session ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  async getHistory() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "progress_c"}},
          {"field": {"Name": "uploaded_at_c"}},
          {"field": {"Name": "url_c"}}
        ],
        where: [
          {"FieldName": "status_c", "Operator": "EqualTo", "Values": ["completed"], "Include": true},
          {"FieldName": "uploaded_at_c", "Operator": "HasValue", "Values": [], "Include": true}
        ],
        orderBy: [{"fieldName": "uploaded_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords('upload_c', params);
      
      if (!response.success) {
        console.error('Upload history fetch error:', response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching upload history:', error?.response?.data?.message || error);
      throw error;
    }
  }
};