import React, { useEffect } from 'react';
import useIndexedDB from 'react-indexed-db';

const dbName = 'mi_base_datos';

const objectStores = {
    usuarios: ['id_usr', 'nombre_usr', 'permiso'],
    articulos: [
        'id_art',
        'nombre_art',
        'sub_categoria', // Índice para la relación con subcategorías
        'descripcion',
        'cod_bar',
        'imagen',
        'valor_unit'
    ],
    categorias: ['id_cat', 'nombre_cat'],
    subcategorias: [
        'id_subcat',
        'nombre_subcat',
        'id_cat' // Índice para la relación con categorías
    ],
    lista_productos: ['id_lista_prods', 'id_vta', 'id_art', 'valor_unit', 'cant', 'total_valor'],
    ventas: [
        'id_vta',
        'fecha_vta',
        'id_usr',
        'total_valor',
        'id_lista_prods', // Índice para la relación con lista_productos
        'estado',
        'mp_ft',
        'mp_tf',
        'mp_cc'
    ],
    historial: ['id_hist', 'id_vta', 'fecha_vta', 'id_usr', 'total_valor', 'mp_ft', 'mp_tf', 'mp_cc', 'lista_prods']
};

function App() {
    const { createDb, query } = useIndexedDB(dbName);

    useEffect(() => {
        createDb(objectStores)
            .then(() => {
                console.log('Base de datos creada exitosamente');
            })
            .catch(error => {
                console.error('Error al crear la base de datos:', error);
            });
    }, [createDb, objectStores]);



   
    
    return (
        <div>
            {/* Tu interfaz de usuario */}
        </div>
    );
}

export default App;