const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("."));
app.use("/uploads",express.static("uploads"));

if(!fs.existsSync("uploads")){
fs.mkdirSync("uploads");
}

const upload = multer({
dest:"uploads/"
});

app.post(
"/submit",
upload.single("comprobante"),
(req,res)=>{

const data =
JSON.parse(
fs.readFileSync(
"data/participantes.json"
)
);

const numero =
Number(req.body.numero);

const usado =
data.find(
p=>p.numero===numero
);

if(usado){

return res.json({
message:"Número ocupado"
});

}

const nuevo = {

nombre:req.body.nombre,
telefono:req.body.telefono,
email:req.body.email,
numero:numero,
archivo:req.file.filename

};

data.push(nuevo);

fs.writeFileSync(
"data/participantes.json",
JSON.stringify(data,null,2)
);

res.json({
message:"Inscripción exitosa"
});

});

app.get("/admin",(req,res)=>{

const data =
JSON.parse(
fs.readFileSync(
"data/participantes.json"
)
);

res.send(data);

});

app.listen(3000,()=>{

console.log(
"Servidor en puerto 3000"
);

});
