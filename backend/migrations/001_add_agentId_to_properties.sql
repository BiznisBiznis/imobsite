-- Add agentId column to properties table
ALTER TABLE `properties`
ADD COLUMN `agentId` VARCHAR(36) DEFAULT NULL,
ADD CONSTRAINT `fk_properties_agent`
  FOREIGN KEY (`agentId`) 
  REFERENCES `team_members` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

-- Update existing properties to have an agent (for demonstration, assign to the first agent)
UPDATE `properties` SET `agentId` = '1' WHERE 1=1;
