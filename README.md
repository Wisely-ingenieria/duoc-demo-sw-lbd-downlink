# Downlink lambda

Este proyecto contiene una función Lambda de AWS que publica mensajes en un tópico de AWS IoT. La función se utiliza para enviar datos a dispositivos IoT.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Despliegue de la Lambda](#despliegue-de-la-lambda)
4. [Configuración de Permisos](#configuración-de-permisos)
5. [Parámetros](#parámetros)
6. [Pruebas](#pruebas)

## Requisitos

- Node.js 20.x
- Cuenta de AWS con permisos para crear y gestionar funciones Lambda y tópicos de IoT

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Wisely-ingenieria/duoc-demo-sw-lbd-downlink.git
    cd duoc-demo-sw-lbd-downlink
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Despliegue de la Lambda

### Usando la Consola de AWS

1. Ve a la consola de AWS Lambda.
2. Haz clic en "Crear función".
3. Selecciona "Crear desde cero" y proporciona un nombre para tu función.
4. Selecciona el runtime de Node.js (por ejemplo, Node.js 20.x).
5. En "Permisos", selecciona un rol existente con permisos adecuados o crea uno nuevo.
6. Sube el archivo ZIP del contenido del proyecto:
    - Crea un archivo ZIP del contenido del proyecto:
        ```bash
        zip -r function.zip .
        ```
    - En la consola de Lambda, sube este archivo ZIP en la sección "Código fuente".

### Agregar la Variable de Entorno

Para que la función Lambda pueda conectarse al endpoint de AWS IoT, es necesario configurar la variable de entorno `AWS_IOT_ENDPOINT`:

1. En la consola de AWS Lambda, ve a la sección "Configuración".
2. Selecciona "Variables de entorno".
3. Haz clic en "Editar" y luego en "Agregar variable de entorno".
4. Agrega la variable `AWS_IOT_ENDPOINT` con el valor correspondiente a tu endpoint de AWS IoT.
5. Haz clic en "Guardar".

## Configuración de Permisos

Para permitir que la función Lambda publique en un tópico de AWS IoT, debes agregar la siguiente política a tu rol de Lambda:

1. Ve a la consola de IAM en AWS.
2. Selecciona el rol asociado a tu función Lambda.
3. Agrega la siguiente política JSON:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "iot:Publish"
                ],
                "Resource": [
                    "arn:aws:iot:YOUR_REGION:YOUR_ACCOUNT_ID:topic/YOUR_TOPIC"
                ]
            }
        ]
    }
    ```

## Parámetros

La función Lambda acepta los siguientes parámetros a través de `queryStringParameters` o el cuerpo de la solicitud (`body`):

- `alert`: El mensaje de alerta a enviar.
- `interval`: El intervalo de tiempo para la alerta.
- `device_id`: El ID del dispositivo al que se envía la alerta.

## Pruebas

Para probar la función Lambda, puedes exponer la URL de la Lambda en el navegador con los parámetros correspondientes.

Ejemplo de URL:

```
https://lbdaws.lambda-url.us-west-2.on.aws/?device_id=test&interval=100&alert=300
```