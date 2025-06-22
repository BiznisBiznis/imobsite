const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
  let connection;
  try {
    // Create a connection to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'casavis2',
    });

    console.log('Connected to the database');

    // Check if agentId column already exists
    const [columns] = await connection.query(
      `SHOW COLUMNS FROM properties LIKE 'agentId'`
    );

    if (columns.length === 0) {
      // Add the agentId column
      await connection.query(`
        ALTER TABLE properties
        ADD COLUMN agentId VARCHAR(36) DEFAULT NULL,
        ADD CONSTRAINT fk_properties_agent
          FOREIGN KEY (agentId) 
          REFERENCES team_members(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE;
      `);

      // Update existing properties to have an agent (assign to the first agent)
      await connection.query(`
        UPDATE properties 
        SET agentId = (SELECT id FROM team_members LIMIT 1) 
        WHERE agentId IS NULL;
      `);

      console.log('Migration completed successfully');
    } else {
      console.log('agentId column already exists');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

runMigration();
