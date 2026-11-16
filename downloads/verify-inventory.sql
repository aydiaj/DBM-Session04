-- Read-only comparison after the supplied setup. No schema or data changes.
USE InventoryManagerDB_0302;
GO
SELECT @@SERVERNAME AS ConnectedServer, DB_NAME() AS ConnectedDatabase;
SELECT c.name, TYPE_NAME(c.user_type_id) AS SqlType, c.max_length,c.is_nullable,c.is_identity
FROM sys.columns c WHERE c.object_id=OBJECT_ID(N'dbo.Items') ORDER BY c.column_id;
-- Main report: should match the first C# query.
SELECT Id,Name FROM dbo.Items ORDER BY Name;
-- Independent practice: the two Star titles on the fresh setup.
SELECT Id,Name FROM dbo.Items WHERE Name LIKE N'Star%' ORDER BY Name;
