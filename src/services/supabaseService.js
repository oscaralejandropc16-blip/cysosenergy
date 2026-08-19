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
