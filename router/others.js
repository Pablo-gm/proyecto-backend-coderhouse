const { Router } = require('express');
const router = Router();
const numCPUs = require("os").cpus().length;

// Info route
router.get('/info', (req, res) => {
    const info = getInfo();
    res.render("pages/info.hbs", {info});
});

function getInfo(){
    const systemInfo = {
      argumentos_de_entrada: process.argv.slice(2),
      path_de_ejecucion: process.execPath,
      sistema_operativo: process.platform,
      process_id: process.pid,
      version_node: process.version,
      carpeta_del_proyecto: process.cwd(),
      memoria_total_reservada: process.memoryUsage().rss,
      numero_CPUs: numCPUs
    };
    return systemInfo;
  }

module.exports = router;