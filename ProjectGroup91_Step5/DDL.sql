


CREATE TABLE Characters (
    character_id int auto_increment unique not NULL,
    character_speed int,
    character_name varchar(45),
    creation_age int,

    PRIMARY KEY (character_id)
);

CREATE TABLE Pets  (
    pet_id int auto_increment unique not NULL,
    character_id int not NULL,
    pet_name varchar(45),
    pet_age int,

    PRIMARY KEY (pet_id),
    FOREIGN KEY (character_id) REFERENCES Characters(character_id)
);

CREATE TABLE Improvements (
    improvement_id int auto_increment unique not NULL, 
    boost_type varchar(45),
    boost_amount int,
    weight_change int,  

    PRIMARY KEY (improvement_id)
);

CREATE TABLE Weapons (
    weapon_id int auto_increment unique not NULL,
    improvement_id int,
    weapon_name varchar(45),
    weapon_damage int,
    weapon_weight int,
    speed_change int,

    PRIMARY KEY (weapon_id),
    FOREIGN KEY (improvement_id) REFERENCES Improvements(improvement_id)
);


CREATE TABLE Armor (
    armor_id int auto_increment unique not NULL,
    improvement_id int,
    armor_name varchar(45), 
    armor_defense int,
    armor_weight int,
    speed_change int,

    PRIMARY KEY (armor_id),
    FOREIGN KEY (improvement_id) REFERENCES Improvements(improvement_id)
);

create table Character_weapons (
    character_id int unique not NULL,
    weapon_id int unique not NULL,
    PRIMARY KEY (character_id,weapon_id),
    FOREIGN KEY (character_id) REFERENCES Characters(character_id),
    FOREIGN KEY (weapon_id) REFERENCES Weapons(weapon_id)
);

create table Character_armors (
    character_id int unique not NULL,
    armor_id int unique not NULL,
    PRIMARY KEY (character_id,armor_id),
    FOREIGN KEY (character_id) REFERENCES Characters(character_id),
    FOREIGN KEY (armor_id) REFERENCES Armor(armor_id)
);


INSERT INTO Characters (character_speed, character_name, creation_age)
VALUES 
(50,'Drizzt',275),
(10,'Fred',19),
(30,'Glitch',5),
(50,'Miyaca',100),
(35,'Tenno',15);

INSERT INTO Pets (character_id,pet_name,pet_age)
VALUES 
(1,'Guenhwyvar',255),
(4,'Shadows',17),
(3,'Zobby',1995),
(4,'Shadowdancer',5),
(NULL,'TUTORIAL PET',1);

INSERT INTO Improvements (boost_type, boost_amount, weight_change)
VALUES 
('Armor',25,-2),
('Weapon',5,2),
('Armor',11,11),
('Armor',9001,0),
('Weapon',1009,5);

INSERT INTO Weapons (improvement_id, weapon_name, weapon_damage, weapon_weight, speed_change)
VALUES 
(2,'Sword',10,2,0),
(5,'Vorpal Sword',50,2,0),
(5,'Dwarven Hammer',100,5,-1),
(NULL,'Magic Elf Wand',100,1,1),
(2,'Phoenix Eggs',25,1,1);

INSERT INTO Armor (improvement_id, armor_name, armor_defense, armor_weight, speed_change)
VALUES 
(NULL,'Leather Armor',11,5,1),
(1,'Tutorial Armor',10,0,0),
(3,'Plate Armor',25,15,-3),
(NULL,'NOT_AVAIABLE_IN_GAME',9000,NULL,2000),
(4,'Power Armor',64,50,-5);


INSERT INTO Character_weapons  (character_id, weapon_id)
VALUES 
(1,2),
(2,4),
(3,5),
(4,2),
(5,3);

INSERT INTO Character_armors (character_id, armor_id)
VALUES 
(1,1),
(2,2),
(3,5),
(4,2),
(5,3);

