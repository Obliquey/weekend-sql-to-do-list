-- Instructions for database setup

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"completeBy" DATE NOT NULL,
	"isComplete" BOOL,
	"notes" VARCHAR(300) NOT NULL
);