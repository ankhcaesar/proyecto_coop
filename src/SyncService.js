
import { createClient } from '@supabase/supabase-js';
import config from "./config.json"
import db from './db/db';


const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);


async function handleError(error, message) {
    console.error(message, error);

    }


// Función para sincronizar los datos iniciales
async function syncTable(tableName) {
    try {
        const { data, error } = await supabase.from(tableName).select('*');
        if (error) {
            await handleError(error, `Error al obtener datos de ${tableName}`);
            return;
        }
        await db[tableName].bulkPut(data);
    } catch (error) {
        await handleError(error, `Error al sincronizar ${tableName}`);
    }
}
async function syncInitialData() {
    try {
        await syncTable('articulos');
        await syncTable('categorias');
        await syncTable('subcategorias');
        await syncTable('usuarios');
        await syncTable('ventas');
        await syncTable('historial');
        await syncTable('lista_productos');
    } catch (error) {
        await handleError(error, 'Error en la sincronización inicial');
    }
}



// Suscripciones a cambios en Supabase
const subscription = supabase
    .from('articulos')
    .on('*', async (payload) => {
        const { new: articulo } = payload;
        // Actualizar o insertar el artículo en IndexedDB
        await db.articulos.put(articulo);
    })
    .subscribe();

supabase
    .from('categorias')
    .on('*', async (payload) => {
        const { new: categoria } = payload;
        await db.categorias.put(categoria);
    })
    .subscribe();


// Escuchar cambios en la tabla historial
db.historial.on('changes', async (changes) => {
    changes.forEach(async (change) => {
        if (change.type === 'ADD' || change.type === 'UPDATE') {
            await supabase.from('historial').upsert(change.object);
        } else if (change.type === 'DELETE') {
            await supabase.from('historial').delete().match({ id_hist: change.old.id_hist });
        }
    });
});

// Escuchar cambios en la tabla usuarios
db.usuarios.on('changes', async (changes) => {
    changes.forEach(async (change) => {
        if (change.type === 'ADD' || change.type === 'UPDATE') {
            await supabase.from('usuarios').upsert(change.object);
        }
    });
});


syncInitialData();
export default SyncService;