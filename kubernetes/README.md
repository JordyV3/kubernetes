# Deploy Kubernetes

Introduccion

Kubernetes es un sistema de orquestaci�n de contenedores que administra contenedores a escala. Fue inicialmente desarrollado por Google en base a su experiencia en ejecuci�n de contenedores en producci�n, es de c�digo abierto y una comunidad mundial impulsa su desarrollo de manera activa.

![image](https://user-images.githubusercontent.com/81053948/194199683-23552b24-cc3a-4f94-943f-dcd9a8adca28.png)

## Objetivos

Su cl�ster incluir� los siguientes recursos f�sicos:

- Un nodo maestro

    El nodo maestro (un nodo de Kubernetes hace referencia a un servidor) se encarga de administrar el estado del cl�ster. Ejecuta Etcd, que almacena datos de cl�steres entre componentes que organizan cargas de trabajo en nodos de trabajo.

- Dos nodos de trabajo

    Los nodos de trabajo son los servidores en los que se ejecutar�n sus cargas de trabajo (es decir, aplicaciones y servicios en contenedores). Un trabajador seguir� ejecutando su volumen de trabajo una vez que se le asigne, incluso si el maestro se desactiva cuando la programaci�n se complete. La capacidad de un cl�ster puede aumentarse a�adiendo trabajadores.

Tras completar esta gu�a, tendr� un cl�ster listo para ejecutar aplicaciones en contenedores siempre que los servidores del cl�ster cuenten con suficientes recursos de CPU y RAM para sus aplicaciones. Casi cualquier aplicaci�n tradicional de Unix que incluya aplicaciones web, bases de datos, demonios y herramientas de l�nea de comandos pueden estar en contenedores y hechas para ejecutarse en el cl�ster. El propio cl�ster consumir� entre 300 y 500 MB de memoria, y un 10 % de CPU en cada nodo.

Una vez que se configure el cl�ster, implementar� el servidor web de Nginx para que garantice que se ejecuten correctamente las cargas de trabajo.

# Paso 1: Configurar el directorio de espacio de trabajo y el archivo de inventario de Ansible

En esta secci�n, crear� un directorio en su m�quina local que funcionar� como su espacio de trabajo. Tambi�n configurar� Ansible a nivel local para que pueda comunicarse con sus servidores remotos y ejecutar comandos en ellos. Para hacer esto, crear� un archivo hosts que contenga informaci�n de inventario, como las direcciones IP de sus servidores y los grupos a los que pertenece cada servidor.

De sus tres servidores, uno ser� el maestro con un IP que se mostrar� como master_ip. Los otros dos servidores ser�n trabajadores y tendr�n los IP worker_1_ip y worker_2_ip.

Cree un directorio llamado ~/kube-cluster en el directorio de inicio de su m�quina local y use cd para posicionarse en �l:

    mkdir ~/kube-cluster
    cd ~/kube-cluster

Este directorio ser� su espacio de trabajo para el resto del tutorial y contendr� todos sus playbooks de Ansible. Tambi�n ser� el directorio dentro del que ejecutar� todos los comandos locales.

Cree un archivo llamado ~/kube-cluster/hosts usando nano o su editor de texto favorito:

    nano ~/kube-cluster/hosts

A�ada el siguiente texto al archivo, que aportar� informaci�n espec�fica sobre la estructura l�gica de su cl�ster:

    [masters]
    master ansible_host=master_ip ansible_user=root

    [workers]
    worker1 ansible_host=worker_1_ip ansible_user=root
    worker2 ansible_host=worker_2_ip ansible_user=root

    [all:vars]
    ansible_python_interpreter=/usr/bin/python3

Posiblemente recuerde que los archivos de inventario de Ansible se utilizan para especificar datos del servidor, como direcciones IP, usuarios remotos y las agrupaciones de servidores que se abordar�n como una sola unidad para ejecutar comandos. ~/kube-cluster/hosts ser� su archivo de inventario y usted agreg� a este dos grupos de Ansible (maestros y trabajadores) para especificar la estructura l�gica de su cl�ster.

En el grupo de maestros, existe una entrada de servidor llamada ?master? que enumera el IP del nodo maestro (master_ip) y especifica que Ansible deber�a ejecutar comandos remotos como usuario root.

De modo similar, en el grupo de** trabajadores**, existen dos entradas para los servidores de trabajo worker_1_ip y worker_2_ip que tambi�n especifican el ansible_user como root.

La �ltima l�nea del archivo indica a Ansible que utilice los int�rpretes de Python 3 de servidores remotos para sus operaciones de administraci�n.

Guarde y cierre el archivo despu�s de agregar el texto.

Despu�s de configurar el inventario del servidor con grupos, instalaremos dependencias a nivel del sistema operativo y crearemos ajustes de configuraci�n.

# Paso 2: Crear un usuario no root en todos los servidores remotos

En esta secci�n, crear� un usuario no root con privilegios sudo en todos los servidores para poder acceder a SSH manualmente como usuario sin privilegios. Esto puede ser �til si, por ejemplo, desea ver la informaci�n del sistema con comandos como top/htop, ver una lista de contenedores en ejecuci�n o cambiar archivos de configuraci�n pertenecientes a root. Estas operaciones se realizan de forma rutinaria durante el mantenimiento de un cl�ster y el empleo de un usuario no root para esas tareas minimiza el riesgo de modificar o eliminar archivos importantes, o de realizar de forma no intencionada otras operaciones peligrosas.

Cree un archivo llamado ~/kube-cluster/initial.yml en el espacio de trabajo:

    nano ~/kube-cluster/initial.yml

A continuaci�n, a�ada el siguiente play al archivo para crear un usuario no root con privilegios sudo en todos los servidores. Un play en Ansible es una colecci�n de pasos que se deben realizar y se orientan a servidores y grupos espec�ficos. El siguiente play crear� un usuario sudo no root:

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

A continuaci�n, se ofrece un desglose de las funciones de este playbook:

- Crea el usuario no root ubuntu.

- Configura el archivo sudoers para permitir que el usuario ubuntu ejecute comandos sudo sin una solicitud de contrase�a.

- A�ade la clave p�blica de su m�quina local (por lo general, ~/.ssh/id_rsa.pub) a la lista de claves autorizadas del usuario ubuntu remoto. Esto le permitir� usar SSH en cada servidor como usuario ubuntu.

Guarde y cierre el archivo despu�s de agregar el texto.

A continuaci�n, active el playbook ejecutando lo siguiente a nivel local:

    ansible-playbook -i hosts ~/kube-cluster/initial.yml

El comando se aplicar� por completo en un plazo de dos a cinco minutos. Al finalizar, ver� resultados similares al siguiente:

![image](https://user-images.githubusercontent.com/81053948/194200331-279f6b84-6529-4798-83f2-958b40a27a8d.png)

# Paso 3: Configurar el nodo maestro

Un pod es una unidad at�mica que ejecuta uno o m�s contenedores. Estos contenedores comparten recursos como vol�menes de archivos e interfaces de red en com�n. Los pods son la unidad b�sica de programaci�n de Kubernetes: se garantiza que todos los contenedores de un pod se ejecuten en el mismo nodo en el que est� programado el pod.

Cada pod tiene su propia direcci�n IP y un pod de un nodo deber�a poder acceder a un pod de otro usando el IP del pod. Los contenedores de un nodo �nico pueden comunicarse f�cilmente a trav�s de una interfaz local. Sin embargo, la comunicaci�n entre los pods es m�s complicada y requiere un componente de red independiente que pueda dirigir de forma transparente el tr�fico de un pod de un nodo a un pod de otro.

Los complementos de red de pods ofrecen esta funcionalidad. Para este cl�ster usar� Flannel, una opci�n estable y apta.

Cree un playbook de Ansible llamado master.yml en su m�quina local:

    nano ~/kube-cluster/master.yml

A�ada el siguiente play al archivo para iniciar el cl�ster e instalar Flannel:

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

Para comprobar el estado del nodo maestro, aplique SSH en �l con el siguiente comando:

    ssh ubuntu@master_ip

Una vez que ingrese en el nodo maestro, ejecute lo siguiente:

    kubectl get nodes

Ahora ver� lo siguiente:

 ![image](https://user-images.githubusercontent.com/81053948/194200744-ac9547a0-56b8-4bde-955f-baefdf21802a.png)

El resultado indica que el nodo master complet� todas las tareas de inicializaci�n y se encuentra en el estado Ready, a partir de lo cual puede comenzar a aceptar nodos de trabajo y ejecutar tareas enviadas al servidor de la API. Ahora, podr� a�adir los trabajadores desde su m�quina local.

# Paso 4: Configurar los nodos del trabajador

La incorporaci�n de trabajadores al cl�ster implica ejecutar un �nico comando en cada uno. Este comando incluye la informaci�n de cl�ster necesaria, como la direcci�n IP y el puerto del servidor de la API del maestro y un token seguro. Solo podr�n incorporarse al cl�ster los nodos que puedan pasar el token seguro.

Regrese a su espacio de trabajo y cree un libro de reproducci�n llamado workers.yml:

    nano ~/kube-cluster/workers.yml

A�ada el siguiente texto al archivo para agregar los trabajadores al cl�ster:

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

- El primer play obtiene el comando de incorporaci�n que debe ejecutarse en los nodos de trabajo. Este comando se muestra en el siguiente formato: kubeadm join token. Una vez que obtenga el comando real con el token y los valores de hash adecuados, la tarea lo fija como un hecho para que el siguiente play pueda acceder a esta informaci�n.

- El segundo play tiene una sola tarea que ejecuta el comando de incorporaci�n en todos los nodos de trabajadores. Una vez que se complete esta tarea, los dos nodos de trabajo formar�n parte del cl�ster.

Guarde y cierre el archivo cuando termine.

Implemente el playbook producido lo siguiente a nivel local:

    ansible-playbook -i hosts ~/kube-cluster/workers.yml

![image](https://user-images.githubusercontent.com/81053948/194201060-cecc32c2-97b7-43c7-848d-30ac74d1a5fe.png)

# Paso 5: Verificar el cluster

Un cl�ster puede fallar durante la configuraci�n debido a la indisponibilidad de un nodo oa que la conexi�n de red entre el maestro y el trabajador no funciona correctamente. Comprobaremos el cl�ster y nos aseguraremos de que los nodos funcionen correctamente.

pudo comprobar el estado actual del cl�ster desde el nodo maestro para asegurarse de que los nodos est�n listos. Si interrumpi� la conexi�n con el nodo maestro, puede aplicar SSH en �l de nuevo con el siguiente comando:

    ssh ubuntu@master_ip

Luego, ejecute el siguiente comando para obtener el estado del cl�ster:

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
