# Nodejs API-REST

Una API de REST, o API de RESTful, es una interfaz de programación de aplicaciones (API o API web) que se ajusta a los límites de la arquitectura REST y permite la interacción con los servicios web de RESTful. El informático Roy Fielding es el creador de la transferencia de estado representacional (REST).

## Diagrama de red

![image](https://user-images.githubusercontent.com/81053948/194193909-ec972d6d-067c-418a-9ab4-1ee63f6d3062.png)

#
## Desarrollo
Se realizo una API REST de tipo FULL con las siguientes Tecnologias

    - NodeJs
    - MySQL
    - Express
    - Nginx
    - PM2

Estructura de la API

![image](https://user-images.githubusercontent.com/81053948/194195272-99134ee8-c336-46f0-b729-dc3692514285.png)

#
## Base de datos

![image](https://user-images.githubusercontent.com/81053948/194195417-23780fee-e9f5-404b-9e3d-3f784c3a34cc.png)

Conexion de la Base de datos 

    IP = 143.244.201.52
    Puerto = 36207

![image](https://user-images.githubusercontent.com/81053948/194195545-598efed0-0264-4920-b01b-d6f8fcc4bcaa.png)

Datos Insertados 

![image](https://user-images.githubusercontent.com/81053948/194196772-d8d42a4e-3db3-455f-bd71-2c923ed63088.png)

#

## Configuracion de kluster

Se configuro un kluster para realizar el deploy de la API-REST de la siguiente manera.

Vista del kluster en DigitalOcean

![image](https://user-images.githubusercontent.com/81053948/194197725-6a6a095d-cd81-4431-acf6-e559d0d5e93c.png)


Despliege de la aplicacion en el kluster

Acessos

    IP = 104.16.243.78
    Dominio = https://api-deployments-oxpor.ondigitalocean.app/

![image](https://user-images.githubusercontent.com/81053948/194198024-eb13e4ed-5c10-4702-89b9-5cca319f5f21.png)

Servidor interno

![image](https://user-images.githubusercontent.com/81053948/194198929-03eb390e-d412-4655-8294-dc3d2db01d47.png)

Cifrado de acceso a IP del kluster

![image](https://user-images.githubusercontent.com/81053948/194198520-d28ef757-7693-463e-95d0-e960615fa181.png)

Acesso a la API-REST

    Dominio = https://api-deployments-oxpor.ondigitalocean.app/

![image](https://user-images.githubusercontent.com/81053948/194198811-4f3d4bf5-2ead-4ff6-88eb-d1414e7ecee7.png)

Mostrar datos API-REST

    Direccion = https://api-deployments-oxpor.ondigitalocean.app/api/employees

![image](https://user-images.githubusercontent.com/81053948/194198623-8f347692-dd8c-4078-a429-fba595c3a88f.png)


Jordy Vega ??
