CREATE TABLE flowers (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    latin_name VARCHAR2(100),
    color VARCHAR2(20),
    image VARCHAR2(100),
    description VARCHAR2(1800)
);

CREATE TABLE categories (
    name VARCHAR2(100) PRIMARY KEY
);

CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    username VARCHAR2(20),
    password VARCHAR2(20),
    isAdmin BOOLEAN
);

CREATE TABLE bouquets (
    name VARCHAR2(20),
    id NUMBER PRIMARY KEY,
    user_id Number,
    constraint fk_user
        foreign key (user_id)
        references user(id)
);