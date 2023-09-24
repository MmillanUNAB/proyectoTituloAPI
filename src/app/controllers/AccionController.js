const accionModel= require('../models/AccionModel')


const resitrarAccion = async(req, res) => {
    const requiredParams = {
        accion: req.body.accion || null,
        idUsuario: req.body.idUsuario || null,
        idGps: req.body.idGps || null
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios'  
    });
    
    const nAccion= await accionModel.registrarAccion(requiredParams)
    console.log(nAccion);
    if (nAccion===undefined){
        return res.status(500).json({
            ok: false,
            message: 'No se pudo registrar',   
        });
    }

    return res.status(200).json({
        ok: true,
        message: 'Accion registrada',   
        
    });
}

const descargarReporte = async(req, res) => {
    const excel = require('exceljs');
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Reporte');

    const reporte = await accionModel.obtenerAcciones();
        console.log(reporte);
    const columnas = [
        {
            key:'codigo', header:'Codigo sitio'
        },
        {
            key:'nombre', header:'Nombre sitio'
        },
        {
            key:'tipogg', header:'Generador instalado'
        },
        {
            key:'numero', header:'Numero.GPS'
        },
        {
            key:'usuario', header:'Usuario'
        },
        {
            key:'accion', header:'Acción realizada'
        },
        {
            key:'fecha', header:'Fecha de la acción'
        },
    ]
    worksheet.columns = columnas;
    worksheet.addRows(reporte);

    const fileName = `reporte-${Math.floor(Date.now() / 1000)}.xlsx`;
    const path = `public/${fileName}`;

    workbook.xlsx.writeFile(path)
    .then(() => {
        console.log("file saved!");
        return res.status(200).json({
            ok: true,
            data: {
                url: `http://192.168.1.13:8001/${fileName}`
            }
        })
    })
    .catch(function(error) {
        console.log('error', error);
        return res.status(500).json({
            ok: false,
            data: {
                url: ``
            }
        })
    });
}


module.exports = {
    resitrarAccion,
    descargarReporte
}