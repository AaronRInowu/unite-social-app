This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).<br />
Incluye typescript, react-native-vector-icons, formik, yup.

Este proyecto usa npm y "npx expo" para manejar las dependencias<br />
First, install dependecies run the development server:

```bash

npm i

npx expo start

```

Instala la aplicacion de ExpoGo y al iniciar el proyecto escanea el qr.
In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Organizaición del proyecto:

El proyecto no cuenta con una carpeta src asi que se tiene todo lo que no sea una "ruta" en "setup" dentro de app.<br/>
El proyecto tiene una carpeta assets para guardar imagenes y svg estaticos que se puedan usar.<br />
Dentro de setup esta el resto del proyecto con el app router de next, otras carpetas son las de:

/components <br />
/global <br /> &emsp;# La estructura general de los archivos que van aqui son de [[modulo]].[[carpeta]].ts
/functions <br />
/hooks<br />
/interfaces<br />
/styles <br /> &emsp;# Esta carpeta tiene su propio readme, tiene un archivo para los colores y otro para los estilos globales
/templates <br /> &emsp;# Informacion dummy y/o informacion estatica que se puede mapear
/services <br /> &emsp;# Son las llamadas a la api. <br /> &emsp;# La estructura general de los archivos que van aqui son de [[modulo]].axios.ts <br />&emsp;# Generalemente los GET que se deberian de llamar retrieveX o retrieveSingleX si es get por id y deberia de haber un retrieveGeneral que se envia un url y se puede tipar.
