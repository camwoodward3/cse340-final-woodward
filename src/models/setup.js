import db from "./db.js";


export async function testConnection() {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;

        await db.query(`
           CREATE TABLE IF NOT EXISTS jedi (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                birth TEXT,
                birthplace TEXT,
                death TEXT,
                deathplace TEXT,
                species TEXT,
                rank TEXT,
                lightsaber TEXT,
                master TEXT,
                padawan TEXT,
                father TEXT,
                mother TEXT,
                siblings TEXT,
                spouse TEXT,
                children TEXT,
                era TEXT
           ); 
        `);
        console.log("Jedi table is ready.");
        
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

