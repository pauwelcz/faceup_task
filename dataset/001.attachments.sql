DROP TABLE IF EXISTS attachments;

CREATE TABLE attachments (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    record_id INTEGER NOT NULL,
    filename VARCHAR(255) NOT NULL,
    extension VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (record_id) 
        REFERENCES records(id)
        ON DELETE CASCADE
);

CREATE INDEX record_index
ON attachments (record_id);

INSERT INTO attachments (id, record_id, filename, extension)
VALUES (1, 1, '123_test_file','txt'), 
       (2, 1, '234_test_file', 'mp3');