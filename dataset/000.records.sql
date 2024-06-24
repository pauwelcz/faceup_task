DROP TABLE IF EXISTS records;

CREATE TABLE records (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP
);

INSERT INTO records (name, age)
VALUES ('pavelsedlar', 1), 
       ('donaldtrump', 55), 
       ('johndoe', 3);