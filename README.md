# arcambio-frontend

## Descripción del Proyecto

Esta proyecto de código fuente es para la administración de las operaciones de Arcambio. La webapp se desarrollada utilizando HTML, CSS, Javascript, ReactJs, vite, Node.js, Navegador Firefox y Google Chrome. Se trata de un proyecto que permite hacer el flujo de una casa de cambios enfocada en la venta y compra de dolares (USD).

## Convenciones del Proyecto

- Para el desarrollo del proyecto en [github](https://github.com).
- Se crea el el repositorio [arcambio-frontend](https://github.com/arcambio/arcambio-frontend/).
- En la documentación del git se uso [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Las variables están escritas con camelCase.
- La estructura de carpetas es propia donde los componentes de primer nivel esta en _pages_ y los demás componentes esta en la carpeta _components_.
- Los css están embebidos en los mismos componentes usando [styled components](https://styled-components.com/).
- En las consultas al backend se utiliza [fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch) nativo.
- Para el estado se utiliza zustand [zustand](https://zustand-demo.pmnd.rs/)
- Para el manejo de la lógica de cada modulo de utiliza
  [custom hooks](https://es.react.dev/learn/reusing-logic-with-custom-hooks/).
- Se utiliza el linter por defecto para corregir los errores.
- EL proyecto utiliza versiones exactas para garantizar que los cambios sean controlados por el desarrollador.
- Para el manejo de rutas se utiliza wouter por ser mas liviano.
- Para mejora la carga se utilizo lazy para dividir el bundle.
- Para configurar el proyecto existe un archivo de ambiente,
- Para no tener variables repetidas se agrego un archivo de constantes.

## Requerimientos

- Node.js
- npm
- git

## Instalación

- Clonar el repositorio.

```
  git clone git@github.com:arcambio/arcambio-frontend.git
```

- Ejecutar este comando para instalar las dependencias.

```
  npm install
```

## Probar el Proyecto

- Ejecuta este comando para iniciar el servidor de desarrollo.

```
  npm run dev
```

- Abre el navegador y navega a [http://localhost:5173/](http://localhost:5173/)

## Configuración del Despliegue en Digital Ocean

- Se elige el droplet frist project
- Se agrego un app y se sigue el wizard para elegir el repo de github
- Se prueba probar que quedo desplegado al navegar a la url
  [https://arcambio-frontend-pqwxb.ondigitalocean.app](https://arcambio-frontend-pqwxb.ondigitalocean.app/)

## Arranque en producción

- Se requiere que inice con node.

```
  npm run start
```

## Licencia

Este proyecto tiene [licencia MIT.](https://es.wikipedia.org/wiki/Licencia_MIT)
