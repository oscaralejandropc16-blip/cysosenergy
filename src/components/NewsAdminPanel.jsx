import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Trash2, Plus, Edit3, Image as ImageIcon, Video, Tag, Calendar, FileText } from 'lucide-react';

export const NewsAdminPanel = ({ openMediaPicker, triggerSaveNotification }) => {
  const { news, addNews, updateNews, deleteNews } = useCms();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    tag: 'Operaciones',
    content: '',
    mediaUrl: '',
    mediaType: 'image'
  });

  const handleOpenForm = (item = null) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({
        title: '',
        date: new Date().toISOString().slice(0, 10),
        tag: 'Operaciones',
        content: '',
        mediaUrl: '',
        mediaType: 'image'
      });
      setEditingId(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    
    if (editingId) {
      updateNews(editingId, formData);
    } else {
      addNews(formData);
    }
    
    setIsEditing(false);
    triggerSaveNotification();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta noticia?')) {
      deleteNews(id);
      triggerSaveNotification();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-xl font-extrabold font-heading text-white">Noticias & Novedades</h3>
          <p className="text-xs text-slate-400">Publica actualizaciones y operaciones recientes.</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Noticia
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-navy-900/50 p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Título</label>
              <input 
                type="text" required
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-gold-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Etiqueta (Tag)</label>
              <input 
                type="text" required
                value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})}
                className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-gold-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Fecha</label>
              <input 
                type="date" required
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-gold-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Tipo de Medio</label>
              <select
                value={formData.mediaType} onChange={e => setFormData({...formData, mediaType: e.target.value})}
                className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-gold-500 outline-none"
              >
                <option value="image">Imagen</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400">Media (URL o Biblioteca)</label>
            <div className="flex gap-2">
              <input 
                type="text" required placeholder="/images/foto.jpg"
                value={formData.mediaUrl} onChange={e => setFormData({...formData, mediaUrl: e.target.value})}
                className="flex-1 bg-navy-950 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-gold-500 outline-none"
              />
              <button
                type="button"
                onClick={() => openMediaPicker((url) => setFormData({...formData, mediaUrl: url}), formData.mediaType)}
                className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-white/10"
              >
                {formData.mediaType === 'video' ? <Video className="w-4 h-4"/> : <ImageIcon className="w-4 h-4"/>}
                Biblioteca
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400">Contenido</label>
            <textarea 
              required rows="4"
              value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full bg-navy-950 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:border-gold-500 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-400 hover:text-white text-xs font-bold">Cancelar</button>
            <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg">Guardar Noticia</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news?.map(item => (
            <div key={item.id} className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex gap-4">
              <div className="w-24 h-24 rounded-xl bg-black overflow-hidden flex-shrink-0 relative">
                {item.mediaType === 'video' ? (
                  <video src={item.mediaUrl} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={item.mediaUrl} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute top-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] text-white backdrop-blur">
                  {item.mediaType === 'video' ? 'Video' : 'Imagen'}
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                  <Tag className="w-3 h-3 ml-2" /> {item.tag}
                </div>
                <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3 flex-1">{item.content}</p>
                
                <div className="flex justify-end gap-2 mt-auto">
                  <button onClick={() => handleOpenForm(item)} className="p-1.5 bg-navy-800 hover:bg-navy-700 rounded-lg text-slate-300 transition-colors" title="Editar">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-red-900/30 hover:bg-red-800/50 rounded-lg text-red-400 transition-colors" title="Eliminar">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsAdminPanel;
