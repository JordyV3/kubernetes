# Proyecto Final Telecommunicaciones UMG 2022

`Jordy Alexander Vega Aldana 1190-18-9769`

Implementacion de red en Kubernetes en DigitalOcean basada en el modelo KS8

Tecnologias utilizadas

    Docker
    Kubernetes
    Node.js
    MySQL
    MongoDB
    Reactjs
    Jenkins
    API-REST



# Kubernetes: Versatilidad y rendimiento

Kubernetes simplifica y optimiza la gestión de los microservicios. Desarrollar una aplicación en Kubernetes nos garantiza una visión transparente del clúster, además de mayor flexibilidad y escalabilidad según las necesidades futuras.

![image](https://user-images.githubusercontent.com/81053948/194450094-48a3039d-065b-4f19-98d4-225d25fc3d65.png)

## DigitalOcean

DigitalOcean es un proveedor estadounidense de servidores virtuales privados, con sede principal en la ciudad de Nueva York.? La compañía alquila instalaciones de centros de cómputo existentes, incluyendo sitios como Nueva York, Toronto, Bangalore, Ámsterdam, San Francisco, Londres y Singapur.? 

![image](https://user-images.githubusercontent.com/81053948/194450336-45a329be-b09d-473d-9a07-3ab2d959bc82.png)

# Porque Kubernetes?

## Las maravillas de una arquitectura de red basada en Kubernetes.

![image](https://user-images.githubusercontent.com/81053948/194444777-8338abcb-be76-4d75-94e2-277addaf9dad.png)


## Diferencias entre kubernetes

![Kubernetes no optimizados](https://user-images.githubusercontent.com/81053948/194446353-6b3f9cab-0ddc-4b7d-ac56-40bddddf7d85.png)


# Analisis 

Kubernetes es un sistema de orquestación de contenedores que puede gestionar aplicaciones en contenedores a través de un clúster de nodos de servidor. Para el mantenimiento de la conectividad de red entre todos los contenedores de un clúster se requieren técnicas avanzadas de red. En este artículo, abordaremos probablemente algunas herramientas y técnicas para inspeccionar esta configuración de red.
Estas herramientas pueden ser útiles si depura errores de conectividad, investiga problemas de rendimiento de la red o explora Kubernetes para aprender cómo funciona.
Si desea conocer más sobre Kubernetes en general, en nuestra guía Introducción a Kubernetes se abarcan los aspectos básicos. Para acceder a una descripción general específica de Kubernetes, lea un Análisis exhaustivo de las redes de Kubernetes .

## Diagrama de flujo para la implementacion de Kubernetes 

![Implementacion de Kubernetes Jordy Vega](https://user-images.githubusercontent.com/81053948/194449435-281b5a64-8ef5-4f4d-980b-c182c968bd07.png)

# Diseño de RED
![Kubernetes Telecomunicaciones](https://user-images.githubusercontent.com/81053948/195222049-6025f462-07d7-4c11-b4fd-5ba8653a93b3.png)

# Desarrollo 

Se desarrollaron 3 Aplicaciones las cuales se desplegaron como servicios en Kubernetes. Utilizando las siguientes tecnologias.

    Node
    React
    Express
    MySQL
    MongoDB

Estas aplicaciones son las siguientes 

    SNAPPY APP
    API
    API-REST

## SNAPPY APP

En la siguiente direccion se mostrara la aplicacion 

    http://143.198.191.64

![image](https://user-images.githubusercontent.com/81053948/194170906-4c47aa60-1f4c-4bc9-b88c-f9bf3e33c632.png)

Para realizar una carga de una imagen se realizara en la siguiente direccion

    http://143.198.191.64/upload

![image](https://user-images.githubusercontent.com/81053948/194171199-850d038c-c7f8-4ca6-81f7-d1660d336f74.png)

## API

En la siguiente direccion se mostrara la API

    Dominio = https://api-deployments-oxpor.ondigitalocean.app/

![image](https://user-images.githubusercontent.com/81053948/194198811-4f3d4bf5-2ead-4ff6-88eb-d1414e7ecee7.png)

Mostrar datos API-REST

    Direccion = https://api-deployments-oxpor.ondigitalocean.app/api/employees

![image](https://user-images.githubusercontent.com/81053948/194198623-8f347692-dd8c-4078-a429-fba595c3a88f.png)

## API-REST
Acesso a la API-REST

    Dominio = https://api-deployments-oxpor.ondigitalocean.app/

![image](https://user-images.githubusercontent.com/81053948/194198811-4f3d4bf5-2ead-4ff6-88eb-d1414e7ecee7.png)

Mostrar datos API-REST

    Direccion = https://api-deployments-oxpor.ondigitalocean.app/api/employees

![image](https://user-images.githubusercontent.com/81053948/194198623-8f347692-dd8c-4078-a429-fba595c3a88f.png)

# Implementacion

Se desplego la red e Kubernetes en el servicio de DigitalOcean tomando la infraestrutura de la nube y tomando la arquitectura basada en Kubernetes para la realizacion de la red.

![image](https://user-images.githubusercontent.com/81053948/195223150-679379ee-2581-4fb8-b821-1f69ca466d60.png)

Aplicaciones desplegadas

![image](https://user-images.githubusercontent.com/81053948/195223209-e885c816-6c07-4a81-a8ac-133b86abf442.png)

Droplets creados

![image](https://user-images.githubusercontent.com/81053948/195223270-b827da1e-83bc-44a5-a722-86360ee7623b.png)

![image](https://user-images.githubusercontent.com/81053948/195223947-a21c36f0-7eba-4cba-b487-e4bdb2e9daa7.png)

![image](https://user-images.githubusercontent.com/81053948/195223990-5cd4827d-7a88-4c0b-8703-2261257f9283.png)

Bases de datos administradas

![image](https://user-images.githubusercontent.com/81053948/195223305-d7bebc8a-c095-43c6-82f6-4a6efddab156.png)

Spaces administrados (Base de datos documental)

![image](https://user-images.githubusercontent.com/81053948/195223328-4b080569-3a1c-47ba-a44e-af01f151b453.png)


Dominios

![image](https://user-images.githubusercontent.com/81053948/195223406-f8ed72a1-03f5-4b7d-849d-cdf0b9cebf90.png)

Kluster de Kubernetes

![image](https://user-images.githubusercontent.com/81053948/195223434-2549287d-ab62-49f6-a707-b114a456e96e.png)

Poolds 
![image](https://user-images.githubusercontent.com/81053948/195223485-810953e9-09c2-4aba-aaf7-98c82ed13d7f.png)

![image](https://user-images.githubusercontent.com/81053948/195223589-12887f38-9760-42cb-8834-29fbde67dd6c.png)


# Pruebas 

Para las pruebas se realizaron unos tes para comprobar la alta disponibilidad y la carga que soporta la red cuando se le inyecta trafico para estas pruebas se utilizaron las siguientes herramientas.

    Jmeter
    BlazerMater
    JXL

Jmeter

Se realizara la prueba de estres a un servidor con 10mil peticiones en un lapso de 10 segundos para comprobar la disponibilidad de los servicios desplegados en Kubernetes.

![image](https://user-images.githubusercontent.com/81053948/195223881-3b28f140-74c3-4f92-8d7f-757d66976b8f.png)

Se realizo la prueba de estres a la direccion IP del balanceador de Carga

![image](https://user-images.githubusercontent.com/81053948/195224042-4c698bbb-8590-465f-8a84-f509981fb425.png)

Ejecucion de la prueba 
![image](https://user-images.githubusercontent.com/81053948/195224340-e5f221ba-6d1e-4e6c-b3fa-f700673b1b20.png)

Al realizar la prueba de stres se puedo comprobar el Uso de CPU GPU y memoria del Kluster donde esta corriendo los servicios de Kubernetes.

![image](https://user-images.githubusercontent.com/81053948/195224269-493c7909-9d4f-41e7-8a5e-c9bc2609d7b9.png)

![image](https://user-images.githubusercontent.com/81053948/195224459-7c6a078e-a4b1-489d-a644-bee1e9ca8f3a.png)

![image](https://user-images.githubusercontent.com/81053948/195224496-fe0a0e0b-659a-4779-b342-2e78e53bc128.png)

Jordy Vega
