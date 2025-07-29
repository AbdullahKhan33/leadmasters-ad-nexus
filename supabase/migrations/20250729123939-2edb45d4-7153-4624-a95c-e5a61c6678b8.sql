-- Remove duplicate roles - keep only one role per user (admin stays admin, others become user)
DELETE FROM user_roles 
WHERE id IN (
  SELECT ur1.id 
  FROM user_roles ur1
  JOIN user_roles ur2 ON ur1.user_id = ur2.user_id 
  WHERE ur1.role = 'agent' 
  AND ur2.role = 'user'
  AND ur1.id != ur2.id
);

-- Also remove any agent roles for users who should be regular users
DELETE FROM user_roles 
WHERE role = 'agent' 
AND user_id IN (
  SELECT user_id 
  FROM user_roles 
  WHERE role = 'user'
);