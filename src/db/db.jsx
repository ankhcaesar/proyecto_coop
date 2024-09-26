import Dexie from 'dexie';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import config from "../config.json"

const db = new Dexie('ptovta_compra');

db.version(1).stores({
    usuarios: '++id_usr, nombreyapellido, curso, whatsapp, email, **usuario**,contrasena, permiso',
    articulos: '++id_art, nombre_art, sub_categoria, descripcion, cod_bar, valor_unit',
    categorias: '++id_cat, nombre_cat',
    subcategorias: '++id_subcat, nombre_subcat, id_cat',
    lista_productos: '++id_lista_prods, id_vta, id_art, valor_unit, cant, total_valor',
    ventas: '++id_vta, fecha_vta, id_usr, total_valor, id_lista_prods, estado, mp_ft, mp_tf, mp_cc',
    historial: '++id_hist, id_vta, fecha_vta, id_usr, total_valor, mp_ft, mp_tf, mp_cc, id_lista_prods'
});

// Inicialización de la base de datos
db.open().catch(err => {
    console.error('Error al abrir la base de datos:', err);
});


const supabaseUrl = config.supabaseUrl;
const supabaseAnonKey = config.supabaseAnonKey;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cola de tareas
const taskQueue = [];

// Función para agregar una tarea a la cola
const addToQueue = (task, table) => {
    taskQueue.push({ table, data: task });
};

// Función para procesar la cola
const processQueue = async () => {
    if (taskQueue.length === 0) return;

    const batchSize = 10; // Procesar 10 tareas por lote
    while (taskQueue.length > 0) {
        const batch = taskQueue.splice(0, batchSize);

        try {
            const { data, error } = await supabase
                .from(table)
                .insert(batch.map(item => item.data));

            if (error) {
                // Manejar errores, por ejemplo, volver a intentar más tarde
                console.error('Error al enviar datos a Supabase:', error);
                // Agregar las tareas fallidas a una cola de reintentos
            }
        } catch (error) {
            // Capturar otros tipos de errores
            console.error('Error inesperado:', error);
        }
    }
};

// useEffect para procesar la cola periódicamente o cuando haya conexión
useEffect(() => {
    const intervalId = setInterval(processQueue, 5000); // Procesar la cola cada 5 segundos

    return () => clearInterval(intervalId);
}, []);

// Supabase Realtime Subscriptions
useEffect(() => {
    const subscriptions = [];

    const tables = ['usuarios', 'articulos', 'categorias', 'subcategorias', 'lista_productos', 'ventas', 'historial'];
    tables.forEach(table => {
        const subscription = supabase
            .from(table)
            .on('*', async (payload) => {
                const { new: newData, old: oldData } = payload;

                // Lógica para actualizar IndexedDB, adaptando a cada tabla
                if (newData) {
                    await db[table].add(newData);
                } else if (oldData) {
                    await db[table].delete(oldData.id);
                } else {
                    await db[table].update(newData.id, newData);
                }
            })
            .subscribe();

        subscriptions.push(subscription);
    });

    return () => {
        subscriptions.forEach(subscription => subscription.unsubscribe());
    };
}, []);


export default db;