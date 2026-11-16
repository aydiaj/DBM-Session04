-- Session 04 adaptation of the book's Activity 03-02 inventory schema and titles.
-- Supplied setup, not a migrations exercise. Creates a separate book-scenario database.
-- Preserves existing rows. No DROP, DELETE, TRUNCATE, identity reseed or replacement.
USE master;
GO
IF DB_ID(N'InventoryManagerDB_0302') IS NULL
    EXEC(N'CREATE DATABASE InventoryManagerDB_0302;');
GO
USE InventoryManagerDB_0302;
GO
SET XACT_ABORT ON;
BEGIN TRY
    BEGIN TRANSACTION;
    IF OBJECT_ID(N'dbo.Items') IS NOT NULL AND OBJECT_ID(N'dbo.Items',N'U') IS NULL
        THROW 50400,'dbo.Items exists but is not a user table. Setup stopped.',1;
    IF OBJECT_ID(N'dbo.Items',N'U') IS NULL
        EXEC(N'CREATE TABLE dbo.Items (
            Id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Items PRIMARY KEY,
            Name NVARCHAR(100) NOT NULL
        );');
    IF (SELECT COUNT(*) FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items'))<>2
       OR NOT EXISTS(SELECT 1 FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items') AND name=N'Id'
           AND TYPE_NAME(user_type_id)=N'int' AND is_identity=1 AND is_nullable=0 AND is_computed=0)
       OR NOT EXISTS(SELECT 1 FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items') AND name=N'Name'
           AND TYPE_NAME(user_type_id)=N'nvarchar' AND max_length=200 AND is_nullable=0 AND is_computed=0)
        THROW 50401,'Existing Items schema differs from the two-column book model. No data changed; inspect the mismatch.',1;
    IF NOT EXISTS(SELECT 1 FROM sys.indexes i JOIN sys.index_columns k
       ON i.object_id=k.object_id AND i.index_id=k.index_id
       JOIN sys.columns c ON c.object_id=k.object_id AND c.column_id=k.column_id
       WHERE i.object_id=OBJECT_ID(N'dbo.Items') AND i.is_primary_key=1 AND c.name=N'Id' AND k.key_ordinal=1
       AND (SELECT COUNT(*) FROM sys.index_columns x WHERE x.object_id=i.object_id AND x.index_id=i.index_id AND x.key_ordinal>0)=1)
        THROW 50402,'Items requires a single-column primary key on Id. Setup stopped.',1;
    -- Sequential inserts give the documented IDs only on a fresh, empty identity table.
    EXEC sp_executesql N'
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Top Gun'') INSERT dbo.Items(Name) VALUES(N''Top Gun'');
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Star Wars'') INSERT dbo.Items(Name) VALUES(N''Star Wars'');
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Star Trek'') INSERT dbo.Items(Name) VALUES(N''Star Trek'');
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''The Godfather'') INSERT dbo.Items(Name) VALUES(N''The Godfather'');
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''The Lord of the Rings: The Fellowship of the Ring'')
        INSERT dbo.Items(Name) VALUES(N''The Lord of the Rings: The Fellowship of the Ring'');';
    COMMIT;
    PRINT 'Inventory ready. Existing records preserved; missing example titles added.';
END TRY
BEGIN CATCH
    IF XACT_STATE()<>0 ROLLBACK;
    THROW;
END CATCH;
GO
SELECT Id,Name FROM dbo.Items ORDER BY Name;
