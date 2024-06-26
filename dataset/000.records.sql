DROP TABLE IF EXISTS records;

CREATE TABLE records (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    title VARCHAR(255),
    note VARCHAR(1024),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP,

    PRIMARY KEY (id)
);

INSERT INTO records (id, name, age, title, note)
VALUES (1, 'pavelsedlar', 1, 'test','lorem ipsum'), 
       (2, 'donaldtrump', 55, 'truth', 'media are bad'), 
       (3, 'johndoe', 3, 'ahoj', 'jak se mas');