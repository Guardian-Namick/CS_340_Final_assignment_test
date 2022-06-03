


--
-- More detailed select functions
--

-- Select character full info
Select character_name from Characters where character_id=:character_id;
Select character_speed from Characters where character_id=:character_id;
Select creation_age from Characters where character_id=:character_id;
Select pet_name from Pets where character_id=:character_id;

Select weapon_name from Weapons where (Select weapon_id from Character_weapons where character_id=:character_id);

Select armor_name from Armors where (Select armor_id from Character_armors where character_id=:character_id);


-- Select Pet full info
Select pet_name from Pets where pet_id=:pet_id;
Select pet_age from Pets where pet_id=:pet_id;

Select character_name from Characters where (Select character_id from Pets where pet_id=:pet_id);


-- Select Weapon info full
Select weapon_name from Weapons where weapon_id=:weapon_id;
Select weapon_damage from Weapons where weapon_id=:weapon_id;
Select weapon_weight from Weapons where weapon_id=:weapon_id;
Select speed_change from Weapons where weapon_id=:weapon_id;

Select boost_type from Improvements where (Select improvement_id from Weapons where weapon_id=:weapon_id);


-- Select Armor info full
Select armor_name from Armor where armor_id=:armor_id;
Select armor_defense from Armor where armor_id=:armor_id;
Select armor_weight from Armor where armor_id=:armor_id;
Select speed_change from Armor where armor_id=:armor_id;

Select boost_type from Improvements where (Select improvement_id from Armor where armor_id=:armor_id);


-- Select Improvement info Full
Select boost_type from Improvements where improvement_id=:improvement_id;
Select boost_amount from Improvements where improvement_id=:improvement_id;
Select weight_change from Improvements where improvement_id=:improvement_id;




--These are basic inserts into the tables the ":values" are grabbed from the HTML side of things I believe

--
-- More detailed Insert functions
--

-- Character Full insert
INSERT INTO Characters (character_speed, character_name, creation_age) VALUES(:character_speed, :character_name, :creation_age);
INSERT INTO Character_weapons (weapon_id, character_id) VALUES (:weapon_id, :character_id);
INSERT INTO Character_armors (armor_id, character_id) VALUES (:armor_id, :character_id);

-- Pet full insert
INSERT INTO Pets (character_id,pet_name,pet_age) Values (:character_id,:pet_name,:pet_age);

-- Weapons full insert
INSERT INTO Weapons (improvement_id, weapon_name, weapon_damage, weapon_weight, speed_change) Values (:improvement_id, :weapon_name, :weapon_damage, :weapon_weight, :speed_change);

-- Armor full insert
INSERT INTO Armors (improvement_id, armor_name, armor_defense, armor_weight, speed_change) Values (:improvement_id, :armor_name, :armor_defense, :armor_weight, :speed_change);

-- Improvements full insert
INSERT INTO Improvements (boost_type, boost_amount, weight_change) Values (:boost_type, :boost_amount, :weight_change);





--Full updates
Update Characters SET character_speed = :character_speed, character_name = :character_name, creation_age = :creation_age where character_id = :character_id;
Update Character_weapons SET (weapon_id =:weapon_id, character_id = :character_id);
Update Character_armors SET (armor_id = :armor_id, character_id = :character_id);


Update Pets SET (character_id=:character_id,pet_name=:pet_name,pet_age=:pet_age) where pet_id = :pet_id;

Update Weapons SET (improvement_id=:improvement_id, weapon_name=:weapon_name, weapon_damage=:weapon_damage, weapon_weight=:weapon_weight, speed_change=:speed_change) where weapon_id = :weapon_id;

Update Armors SET (improvement_id=:improvement_id, armor_name=:armor_name, armor_defense=:armor_defense, armor_weight=:armor_weight, speed_change=:speed_change) where armor_id = :armor_id;

Update Improvements SET (boost_type=:boost_type, boost_amount=:boost_amount, weight_change=:weight_change) where improvement_id = :improvement_id;



--Basic Delete table entities
Delete From characters where character_id = :character_id;

Delete From Pets where pet_id = :pet_id;

Delete From Weapons where weapon_id = :weapon_id;

Delete From Armors where armor_id = :armor_id;

Delete From Improvements where improvement_id = :improvement_id;