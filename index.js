/*
Luis Miguel Gómez Londoño - 201729597
Desarrollo Web 2020-2
Ejercicio Node
*/

const fs = require("fs");
const http = require("http");
const axios = require("axios");

let leerClientes = (callback) => {
    const URL = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
    fs.readFile("index.html", (err, data) => {
        let htmlContent = data.toString();
        htmlContent = htmlContent.replace("{{replace}}", "<h1>Luis Miguel Gomez Londo;o</h1>");
        callback(htmlContent);
    });
};

let readFile = (url, callback) => {
    let data = axios.get(url).then(res => {
        callback(res.data);
    });
};

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    if (req.url == '/api/proveedores') {
        const URL = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
        readFile(URL, (prov) => {
            fs.readFile("index.html", (err, data) => {
                let htmlContent = data.toString();

                let title = "<h1>Listado de proveedores</h1>";
                let headers =
                    `<th scope="col">ID Proveedor</th>
                <th scope="col">Compañia</th>
                <th scope="col">Nombre Contacto</th>
                `;
                let rows = "";

                prov.forEach(i => {
                    rows = rows +
                        `
                    <tr>
                    <th scope="row">${i.idproveedor}</th>
                    <td>${i.nombrecompania}</td>
                    <td>${i.nombrecontacto}</td>
                    </tr>
                    `;
                });

                htmlContent = htmlContent.replace("{{title}}", title);
                htmlContent = htmlContent.replace("{{headers}}", headers);
                htmlContent = htmlContent.replace("{{rows}}", rows);

                res.end(htmlContent);
            });
        });
    }
    if (req.url == '/api/clientes') {
        const URL = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
        readFile(URL, (cli) => {
            fs.readFile("index.html", (err, data) => {
                let htmlContent = data.toString();

                let title = "<h1>Listado de clientes</h1>";
                let headers =
                    `<th scope="col">ID Cliente</th>
                <th scope="col">Compañia</th>
                <th scope="col">Nombre Contacto</th>
                `;
                let rows = "";

                cli.forEach(i => {
                    rows = rows +
                        `
                    <tr>
                    <th scope="row">${i.idCliente}</th>
                    <td>${i.NombreCompania}</td>
                    <td>${i.NombreContacto}</td>
                    </tr>
                    `;
                });

                htmlContent = htmlContent.replace("{{title}}", title);
                htmlContent = htmlContent.replace("{{headers}}", headers);
                htmlContent = htmlContent.replace("{{rows}}", rows);

                res.end(htmlContent);
            });
        });
    }

}).listen(8081);