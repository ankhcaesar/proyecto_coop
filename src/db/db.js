import Dexie from 'dexie';


const db = new Dexie('ptovta_compra');

db.version(1).stores({
    usuarios: '++id_usr,nombreyapellido,curso,whatsapp,email,**usuario**,contrasena,permiso',
    articulos: '++id_art,nombre_art,sub_categoria,descripcion,cod_bar,valor_unit',
    categorias: '++id_cat,nombre_cat',
    subcategorias: '++id_subcat,nombre_subcat,id_cat',
    lista_productos: '++id_lista_prods,id_vta,id_art,valor_unit,cant,total_valor',
    ventas: '++id_vta,fecha_vta,id_usr,total_valor,id_lista_prods,estado,mp_ft,mp_tf,mp_cc',
    historial: '++id_hist,id_vta,fecha_vta,id_usr,total_valor,id_lista_prods,mp_ft,mp_tf,mp_cc'
});

// Inicialización de la base de datos
db.open().catch(err => {
    console.error('Error al abrir la base de datos:', err);
});


export default db;