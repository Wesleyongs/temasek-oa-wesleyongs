-- Create table structure
DROP TABLE IF EXISTS rates;

CREATE TABLE rates (
    id SERIAL PRIMARY KEY,
    timestamp timestamp NOT NULL,
    base_currency VARCHAR(5) NOT NULL,
    target_currency VARCHAR(5) NOT NULL,
    rate Float NOT NULL
);