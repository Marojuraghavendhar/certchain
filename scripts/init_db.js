const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../certichain.db');
const schemaPath = path.join(__dirname, '../database_schema.sql');

// Read schema
const schema = fs.readFileSync(schemaPath, 'utf8');

// Connect to DB (creates it if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to the CertiChain database.');
});

// Execute schema
db.serialize(() => {
    // Enable foreign keys
    db.run("PRAGMA foreign_keys = ON");

    // Split schema into individual commands (naive split by semicolon, can represent issues with complex triggers but fine for simple CREATE TABLE)
    // Actually, db.exec is better for multiple statements
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error executing schema:', err.message);
            process.exit(1);
        }
        console.log('Database schema initialized successfully.');

        // Insert sample data if tables are empty
        const insertStudent = `
            INSERT OR IGNORE INTO Students (student_id, full_name, email, password_hash, date_of_birth, phone_number)
            VALUES ('12345678', 'John Doe', 'john.doe@university.edu', 'password123', '2000-08-15', '+1 555-0123');
        `;

        db.run(insertStudent, (err) => {
            if (err) console.error("Error inserting sample student:", err.message);
            else console.log("Sample student verified.");
        });

        const insertRecord = `
            INSERT INTO Academic_Records (student_id, course_name, year_of_study, gpa, institution_name)
            SELECT '12345678', 'Computer Science', '3rd Year', 3.80, 'University of Tech'
            WHERE NOT EXISTS (SELECT 1 FROM Academic_Records WHERE student_id = '12345678');
        `;

        db.run(insertRecord, (err) => {
            if (err) console.error("Error inserting sample record:", err.message);
            else console.log("Sample academic record verified.");
        });
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
