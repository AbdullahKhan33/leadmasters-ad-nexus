-- Clear all existing post ideas from old schema
DELETE FROM generated_post_ideas;

-- Drop the post_idea_profiles table as it's no longer needed
DROP TABLE IF EXISTS post_idea_profiles;