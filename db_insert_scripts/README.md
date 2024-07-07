1. Create a new database on your Postgres server (or use an existing one)

e.g.:

CREATE DATABASE react_demos
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

2. Execute the insert scripts in the order "01*" > "02*" > ...