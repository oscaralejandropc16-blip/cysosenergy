import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdfprgvlwemgoeqlmcna.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZnByZ3Zsd2VtZ29lcWxtY25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNjkzNzYsImV4cCI6MjEwMjc0NTM3Nn0._nwB4fLRDM2PMwcQFvvbdi_HrOfErl4qzwHhUPLHjmc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Guarda o actualiza un estado en la base de datos de Supabase.
 * Usa upsert para crear o sobrescribir usando el ID como llave.
 */
export const saveToSupabase = async (key, data) => {
  try {
    const { error } = await supabase
      .from('cms_store')
      .upsert({ id: key, data, updated_at: new Date().toISOString() });
      
    if (error) {
      console.error('Error al guardar en Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error de conexión a Supabase:', err.message);
    return false;
  }
};

/**
 * Obtiene todos los estados guardados en la tabla cms_store.
 * Retorna un mapa de { key: data } para carga ultra rápida.
 */
export const loadAllFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('cms_store')
      .select('id, data');
      
    if (error) {
      console.error('Error al cargar desde Supabase:', error.message);
      return null;
    }
    
    const stateMap = {};
    if (data) {
      data.forEach(row => {
        stateMap[row.id] = row.data;
      });
    }
    return stateMap;
  } catch (err) {
    console.error('Error de conexión a Supabase:', err.message);
    return null;
  }
};

/**
 * STORAGE FUNCTIONS
 */

export const uploadToSupabaseStorage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file, { upsert: false });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl, name: file.name, path: filePath };
  } catch (error) {
    console.error('Error uploading to Supabase Storage:', error);
    return { success: false, error };
  }
};

export const deleteFromSupabaseStorage = async (pathOrUrl) => {
  try {
    let path = pathOrUrl;
    if (pathOrUrl.includes('supabase.co')) {
      // Extract path from public URL
      const parts = pathOrUrl.split('/media/');
      if (parts.length > 1) {
        path = parts[1];
      }
    }

    const { error } = await supabase.storage
      .from('media')
      .remove([path]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting from Supabase Storage:', error);
    return { success: false, error };
  }
};

export const listSupabaseStorage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('media')
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) throw error;

    // Map to the format expected by the frontend
    return data.filter(file => file.name !== '.emptyFolderPlaceholder').map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(file.name);
        
      const isVideo = file.metadata?.mimetype?.includes('video') || file.name.match(/\.(mp4|webm|ogg)$/i);

      return {
        id: file.id || file.name,
        name: file.name,
        type: isVideo ? 'video' : 'image',
        url: publicUrl,
        path: file.name,
        date: file.created_at ? new Date(file.created_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        tag: 'Supabase Storage'
      };
    });
  } catch (error) {
    console.error('Error listing Supabase Storage:', error);
    return [];
  }
};

/**
 * Registra una visita y obtiene las estadísticas actualizadas desde Supabase.
 */
export const recordVisitInSupabase = async (isNewSession = true, isUniqueUser = false) => {
  const DEFAULT_ANALYTICS = {
    totalVisits: 1,
    uniqueVisitors: 1,
    todayVisits: 1,
    lastDate: new Date().toISOString().split('T')[0],
    history: [
      { date: new Date().toISOString().split('T')[0], visits: 1 }
    ],
    devices: { mobile: 50, desktop: 50 }
  };

  try {
    const { data, error } = await supabase
      .from('cms_store')
      .select('data')
      .eq('id', 'cysos_cms_analytics')
      .single();

    let current = data?.data ? { ...DEFAULT_ANALYTICS, ...data.data } : DEFAULT_ANALYTICS;
    const todayStr = new Date().toISOString().split('T')[0];

    // Reset today's visits if new day
    let todayVisits = current.todayVisits || 0;
    if (current.lastDate !== todayStr) {
      if (current.lastDate && todayVisits > 0) {
        current.history = [
          ...(current.history || []).slice(-6),
          { date: current.lastDate, visits: todayVisits }
        ];
      }
      todayVisits = 0;
    }

    if (isNewSession) {
      current.totalVisits = (Number(current.totalVisits) || 0) + 1;
      todayVisits += 1;
      if (isUniqueUser) {
        current.uniqueVisitors = (Number(current.uniqueVisitors) || 0) + 1;
      }
    }

    current.todayVisits = todayVisits;
    current.lastDate = todayStr;
    current.updated_at = new Date().toISOString();

    if (isNewSession) {
      await supabase
        .from('cms_store')
        .upsert({ id: 'cysos_cms_analytics', data: current, updated_at: new Date().toISOString() });
    }

    return current;
  } catch (err) {
    console.error('Error registrando visita en Supabase:', err);
    return DEFAULT_ANALYTICS;
  }
};

/**
 * Guarda las estadísticas de analítica modificadas desde el Admin Panel
 */
export const saveAnalyticsToSupabase = async (analyticsData) => {
  try {
    const { error } = await supabase
      .from('cms_store')
      .upsert({ id: 'cysos_cms_analytics', data: analyticsData, updated_at: new Date().toISOString() });
    return !error;
  } catch (err) {
    console.error('Error guardando analítica en Supabase:', err);
    return false;
  }
};
