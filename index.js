import express from "express";
import app from "./app";
import './database/connectionsToDatabases/connectionWikInventory'

app.listen(app.get('port'))

console.clear()
console.log('server on port: ', app.get('port'))
console.log('Enlace al puerto: '+'http://localhost:'+app.get('port'));