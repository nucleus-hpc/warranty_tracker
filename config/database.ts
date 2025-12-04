import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION') as string,
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),

        // 1. Configuración SSL obligatoria para Supabase
        ssl: {
          rejectUnauthorized: false,
        },

        // 2. 👇 ESTA ES LA SOLUCIÓN AL ERROR ENETUNREACH
        // Fuerza a Node a usar IPv4 en lugar de intentar IPv6
        family: 4,
        prepare: false
      },
      pool: {
        min: 0, // Mínimo de conexiones en el pool
        max: 10, // Máximo de conexiones en el pool
        idleTimeoutMillis: 5000, // Cierra la conexión si está inactiva por 5 segundos
      }
    },
  }
})

export default dbConfig