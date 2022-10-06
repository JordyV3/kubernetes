# SPACES en DigitalOcean

## Arquitecutra
Spaces es un servicio de almacenamiento de objetos compatible con S3 que le permite almacenar y servir grandes cantidades de datos. Cada espacio es un cubo para que almacene y entregue archivos. El CDN de Spaces integrado y gratuito minimiza los tiempos de carga de la página, mejora el rendimiento y reduce los costos de ancho de banda e infraestructura.

![arquitectura copia](https://user-images.githubusercontent.com/81053948/194194958-e55385c9-39fa-437d-aa7c-24800b7109e8.png)
#

## Configuracion

Registrar kluster basado en KS8 con la condifiguracion de SPACES.

![image](https://user-images.githubusercontent.com/81053948/194164898-2beb1c41-8eb1-417c-9fb5-a095276706bc.png)


En la configuracion del space se mostrara la siguiente informacion.

     BUCKET_NAME = space-jordyvega

     ENDPOINT = nyc3.digitaloceanspaces.com

Configuracion de acceso atravez de API KS8 de DigitalOcean y AWS.

![image](https://user-images.githubusercontent.com/81053948/194165242-d1223921-0898-4ac7-90db-19222a914ce3.png)


Se mostrara la informacion de nuestra llave publica y privada para el acceso de nuestro kluster de kubernetes.

     AWS_ACCESS_KEY = DO00XZQ3RG3W3U6UGM39
    
     AWS_SECRET_ACCESS_KEY = HatXEiPC6dcbm2SJE7TgkeZ08WD1wYpSISLuUs7TYhc

Estas llaves de acceso se deben de utilizar como variables de entorno en una aplicacion o servicio para consumir con cualquier tipo de APLICACION.

El servicio luego de ser configurado se podra mostrar como un servicio SOAP con archivos XML en la siguiente direccion
[sapce-jordyvega](https://space-jordyvega.nyc3.digitaloceanspaces.com) para ver el servicio.

![image](https://user-images.githubusercontent.com/81053948/194166824-54ef7506-8f0c-458b-b5db-502430b7d2b9.png)

#
## Contruccion de la API

La arquitectura de la API se realizo con la siguiente arquitectura API-REST con las siguientes tecnologías.

    - Node
    - MongoDB
    - Express

Directorio del servicio API-REST 

![image](https://user-images.githubusercontent.com/81053948/194167309-c3933d3d-918c-4459-8fe1-eed4921ad09f.png)


Welcon API-REST

El API se desplego en el kluster de KS8 en la siguiente IP

    http://143.198.191.64/app/api

![image](https://user-images.githubusercontent.com/81053948/194169142-3bfbc9f9-3550-4c31-b812-372944221727.png)


Datos registrados

La data registrada en los espacios y la base de datos se mostrara en la siguiente direccion 

    http://143.198.191.64/app/api/images

![image](https://user-images.githubusercontent.com/81053948/194168987-03167c78-4ec6-4e6e-93fc-fd84bd84c943.png)

De igual manera se realizaran la carga de archivos en la siguiente direccion 

    http://143.198.191.64/app/api/images/upload

![image](https://user-images.githubusercontent.com/81053948/194170022-200365d0-bf42-4eaf-aaef-7fd6a49cf202.png)

#
## Contruccion de la APLICACION

Se realizo la aplicacion en las siguientes tecnologias 

    - Reactjs
    - Css
    - Nextjs

Directorio de la APLICACION

![image](https://user-images.githubusercontent.com/81053948/194171079-cf442a2e-37e2-42a8-bd8e-18a0825782b5.png)

Base de Datos

![image](https://user-images.githubusercontent.com/81053948/194197478-950b42a1-0a88-45fd-a8fd-74568a53c8f4.png)


En la siguiente direccion se mostrara la aplicacion 

    http://143.198.191.64

![image](https://user-images.githubusercontent.com/81053948/194170906-4c47aa60-1f4c-4bc9-b88c-f9bf3e33c632.png)

Para realizar una carga de una imagen se realizara en la siguiente direccion

    http://143.198.191.64/upload

![image](https://user-images.githubusercontent.com/81053948/194171199-850d038c-c7f8-4ca6-81f7-d1660d336f74.png)

Jordy Vega 2022 ??