# Deploy Kubernetes

Introduccion

Kubernetes es un sistema de orquestación de contenedores que administra contenedores a escala. Fue inicialmente desarrollado por Google en base a su experiencia en ejecución de contenedores en producción, es de código abierto y una comunidad mundial impulsa su desarrollo de manera activa.

![image](https://user-images.githubusercontent.com/81053948/194199683-23552b24-cc3a-4f94-943f-dcd9a8adca28.png)

## Objetivos

Su clúster incluirá los siguientes recursos físicos:

- Un nodo maestro

    El nodo maestro (un nodo de Kubernetes hace referencia a un servidor) se encarga de administrar el estado del clúster. Ejecuta Etcd, que almacena datos de clústeres entre componentes que organizan cargas de trabajo en nodos de trabajo.

- Dos nodos de trabajo

    Los nodos de trabajo son los servidores en los que se ejecutarán sus cargas de trabajo (es decir, aplicaciones y servicios en contenedores). Un trabajador seguirá ejecutando su volumen de trabajo una vez que se le asigne, incluso si el maestro se desactiva cuando la programación se complete. La capacidad de un clúster puede aumentarse añadiendo trabajadores.

Tras completar esta guía, tendrá un clúster listo para ejecutar aplicaciones en contenedores siempre que los servidores del clúster cuenten con suficientes recursos de CPU y RAM para sus aplicaciones. Casi cualquier aplicación tradicional de Unix que incluya aplicaciones web, bases de datos, demonios y herramientas de línea de comandos pueden estar en contenedores y hechas para ejecutarse en el clúster. El propio clúster consumirá entre 300 y 500 MB de memoria, y un 10 % de CPU en cada nodo.

Una vez que se configure el clúster, implementará el servidor web de Nginx para que garantice que se ejecuten correctamente las cargas de trabajo.

# Paso 1: Configurar el directorio de espacio de trabajo y el archivo de inventario de Ansible

En esta sección, creará un directorio en su máquina local que funcionará como su espacio de trabajo. También configurará Ansible a nivel local para que pueda comunicarse con sus servidores remotos y ejecutar comandos en ellos. Para hacer esto, creará un archivo hosts que contenga información de inventario, como las direcciones IP de sus servidores y los grupos a los que pertenece cada servidor.

De sus tres servidores, uno será el maestro con un IP que se mostrará como master_ip. Los otros dos servidores serán trabajadores y tendrán los IP worker_1_ip y worker_2_ip.

Cree un directorio llamado ~/kube-cluster en el directorio de inicio de su máquina local y use cd para posicionarse en él:

    mkdir ~/kube-cluster
    cd ~/kube-cluster

Este directorio será su espacio de trabajo para el resto del tutorial y contendrá todos sus playbooks de Ansible. También será el directorio dentro del que ejecutará todos los comandos locales.

Cree un archivo llamado ~/kube-cluster/hosts usando nano o su editor de texto favorito:

    nano ~/kube-cluster/hosts

Añada el siguiente texto al archivo, que aportará información específica sobre la estructura lógica de su clúster:

    [masters]
    master ansible_host=master_ip ansible_user=root

    [workers]
    worker1 ansible_host=worker_1_ip ansible_user=root
    worker2 ansible_host=worker_2_ip ansible_user=root

    [all:vars]
    ansible_python_interpreter=/usr/bin/python3

Posiblemente recuerde que los archivos de inventario de Ansible se utilizan para especificar datos del servidor, como direcciones IP, usuarios remotos y las agrupaciones de servidores que se abordarán como una sola unidad para ejecutar comandos. ~/kube-cluster/hosts será su archivo de inventario y usted agregó a este dos grupos de Ansible (maestros y trabajadores) para especificar la estructura lógica de su clúster.

En el grupo de maestros, existe una entrada de servidor llamada ?master? que enumera el IP del nodo maestro (master_ip) y especifica que Ansible debería ejecutar comandos remotos como usuario root.

De modo similar, en el grupo de** trabajadores**, existen dos entradas para los servidores de trabajo worker_1_ip y worker_2_ip que también especifican el ansible_user como root.

La última línea del archivo indica a Ansible que utilice los intérpretes de Python 3 de servidores remotos para sus operaciones de administración.

Guarde y cierre el archivo después de agregar el texto.

Después de configurar el inventario del servidor con grupos, instalaremos dependencias a nivel del sistema operativo y crearemos ajustes de configuración.

# Paso 2: Crear un usuario no root en todos los servidores remotos

En esta sección, creará un usuario no root con privilegios sudo en todos los servidores para poder acceder a SSH manualmente como usuario sin privilegios. Esto puede ser útil si, por ejemplo, desea ver la información del sistema con comandos como top/htop, ver una lista de contenedores en ejecución o cambiar archivos de configuración pertenecientes a root. Estas operaciones se realizan de forma rutinaria durante el mantenimiento de un clúster y el empleo de un usuario no root para esas tareas minimiza el riesgo de modificar o eliminar archivos importantes, o de realizar de forma no intencionada otras operaciones peligrosas.

Cree un archivo llamado ~/kube-cluster/initial.yml en el espacio de trabajo:

    nano ~/kube-cluster/initial.yml

A continuación, añada el siguiente play al archivo para crear un usuario no root con privilegios sudo en todos los servidores. Un play en Ansible es una colección de pasos que se deben realizar y se orientan a servidores y grupos específicos. El siguiente play creará un usuario sudo no root:

    - hosts: all
    become: yes
    tasks:
        - name: create the 'ubuntu' user
        user: name=ubuntu append=yes state=present createhome=yes shell=/bin/bash

        - name: allow 'ubuntu' to have passwordless sudo
        lineinfile:
            dest: /etc/sudoers
            line: 'ubuntu ALL=(ALL) NOPASSWD: ALL'
            validate: 'visudo -cf %s'

        - name: set up authorized keys for the ubuntu user
        authorized_key: user=ubuntu key="{{item}}"
        with_file:
            - ~/.ssh/id_rsa.pub

A continuación, se ofrece un desglose de las funciones de este playbook:

- Crea el usuario no root ubuntu.

- Configura el archivo sudoers para permitir que el usuario ubuntu ejecute comandos sudo sin una solicitud de contraseña.

- Añade la clave pública de su máquina local (por lo general, ~/.ssh/id_rsa.pub) a la lista de claves autorizadas del usuario ubuntu remoto. Esto le permitirá usar SSH en cada servidor como usuario ubuntu.

Guarde y cierre el archivo después de agregar el texto.

A continuación, active el playbook ejecutando lo siguiente a nivel local:

    ansible-playbook -i hosts ~/kube-cluster/initial.yml

El comando se aplicará por completo en un plazo de dos a cinco minutos. Al finalizar, verá resultados similares al siguiente:

![image](https://user-images.githubusercontent.com/81053948/194200331-279f6b84-6529-4798-83f2-958b40a27a8d.png)

# Paso 3: Configurar el nodo maestro

Un pod es una unidad atómica que ejecuta uno o más contenedores. Estos contenedores comparten recursos como volúmenes de archivos e interfaces de red en común. Los pods son la unidad básica de programación de Kubernetes: se garantiza que todos los contenedores de un pod se ejecuten en el mismo nodo en el que esté programado el pod.

Cada pod tiene su propia dirección IP y un pod de un nodo debería poder acceder a un pod de otro usando el IP del pod. Los contenedores de un nodo único pueden comunicarse fácilmente a través de una interfaz local. Sin embargo, la comunicación entre los pods es más complicada y requiere un componente de red independiente que pueda dirigir de forma transparente el tráfico de un pod de un nodo a un pod de otro.

Los complementos de red de pods ofrecen esta funcionalidad. Para este clúster usará Flannel, una opción estable y apta.

Cree un playbook de Ansible llamado master.yml en su máquina local:

    nano ~/kube-cluster/master.yml

Añada el siguiente play al archivo para iniciar el clúster e instalar Flannel:

    - hosts: master
    become: yes
     tasks:
    - name: initialize the cluster
      shell: kubeadm init --pod-network-cidr=10.244.0.0/16 >> cluster_initialized.txt
      args:
        chdir: $HOME
        creates: cluster_initialized.txt

    - name: create .kube directory
      become: yes
      become_user: ubuntu
      file:
        path: $HOME/.kube
        state: directory
        mode: 0755

    - name: copy admin.conf to user's kube config
      copy:
        src: /etc/kubernetes/admin.conf
        dest: /home/ubuntu/.kube/config
        remote_src: yes
        owner: ubuntu

    - name: install Pod network
      become: yes
      become_user: ubuntu
      shell: kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/a70459be0084506e4ec919aa1c114638878db11b/Documentation/kube-flannel.yml >> pod_network_setup.txt
      args:
        chdir: $HOME
        creates: pod_network_setup.txt

Implemente el playbook a nivel local ejecutando lo siguiente:

    ansible-playbook -i hosts ~/kube-cluster/master.yml

![image](https://user-images.githubusercontent.com/81053948/194200599-66bcb1e4-e317-4d68-97b3-32844f9ee731.png)

Para comprobar el estado del nodo maestro, aplique SSH en él con el siguiente comando:

    ssh ubuntu@master_ip

Una vez que ingrese en el nodo maestro, ejecute lo siguiente:

    kubectl get nodes

Ahora verá lo siguiente:

 ![image](https://user-images.githubusercontent.com/81053948/194200744-ac9547a0-56b8-4bde-955f-baefdf21802a.png)

El resultado indica que el nodo master completó todas las tareas de inicialización y se encuentra en el estado Ready, a partir de lo cual puede comenzar a aceptar nodos de trabajo y ejecutar tareas enviadas al servidor de la API. Ahora, podrá añadir los trabajadores desde su máquina local.

# Paso 4: Configurar los nodos del trabajador

La incorporación de trabajadores al clúster implica ejecutar un único comando en cada uno. Este comando incluye la información de clúster necesaria, como la dirección IP y el puerto del servidor de la API del maestro y un token seguro. Solo podrán incorporarse al clúster los nodos que puedan pasar el token seguro.

Regrese a su espacio de trabajo y cree un libro de reproducción llamado workers.yml:

    nano ~/kube-cluster/workers.yml

Añada el siguiente texto al archivo para agregar los trabajadores al clúster:

    - hosts: master
  become: yes
  gather_facts: false
  tasks:
    - name: get join command
      shell: kubeadm token create --print-join-command
      register: join_command_raw

    - name: set join command
      set_fact:
        join_command: "{{ join_command_raw.stdout_lines[0] }}"


    - hosts: workers
    become: yes
    tasks:
        - name: join cluster
        shell: "{{ hostvars['master'].join_command }} >> node_joined.txt"
        args:
            chdir: $HOME
            creates: node_joined.txt

Esto es lo que hace el libro de jugadas:

- El primer play obtiene el comando de incorporación que debe ejecutarse en los nodos de trabajo. Este comando se muestra en el siguiente formato: kubeadm join token. Una vez que obtenga el comando real con el token y los valores de hash adecuados, la tarea lo fija como un hecho para que el siguiente play pueda acceder a esta información.

- El segundo play tiene una sola tarea que ejecuta el comando de incorporación en todos los nodos de trabajadores. Una vez que se complete esta tarea, los dos nodos de trabajo formarán parte del clúster.

Guarde y cierre el archivo cuando termine.

Implemente el playbook producido lo siguiente a nivel local:

    ansible-playbook -i hosts ~/kube-cluster/workers.yml

![image](https://user-images.githubusercontent.com/81053948/194201060-cecc32c2-97b7-43c7-848d-30ac74d1a5fe.png)

# Paso 5: Verificar el cluster

Un clúster puede fallar durante la configuración debido a la indisponibilidad de un nodo oa que la conexión de red entre el maestro y el trabajador no funciona correctamente. Comprobaremos el clúster y nos aseguraremos de que los nodos funcionen correctamente.

pudo comprobar el estado actual del clúster desde el nodo maestro para asegurarse de que los nodos están listos. Si interrumpió la conexión con el nodo maestro, puede aplicar SSH en él de nuevo con el siguiente comando:

    ssh ubuntu@master_ip

Luego, ejecute el siguiente comando para obtener el estado del clúster:

    kubectl get nodes

![image](https://user-images.githubusercontent.com/81053948/194201169-7cb86bad-59e5-46c7-bee2-fa39c2ad0a27.png)

# Paso 6: dministracion de Kubernetes

Kubernetes DigitalOcean
![image](https://user-images.githubusercontent.com/81053948/194201846-759330ac-139b-4634-a923-21d2a46fbbf5.png)

Pods

![image](https://user-images.githubusercontent.com/81053948/194201768-bc3a69ef-435c-4291-b87e-575c2d8a5ee8.png)

Pods Arquitecture

![image](https://user-images.githubusercontent.com/81053948/194199266-4cee86ab-8bb8-4ef6-9c89-84e252a84b5b.png)

Daemon set corriendo 

![image](https://user-images.githubusercontent.com/81053948/194201318-6609d73e-e7a4-4f82-b827-4a035e046b5a.png)

Deploymens creados

![image](https://user-images.githubusercontent.com/81053948/194201390-2d6fba0b-a7dd-4534-9a0b-d0cdf7eee1f1.png)

Pods

![image](https://user-images.githubusercontent.com/81053948/194201443-0b7f5356-5cfd-40c5-b291-a56118fd301e.png)

Replicaset

![image](https://user-images.githubusercontent.com/81053948/194201500-9f585e69-e97b-4ae6-b6d1-b66429436e46.png)

Controllers 
![image](https://user-images.githubusercontent.com/81053948/194201554-d44a1526-b49a-46da-98e1-1a4c27196917.png)

Servicios
![image](https://user-images.githubusercontent.com/81053948/194201597-426808d6-532a-4694-95fe-f74f1b48a224.png)



Jordy Vega ??
