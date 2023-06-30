-- Create table structure
DROP TABLE IF EXISTS currencies;

CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    type VARCHAR(55) NOT NULL
);

-- Insert data into table
INSERT INTO
    currencies (name, type)
VALUES
    ('USD', 'fiat'),
    ('EUR', 'fiat'),
    ('SGD', 'fiat'),
    ('BTC', 'crypto'),
    ('ETH', 'crypto'),
    ('DOGE', 'crypto');

-- Create table structure
DROP TABLE IF EXISTS rates;

CREATE TABLE rates (
    id SERIAL PRIMARY KEY,
    timestamp timestamp NOT NULL,
    base VARCHAR(3) NOT NULL,
    currency_id INT NOT NULL,
    rate Float NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES currencies (id)
);