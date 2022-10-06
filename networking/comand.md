# NETWORKIN Kubernetes
Para el primer kluster se realizara la implementacion de un kluster de kubernetes en DigitalOcean en esta primera ejecución se realizara las siguientes acciones en kubernetes.

- `namespaces`
- `wordpress`
- `services`
# kluster de Kubernetes en DigitalOcean
![image](https://user-images.githubusercontent.com/81053948/193293748-ee41c47c-d4d5-425e-bbb0-6b57436e4a91.png)


# Comandos 
## Ejecutar Namespaces

Contenido de archivo 00-namespaces.yaml 

![image](https://user-images.githubusercontent.com/81053948/193301992-d217aed1-4c73-46e7-b01b-d87acb760855.png)


Ejecutamos el siguiente comando para ejecutar nuestro namespaces testing en nuestro kluster desde el archivo 00-namespaces.yaml

    - kubectl apply -f 00-namespaces.yaml

Ver los nodos corriendo 

    - kubectl get ns

Se nos mostrara de la siguiente manera 

![image](https://user-images.githubusercontent.com/81053948/193293509-68d911c2-6dc6-4fb1-b9c1-8d6056a2992c.png)

## Ejecutar servicios

Contenido del archivo 01-wordpress-services.yaml

![image](https://user-images.githubusercontent.com/81053948/193301417-ea93789b-a880-4911-a77c-c17748dbb4c4.png)

Ejecutamos el siguiente comando para ejecutar nuestro namespaces testing en nuestro kluster desde el archivo 01-wordpress-services.yaml

    - kubectl -n testing apply -f 01-wordpress-service.yaml

Ver los nodos corriendo de la

    - kubectl -n testing get svc

Se mostrara de la siguiente manera

![image](https://user-images.githubusercontent.com/81053948/193319325-f4420fc4-d776-41f9-ba23-4ec70ef01103.png)

Vista desde el cliente de digitalOcean

![image](https://user-images.githubusercontent.com/81053948/193321218-04990591-adc3-4fef-a2bb-89e66d932793.png)

## Ejecutar el ReplicationController 

Contenido del archivo 02-wordpress-rc.yaml

![image](https://user-images.githubusercontent.com/81053948/193319875-51901163-2fa1-4bd8-bc6e-9a7394ad0c30.png)

Ejecutamos el siguiente comando para ejecutar nuestro namespaces testing en nuestro kluster desde el archivo 02-wordpress-rc.yaml

    - kubectl -n testing apply -f 02-wordpress-rc.yml

Ver los pods de ReplicationController

![image](https://user-images.githubusercontent.com/81053948/193320274-2c31041b-c857-46ac-887a-2e26eb029041.png)

## Probar el ReplicationController

Para probar el ReplicationController debemos borrar el pod que es corriendo en el nodo de la siguiente manera. 

    - kubectl -n testing delete pod "nombre del pod"

![image](https://user-images.githubusercontent.com/81053948/193320725-ce654ef2-b3d2-4686-9ede-48902e732f69.png)

Luego se debe de verificar que el replicationController funcionde correctamente

![image](https://user-images.githubusercontent.com/81053948/193320867-ef299a29-f68b-4fb6-9fcd-b36f0cd370c1.png)

Se puede observar que kubernetes creo automaticamente una replica exacta del pod automaticamente esto nos da una fiabilidad de un servicio con alta disponibilidad.

## Revisar el servicio creado

Para revisar el servicio que se creo necesitamos la dirección IP publica del nodo configurado en kubernetes ejecutando el siguiente comando.

    - kubectl get nodes -o wide

Esto nos mostrara toda la informacion del nodo que esta corriendo en nuestro kluster de kubernetes.

![image](https://user-images.githubusercontent.com/81053948/193321745-ed5747f7-e612-4fcb-a41d-53eaac94b32c.png)

Luego de obtener la dirección IP publica. 

    - EXTERNAL-IP: 159.223.144.145

En un navegador colocamos la dirección IP mas el puerto que se expuso para el servicio creado 

    - 159.223.144.145:30000


El servicio se mostrara de esta manera. 

![image](https://user-images.githubusercontent.com/81053948/193322250-a30e9e59-a0db-40f3-b4d2-68d7a1d8e39c.png)

## Eliminar el servicio NodePort

Para eliminar servicio en los nodos debemos ejecutar el siguiente comando 

    - kubectl -n testing delete service "Nombre del servicio"

![image](https://user-images.githubusercontent.com/81053948/193326092-b14c5238-82b5-437c-962c-648ff51ea505.png)


## Configuracion de LoadBalancer

En Kubernetes y en Digital Ocean nos permite crear LoadBalancer siendo potente característica que nos permtirán balancear la carga de trabajo entre diferentes droplets, ayudándonos de esta forma, a escalar nuestra aplicación de manera horizontal.

Contenido del archivo 03-wordpress-service-lb.yaml

![image](https://user-images.githubusercontent.com/81053948/193324623-582e6750-30eb-40c8-bb07-58da7bba8467.png)

Ejecutamos el siguiente comando para ejecutar en nuestro namespaces testing en nuestro servicio de LoadBalancer

    - kubectl -n testing apply -f 03-wordpress-service-lb.yml

Revisamos los servicios que tenemos en ejecución

    - kubectl -n testing get svc

![image](https://user-images.githubusercontent.com/81053948/193326677-8117074b-a04e-4d2f-abc6-50e11bec52a5.png)

Cliente de DigitalOcean

![image](https://user-images.githubusercontent.com/81053948/193326952-c7356ffe-7226-4e27-a0a7-d308cb167033.png)

![image](https://user-images.githubusercontent.com/81053948/193327060-06471084-6467-4033-8714-22d1dafa1709.png)

Verificamos la Ip de nuestro LoadBalancer

    - kubectl -n testing get svc

![image](https://user-images.githubusercontent.com/81053948/193327246-973148ec-fb86-4bf0-aa82-11e6d8df40ae.png)

Extramos nuestra IP publica de nuestro balanceador de carga 

    - EXTERNAL-IP: 104.248.109.85

En un navegador colocamos la dirección IP mas el puerto que se expuso para el servicio creado
    
    - 104.248.109.85

El servicio se mostrara de esta manera
![image](https://user-images.githubusercontent.com/81053948/193327626-aec40f21-b6da-4c9d-9750-adf7ba593bfa.png)


