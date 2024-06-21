CREATE TABLE flowers (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    latin_name VARCHAR2(100),
    color VARCHAR2(20),
    image VARCHAR2(100),
    description VARCHAR2(1800)
);
/**
categories haben wir nicht mehr
**/
CREATE TABLE categories (
    name VARCHAR2(100) PRIMARY KEY
);

CREATE TABLE users (
    id NUMBER PRIMARY KEY,
    username VARCHAR2(20),
    password VARCHAR2(20),
    isAdmin NUMBER(1,0)
);

CREATE TABLE bouquets (
    name VARCHAR2(20),
    id NUMBER PRIMARY KEY,
    user_id Number,
    constraint fk_user
        foreign key (user_id)
        references user(id)
);

CREATE TABLE bouquet_has_flower (
    bouquet_id Number,
    flower_id Number,
    constraint fk_flower
        foreign key (flower_id)
        references flowers(id),
    constraint fk_bouquet
        foreign key (bouquet_id)
        references bouquets(id),
    constraint pk_bouquet
        primary key (bouquet_id, flower_id)
);