/* Book-based code with documented classroom adaptations. */
window.S4CodeGuide = {
  "item": {
    "label": "Item.cs",
    "path": "EF10_InventoryModels/Item.cs",
    "origin": "Practical EF Core 10, Activity 03-02, Task 1: Item and DataAnnotations (printed pp. 101-103).",
    "lines": [
      {
        "code": "using System.ComponentModel.DataAnnotations;",
        "explain": "Import the .NET namespace containing RequiredAttribute and StringLengthAttribute. This makes their short attribute names available in this file; it does not connect to a database.",
        "source": "DataAnnotations namespace",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-10.0"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "namespace EF10_InventoryModels;",
        "explain": "Place this file’s types in the EF10_InventoryModels namespace. The semicolon makes this a file-scoped namespace; it is an organisation name, not a database connection.",
        "source": "Create and reference a class library",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "public class Item",
        "explain": "Define the public Item class. Public lets the other projects use the type. A class definition is not an individual Item object.",
        "source": "C# properties",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties"
      },
      {
        "code": "{",
        "explain": "Open the class body. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    public int Id { get; set; }",
        "explain": "Define an integer property that other code can read and assign. EF Core recognises Id as the key by convention; it matches the existing SQL int identity primary-key column.",
        "source": "EF Core key conventions",
        "url": "https://learn.microsoft.com/en-us/ef/core/modeling/keys"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    [Required]",
        "explain": "Attach RequiredAttribute to the following Name property. EF Core treats it as required/non-nullable model metadata. It does not execute input validation whenever the property is assigned.",
        "source": "RequiredAttribute",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.requiredattribute?view=net-10.0"
      },
      {
        "code": "    [StringLength(100)]",
        "explain": "Attach StringLengthAttribute to Name with a maximum of 100. EF Core uses this maximum in the model; the existing SQL column is nvarchar(100). It does not shorten a C# string automatically.",
        "source": "StringLengthAttribute",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.stringlengthattribute?view=net-10.0"
      },
      {
        "code": "    public string Name { get; set; } = \"\";",
        "explain": "Define a text auto-property with read/write access. The empty-string initializer gives a new object a non-null starting value in our nullable-enabled project. It is a classroom addition, not a database default. EF fills Name from a returned row.",
        "source": "Nullable reference types in EF Core",
        "url": "https://learn.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types"
      },
      {
        "code": "}",
        "explain": "Close the class body. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      }
    ],
    "core": true
  },
  "context": {
    "label": "InventoryDBContext.cs",
    "path": "EF10_InventoryDBLibrary/InventoryDBContext.cs",
    "origin": "Practical EF Core 10, Activity 03-02, InventoryDBContext.cs and Task 2; explicit options pattern from Activity 01-01.",
    "lines": [
      {
        "code": "using EF10_InventoryModels;",
        "explain": "Use types from our EF10_InventoryModels namespace without repeating the full name. A project reference makes its assembly available; this using directive does not replace that reference.",
        "source": "Create and reference a class library",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library"
      },
      {
        "code": "using Microsoft.EntityFrameworkCore;",
        "explain": "Import EF Core types and extension methods, including DbContext, DbSet, UseSqlServer and ToListAsync where used. The package reference supplies the implementation.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "namespace EF10_InventoryDBLibrary;",
        "explain": "Place this file’s types in the EF10_InventoryDBLibrary namespace. The semicolon makes this a file-scoped namespace; it is an organisation name, not a database connection.",
        "source": "Create and reference a class library",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "public class InventoryDbContext : DbContext",
        "explain": "Define the public InventoryDbContext class, inheriting EF Core’s DbContext base class. The colon denotes inheritance.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "{",
        "explain": "Open the class body. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    // Supplied: pass configuration to EF Core's base class.",
        "explain": "A comment for the learner. The compiler ignores it; it does not execute or change data.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    public InventoryDbContext(DbContextOptions<InventoryDbContext> options)",
        "explain": "Declare the constructor called when this context is created. DbContextOptions<InventoryDbContext> is configuration specifically for this context type; options is the parameter name.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "        : base(options)",
        "explain": "Pass the received options to the DbContext base constructor before our constructor body runs. This lets EF Core use the provider and connection settings.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "    {",
        "explain": "Open the constructor body. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    }",
        "explain": "Close the constructor body. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    public DbSet<Item> Items { get; set; }",
        "explain": "Expose an EF Core set for Item entities. <Item> is the generic type argument and Items is our property name. EF initialises this set; accessing the property does not load all rows. The Items set name supplies the table-name convention.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "}",
        "explain": "Close the class body. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      }
    ],
    "core": true
  },
  "program": {
    "label": "Program.cs completed",
    "path": "EF10_InventoryManager/Program.cs",
    "origin": "Practical EF Core 10, Activity 01-01 Program.cs configuration and Activity 03-02 Application.GetAllItemsAsync. Startup guards, top-level layout and messages are documented classroom adaptations.",
    "lines": [
      {
        "code": "using EF10_InventoryDBLibrary;",
        "explain": "Use types from our EF10_InventoryDBLibrary namespace without repeating the full name. A project reference makes its assembly available; this using directive does not replace that reference.",
        "source": "Create and reference a class library",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library"
      },
      {
        "code": "using EF10_InventoryModels;",
        "explain": "Use types from our EF10_InventoryModels namespace without repeating the full name. A project reference makes its assembly available; this using directive does not replace that reference.",
        "source": "Create and reference a class library",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library"
      },
      {
        "code": "using Microsoft.EntityFrameworkCore;",
        "explain": "Import EF Core types and extension methods, including DbContext, DbSet, UseSqlServer and ToListAsync where used. The package reference supplies the implementation.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "using Microsoft.Extensions.Configuration;",
        "explain": "Make configuration types and extension methods available, including ConfigurationBuilder and GetConnectionString.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "using Microsoft.Data.SqlClient;",
        "explain": "Make SqlException from the underlying SQL Server driver available for the catch block. This is not the EF Core SQL Server provider package.",
        "source": "SQL Server EF Core provider",
        "url": "https://learn.microsoft.com/en-us/ef/core/providers/sql-server/"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "// Adapted from the supplied Practical EF Core 10 activities 01-01 and 03-02.",
        "explain": "A comment for the learner. The compiler ignores it; it does not execute or change data.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "// The book's host/DI wiring is replaced by a small, supplied configuration block.",
        "explain": "A comment for the learner. The compiler ignores it; it does not execute or change data.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "Console.WriteLine(\"DB3 Session 04 - Your first EF Core Inventory query\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "try",
        "explain": "Start the work whose matching exceptions are handled below. A try block is error-handling structure, not a database transaction.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "{",
        "explain": "Open the try block. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    // Supplied: read appsettings.json from the application's output folder.",
        "explain": "A comment for the learner. The compiler ignores it; it does not execute or change data.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    // Environment override keeps optional SQL credentials out of the source files.",
        "explain": "A comment for the learner. The compiler ignores it; it does not execute or change data.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    var configuration = new ConfigurationBuilder()",
        "explain": "Create a builder for application settings. var means the compiler infers its type; no database operation occurs here.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "        .SetBasePath(AppContext.BaseDirectory)",
        "explain": "Find the JSON file relative to the running application’s base directory. The project copies appsettings.json there during the build.",
        "source": "AppContext.BaseDirectory",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/system.appcontext.basedirectory?view=net-10.0"
      },
      {
        "code": "        .AddJsonFile(\"appsettings.json\", optional: false)",
        "explain": "Add appsettings.json as a configuration source. optional: false means a missing file is an error, rather than silently using no settings.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "        .Build();",
        "explain": "Build the configuration object from its configured sources. This finishes the chained builder expression and makes the JSON settings available.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "    string? connectionString = Environment.GetEnvironmentVariable(\"DBM_EF_CONNECTION\")",
        "explain": "Read an optional environment override called DBM_EF_CONNECTION. string? permits a null result when it is not set. This supplied adaptation allows credentials to stay outside the source file.",
        "source": "Environment.GetEnvironmentVariable",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/system.environment.getenvironmentvariable?view=net-10.0"
      },
      {
        "code": "        ?? configuration.GetConnectionString(\"InventoryDbConnection\");",
        "explain": "If the environment lookup returned null, use the named connection string from the JSON ConnectionStrings section. ?? falls back for null, not for an empty string.",
        "source": "Null-coalescing operator",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator"
      },
      {
        "code": "    if (string.IsNullOrWhiteSpace(connectionString) || connectionString.Contains(\"YOUR_SERVER\"))",
        "explain": "Check for missing/blank settings or the unchanged YOUR_SERVER placeholder. || means either condition is sufficient to enter the guard. It avoids attempting a known-unprepared connection.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "    {",
        "explain": "Open the configuration guard. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "        Console.WriteLine(\"Set the server in TODO 00 (appsettings.json), then complete TODOs 01-05. No database request was made.\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "        return;",
        "explain": "Stop this top-level program before reaching the EF setup or query. No database request has been made on this guarded path.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    }",
        "explain": "Close the configuration guard. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    var optionsBuilder = new DbContextOptionsBuilder<InventoryDbContext>();",
        "explain": "Create an options builder for InventoryDbContext. <InventoryDbContext> identifies the context being configured; new constructs the builder object.",
        "source": "DbContext configuration and lifetime",
        "url": "https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
      },
      {
        "code": "    optionsBuilder.UseSqlServer(connectionString);",
        "explain": "Choose the EF Core SQL Server provider and give it the connection string. This configures access; it does not run a SELECT or fetch data.",
        "source": "SQL Server EF Core provider",
        "url": "https://learn.microsoft.com/en-us/ef/core/providers/sql-server/"
      },
      {
        "code": "    using var db = new InventoryDbContext(optionsBuilder.Options);",
        "explain": "Construct the context using the built options. The using declaration disposes it when execution leaves this enclosing try scope, including by exception. It does not mean “import a namespace”.",
        "source": "C# using and await using",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/using"
      },
      {
        "code": "    Console.WriteLine(\"EF Core configured. No query has run yet.\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    var query = db.Items.OrderBy(item => item.Name);",
        "explain": "Describe a query of Item entities, ordered by each item’s Name. item is a lambda parameter; => connects it to the sort expression. The query has not fetched rows yet.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine(\"SQL preview (debugging; no rows fetched):\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine(query.ToQueryString());",
        "explain": "Print a debugging representation of the generated SQL. ToQueryString does not fetch rows, and its output is not guaranteed to be directly executable SQL.",
        "source": "ToQueryString",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.entityframeworkqueryableextensions.toquerystring?view=efcore-10.0"
      },
      {
        "code": "",
        "explain": "A blank line separates ideas. It has no effect on execution.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    List<Item> items = await query.ToListAsync();",
        "explain": "Execute the query asynchronously and await its completion. The resulting List<Item> holds entity objects read from the database. This is the line that requests and collects the rows.",
        "source": "EF Core asynchronous queries",
        "url": "https://learn.microsoft.com/en-us/ef/core/miscellaneous/async"
      },
      {
        "code": "    Console.WriteLine(\"ID | Item\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    foreach (Item item in items)",
        "explain": "Visit each Item already in the loaded list. item is the current object. This loop itself does not execute another database query.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "    {",
        "explain": "Open the foreach loop body. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "        Console.WriteLine($\"{item.Id} | {item.Name}\");",
        "explain": "Print Id and Name from the current Item object. The $ string inserts the two property values into the output.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "    }",
        "explain": "Close the foreach loop body. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine($\"Items shown: {items.Count}\");",
        "explain": "Print the number of objects in the loaded List<Item>. This is not a second database query.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "    if (items.Count == 0)",
        "explain": "Check whether the loaded list is empty. Count here is a List property, so this check does not send a SQL COUNT query.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "        Console.WriteLine(\"No items matched. Compare the same query in SSMS.\");",
        "explain": "Display the no-match message only when the preceding if condition is true. Without braces, that if controls this single statement.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "}",
        "explain": "Close the try block. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "catch (SqlException ex)",
        "explain": "Handle a matching SQL Server driver exception and name the exception object ex. Its details help identify connection, permission, table or SQL failures.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "{",
        "explain": "Open the catch block. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine($\"SQL Server error {ex.Number}: {ex.Message}\");",
        "explain": "Display the SQL exception’s number and message. $ enables string interpolation, and the expressions in braces supply their values.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "    Console.WriteLine(\"Check the same instance in SSMS, authentication, database setup and preflight. Do not reset the database.\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "}",
        "explain": "Close the catch block. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "catch (InvalidOperationException ex)",
        "explain": "Handle an invalid operation, including EF model/configuration errors. Fix the reported cause; this catch is not a substitute for correct mapping.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "{",
        "explain": "Open the catch block. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine($\"EF Core configuration/model error: {ex.Message}\");",
        "explain": "Display the caught exception’s message for troubleshooting. This reports the error; the using scope handles resource disposal.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "    Console.WriteLine(\"Check TODOs 01-03: key, DbSet, provider and options.\");",
        "explain": "Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "}",
        "explain": "Close the catch block. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "catch (ArgumentException ex)",
        "explain": "Handle an invalid argument such as malformed options or connection-string arguments.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "{",
        "explain": "Open the catch block. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine($\"Connection/options error: {ex.Message}\");",
        "explain": "Display the caught exception’s message for troubleshooting. This reports the error; the using scope handles resource disposal.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "}",
        "explain": "Close the catch block. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "catch (System.IO.IOException ex)",
        "explain": "Handle file-system/configuration file errors. System.IO qualifies the namespace explicitly, so a separate using System.IO directive is not required.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "{",
        "explain": "Open the catch block. Lines inside these braces belong to that scope.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    Console.WriteLine($\"Configuration file error: {ex.Message}\");",
        "explain": "Display the caught exception’s message for troubleshooting. This reports the error; the using scope handles resource disposal.",
        "source": "C# exception handling",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements"
      },
      {
        "code": "}",
        "explain": "Close the catch block. A using declaration in a finished scope disposes its resource.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      }
    ],
    "core": true
  },
  "project-console": {
    "label": "Console project csproj",
    "path": "EF10_InventoryManager/EF10_InventoryManager.csproj",
    "origin": "Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.",
    "lines": [
      {
        "code": "<Project Sdk=\"Microsoft.NET.Sdk\">",
        "explain": "Open this .NET SDK project. Its child elements specify its output role, references and files; it also inherits Directory.Build.props.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "  <PropertyGroup><OutputType>Exe</OutputType></PropertyGroup>",
        "explain": "Make this project a runnable application. The two other projects use the library default. This selects the startup role; modern .NET can still produce a DLL plus an application host.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "  <ItemGroup>",
        "explain": "Begin the project’s collection of dependency/file items.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "    <ProjectReference Include=\"../EF10_InventoryDBLibrary/EF10_InventoryDBLibrary.csproj\" />",
        "explain": "Reference our database library using a relative path to its csproj file. This establishes a build dependency; a using directive alone cannot do that.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "    <PackageReference Include=\"Microsoft.Extensions.Configuration.Json\" Version=\"10.0.14\" />",
        "explain": "Restore the JSON configuration package that supplies AddJsonFile. The version is pinned for consistent classroom setup.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "    <None Update=\"appsettings.json\" CopyToOutputDirectory=\"PreserveNewest\" />",
        "explain": "Keep appsettings.json as a content file and copy it to the output when newer. The running program reads it from AppContext.BaseDirectory.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "  </ItemGroup>",
        "explain": "Close this XML ItemGroup element. XML end tags complete the build-file structure.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "</Project>",
        "explain": "Close this XML Project element. XML end tags complete the build-file structure.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      }
    ],
    "core": false
  },
  "project-data": {
    "label": "Database library csproj",
    "path": "EF10_InventoryDBLibrary/EF10_InventoryDBLibrary.csproj",
    "origin": "Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.",
    "lines": [
      {
        "code": "<Project Sdk=\"Microsoft.NET.Sdk\">",
        "explain": "Open this .NET SDK project. Its child elements specify its output role, references and files; it also inherits Directory.Build.props.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "  <ItemGroup>",
        "explain": "Begin the project’s collection of dependency/file items.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "    <ProjectReference Include=\"../EF10_InventoryModels/EF10_InventoryModels.csproj\" />",
        "explain": "Reference our model library using a relative path to its csproj file. This establishes a build dependency; a using directive alone cannot do that.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "    <PackageReference Include=\"Microsoft.EntityFrameworkCore.SqlServer\" Version=\"10.0.14\" />",
        "explain": "Restore the pinned EF Core SQL Server provider from NuGet. Its dependencies include EF Core and the underlying Microsoft.Data.SqlClient driver.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "    <PackageReference Include=\"System.Security.Cryptography.Pkcs\" Version=\"10.0.13\" />",
        "explain": "Explicitly select patched System.Security.Cryptography.Pkcs 10.0.13 instead of the vulnerable transitive 9.0.11 dependency. This is a classroom dependency-maintenance addition. It flows to the Console through its project reference; no PKCS API calls are added to the lesson.",
        "source": "NuGet vulnerability auditing and dependency remediation",
        "url": "https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages"
      },
      {
        "code": "  </ItemGroup>",
        "explain": "Close this XML ItemGroup element. XML end tags complete the build-file structure.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "</Project>",
        "explain": "Close this XML Project element. XML end tags complete the build-file structure.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      }
    ],
    "core": false
  },
  "project-model": {
    "label": "Model library csproj",
    "path": "EF10_InventoryModels/EF10_InventoryModels.csproj",
    "origin": "Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.",
    "lines": [
      {
        "code": "<Project Sdk=\"Microsoft.NET.Sdk\" />",
        "explain": "Define a complete minimal class-library project using the .NET SDK. It inherits Directory.Build.props.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      }
    ],
    "core": false
  },
  "props": {
    "label": "Directory.Build.props",
    "path": "Directory.Build.props",
    "origin": "Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.",
    "lines": [
      {
        "code": "<Project>",
        "explain": "Open the MSBuild properties file inherited by the projects below this directory.",
        "source": "Common MSBuild project properties",
        "url": "https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-properties"
      },
      {
        "code": "  <PropertyGroup>",
        "explain": "Begin a group of build property values. It does not define a C# class or SQL table.",
        "source": "Common MSBuild project properties",
        "url": "https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-properties"
      },
      {
        "code": "    <TargetFramework>net10.0</TargetFramework>",
        "explain": "Target .NET 10 for all these projects. The local SDK must support this target.",
        "source": "Common MSBuild project properties",
        "url": "https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-properties"
      },
      {
        "code": "    <ImplicitUsings>enable</ImplicitUsings>",
        "explain": "Let the SDK add common namespace imports such as System and System.Collections.Generic, so Console and List need no additional using line here.",
        "source": "Top-level C# statements",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements"
      },
      {
        "code": "    <Nullable>enable</Nullable>",
        "explain": "Enable nullable-reference analysis. This produces compile-time guidance; it is not runtime validation of every string assignment.",
        "source": "Nullable reference types in EF Core",
        "url": "https://learn.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types"
      },
      {
        "code": "  </PropertyGroup>",
        "explain": "Close this XML PropertyGroup element. XML end tags complete the build-file structure.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      },
      {
        "code": "</Project>",
        "explain": "Close this XML Project element. XML end tags complete the build-file structure.",
        "source": "Project and package references",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies"
      }
    ],
    "core": false
  },
  "settings": {
    "label": "appsettings.json",
    "path": "EF10_InventoryManager/appsettings.json",
    "origin": "Practical EF Core 10, Activity 01-01 Program.cs configuration and Activity 03-02 Application.GetAllItemsAsync. Startup guards, top-level layout and messages are documented classroom adaptations.",
    "lines": [
      {
        "code": "{",
        "explain": "Open a JSON object: a collection of named settings.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "  \"ConnectionStrings\": {",
        "explain": "Use the conventional ConnectionStrings section read by GetConnectionString.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "    \"InventoryDbConnection\": \"Server=YOUR_SERVER;Database=InventoryManagerDB_0302;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;Connect Timeout=10;\"",
        "explain": "Name the connection string exactly as Program.cs expects. Replace YOUR_SERVER; keep the Inventory database name. Integrated Security uses Windows authentication; Encrypt enables encryption; local TrustServerCertificate accepts the classroom certificate; Connect Timeout limits connection attempts. A backslash must be written twice in JSON text.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "  }",
        "explain": "Close this JSON object. The nested braces group the connection string settings.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      },
      {
        "code": "}",
        "explain": "Close this JSON object. The nested braces group the connection string settings.",
        "source": "JSON configuration provider",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers"
      }
    ],
    "core": false
  },
  "setup": {
    "label": "setup-inventory.sql",
    "path": "setup-inventory.sql",
    "origin": "Classroom SQL preparation, adapted from the Activity 03-02 Items migration and the five titles in Application.EnsureItemsExistAsync. This is not the book’s migration workflow.",
    "lines": [
      {
        "code": "-- Session 04 adaptation of the book's Activity 03-02 inventory schema and titles.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "-- Supplied setup, not a migrations exercise. Creates a separate book-scenario database.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "-- Preserves existing rows. No DROP, DELETE, TRUNCATE, identity reseed or replacement.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "USE master;",
        "explain": "Select the database for the following batch: master. This changes context; it does not delete or reset that database.",
        "source": "SQL Server USE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "GO",
        "explain": "SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.",
        "source": "SSMS GO batch separator",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17"
      },
      {
        "code": "IF DB_ID(N'InventoryManagerDB_0302') IS NULL",
        "explain": "Test whether the named Inventory database is absent before trying to create it. An existing database is kept.",
        "source": "SQL Server DB_ID",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/functions/db-id-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    EXEC(N'CREATE DATABASE InventoryManagerDB_0302;');",
        "explain": "Execute database creation only when the preceding absence check passed. It is a separate dynamic batch; an existing database is not recreated.",
        "source": "SQL Server CREATE DATABASE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-database-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "GO",
        "explain": "SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.",
        "source": "SSMS GO batch separator",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17"
      },
      {
        "code": "USE InventoryManagerDB_0302;",
        "explain": "Select the database for the following batch: InventoryManagerDB_0302. This changes context; it does not delete or reset that database.",
        "source": "SQL Server USE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "GO",
        "explain": "SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.",
        "source": "SSMS GO batch separator",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17"
      },
      {
        "code": "SET XACT_ABORT ON;",
        "explain": "Ask SQL Server to abort the transaction for qualifying runtime errors, supporting the protected setup block.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "BEGIN TRY",
        "explain": "Start the SQL setup work whose errors can be handled in the CATCH block.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    BEGIN TRANSACTION;",
        "explain": "Group table preparation and inserts as one transaction inside the selected database.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF OBJECT_ID(N'dbo.Items') IS NOT NULL AND OBJECT_ID(N'dbo.Items',N'U') IS NULL",
        "explain": "Check whether an object called dbo.Items already exists but is not a user table. Such a naming conflict stops setup.",
        "source": "SQL Server OBJECT_ID",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/functions/object-id-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "        THROW 50400,'dbo.Items exists but is not a user table. Setup stopped.',1;",
        "explain": "Raise a specific setup error and stop rather than silently using an incompatible schema. Inside the TRY, the transaction is handled by CATCH.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF OBJECT_ID(N'dbo.Items',N'U') IS NULL",
        "explain": "Check whether the user table dbo.Items is missing before creating it.",
        "source": "SQL Server OBJECT_ID",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/functions/object-id-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "        EXEC(N'CREATE TABLE dbo.Items (",
        "explain": "Begin a dynamically executed CREATE TABLE for the missing Items table. This supplied SQL corresponds to the book’s two-property entity.",
        "source": "SQL Server CREATE TABLE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "            Id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Items PRIMARY KEY,",
        "explain": "Create the integer Id column as a non-null primary key with generated identity values starting at 1 and increasing by 1.",
        "source": "SQL Server CREATE TABLE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "            Name NVARCHAR(100) NOT NULL",
        "explain": "Create the non-null Unicode text column with length 100. This matches the model’s required Name and maximum length.",
        "source": "SQL Server CREATE TABLE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "        );');",
        "explain": "Close the CREATE TABLE definition and its quoted EXEC batch.",
        "source": "SQL Server CREATE TABLE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF (SELECT COUNT(*) FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items'))<>2",
        "explain": "Require exactly the expected two columns in a pre-existing Items table before using or seeding it.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "       OR NOT EXISTS(SELECT 1 FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items') AND name=N'Id'",
        "explain": "Continue the mismatch check: each required column must exist with the metadata tested on the next line.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "           AND TYPE_NAME(user_type_id)=N'int' AND is_identity=1 AND is_nullable=0 AND is_computed=0)",
        "explain": "Require Id to be a non-null, non-computed SQL int identity column.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "       OR NOT EXISTS(SELECT 1 FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items') AND name=N'Name'",
        "explain": "Continue the mismatch check: each required column must exist with the metadata tested on the next line.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "           AND TYPE_NAME(user_type_id)=N'nvarchar' AND max_length=200 AND is_nullable=0 AND is_computed=0)",
        "explain": "Require Name to be non-null nvarchar(100), not computed. sys.columns reports this length as 200 bytes, corresponding to 100 UTF-16 code units.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "        THROW 50401,'Existing Items schema differs from the two-column book model. No data changed; inspect the mismatch.',1;",
        "explain": "Raise a specific setup error and stop rather than silently using an incompatible schema. Inside the TRY, the transaction is handled by CATCH.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF NOT EXISTS(SELECT 1 FROM sys.indexes i JOIN sys.index_columns k",
        "explain": "Check that the existing table has the expected primary-key index; inspect its indexed columns.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "       ON i.object_id=k.object_id AND i.index_id=k.index_id",
        "explain": "Match index-column records to their index by object ID and index ID.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "       JOIN sys.columns c ON c.object_id=k.object_id AND c.column_id=k.column_id",
        "explain": "Join column metadata so the indexed key column can be checked by name.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "       WHERE i.object_id=OBJECT_ID(N'dbo.Items') AND i.is_primary_key=1 AND c.name=N'Id' AND k.key_ordinal=1",
        "explain": "Restrict the metadata check to Items, a primary-key index, and Id as the first key column.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "       AND (SELECT COUNT(*) FROM sys.index_columns x WHERE x.object_id=i.object_id AND x.index_id=i.index_id AND x.key_ordinal>0)=1)",
        "explain": "Require a single key column, avoiding acceptance of a different composite primary key.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "        THROW 50402,'Items requires a single-column primary key on Id. Setup stopped.',1;",
        "explain": "Raise a specific setup error and stop rather than silently using an incompatible schema. Inside the TRY, the transaction is handled by CATCH.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    -- Sequential inserts give the documented IDs only on a fresh, empty identity table.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    EXEC sp_executesql N'",
        "explain": "Start a parameter-capable SQL execution batch. This prepared batch inserts only the missing book titles; doubled quotes inside the outer string encode literal quotes.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Top Gun'') INSERT dbo.Items(Name) VALUES(N''Top Gun'');",
        "explain": "Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Star Wars'') INSERT dbo.Items(Name) VALUES(N''Star Wars'');",
        "explain": "Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Star Trek'') INSERT dbo.Items(Name) VALUES(N''Star Trek'');",
        "explain": "Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''The Godfather'') INSERT dbo.Items(Name) VALUES(N''The Godfather'');",
        "explain": "Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''The Lord of the Rings: The Fellowship of the Ring'')",
        "explain": "Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "        INSERT dbo.Items(Name) VALUES(N''The Lord of the Rings: The Fellowship of the Ring'');';",
        "explain": "Insert the missing final book title, supplying only Name so SQL Server generates Id. The closing quote/semicolon also ends the outer execution batch.",
        "source": "SQL Server sp_executesql",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    COMMIT;",
        "explain": "Commit the successful table/data setup so its changes become durable.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    PRINT 'Inventory ready. Existing records preserved; missing example titles added.';",
        "explain": "Print a completion message in SSMS after setup commits.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "END TRY",
        "explain": "End the guarded SQL work.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "BEGIN CATCH",
        "explain": "Begin SQL error handling for failures raised inside TRY.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    IF XACT_STATE()<>0 ROLLBACK;",
        "explain": "If a transaction is still present after the error, roll it back instead of leaving partial setup work.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "    THROW;",
        "explain": "Rethrow the original SQL error so it remains visible to the person running setup.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "END CATCH;",
        "explain": "Finish the SQL error handler.",
        "source": "SQL Server TRY and CATCH",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "GO",
        "explain": "SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.",
        "source": "SSMS GO batch separator",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17"
      },
      {
        "code": "SELECT Id,Name FROM dbo.Items ORDER BY Name;",
        "explain": "Read the Id and Name values in alphabetical Name order for comparison with the EF query.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      }
    ],
    "core": false
  },
  "verify": {
    "label": "verify-inventory.sql",
    "path": "verify-inventory.sql",
    "origin": "Classroom SQL preparation, adapted from the Activity 03-02 Items migration and the five titles in Application.EnsureItemsExistAsync. This is not the book’s migration workflow.",
    "lines": [
      {
        "code": "-- Read-only comparison after the supplied setup. No schema or data changes.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "USE InventoryManagerDB_0302;",
        "explain": "Select the database for the following batch: InventoryManagerDB_0302. This changes context; it does not delete or reset that database.",
        "source": "SQL Server USE",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "GO",
        "explain": "SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.",
        "source": "SSMS GO batch separator",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17"
      },
      {
        "code": "SELECT @@SERVERNAME AS ConnectedServer, DB_NAME() AS ConnectedDatabase;",
        "explain": "Display the actual server and current database so configuration can be compared with the Console app.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "SELECT c.name, TYPE_NAME(c.user_type_id) AS SqlType, c.max_length,c.is_nullable,c.is_identity",
        "explain": "Select each column’s name, SQL type, byte length, nullability and identity flag for inspection.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "FROM sys.columns c WHERE c.object_id=OBJECT_ID(N'dbo.Items') ORDER BY c.column_id;",
        "explain": "Read metadata only for dbo.Items and order it by column position. This does not change the schema.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "-- Main report: should match the first C# query.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "SELECT Id,Name FROM dbo.Items ORDER BY Name;",
        "explain": "Read the Id and Name values in alphabetical Name order for comparison with the EF query.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "-- Independent practice: the two Star titles on the fresh setup.",
        "explain": "A SQL comment describing the supplied classroom support. SSMS does not execute comment text.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      },
      {
        "code": "SELECT Id,Name FROM dbo.Items WHERE Name LIKE N'Star%' ORDER BY Name;",
        "explain": "Read only titles beginning with Star, ordered by Name. This is the SQL comparison for the independent LINQ filter.",
        "source": "SQL Server column metadata",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17"
      }
    ],
    "core": false
  },
  "ado": {
    "label": "ADO.NET comparison",
    "path": "Concept comparison after connection setup",
    "origin": "Classroom ADO.NET comparison using the Inventory model and documented SqlClient APIs. It is not claimed as verbatim EF book code.",
    "lines": [
      {
        "code": "using var command = new SqlCommand(",
        "explain": "Create a SQL command; its SQL text and open connection are passed on the following line.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "    \"SELECT Id, Name FROM dbo.Items ORDER BY Name;\", connection);",
        "explain": "Ask SQL Server for Id and Name in alphabetical order. The existing connection object is used.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "using var reader = await command.ExecuteReaderAsync();",
        "explain": "Execute the command to get a reader; using disposes it at scope exit.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "List<Item> items = new();",
        "explain": "Create an empty C# list to hold the objects we map manually.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "while (await reader.ReadAsync())",
        "explain": "Advance to the next row. The body runs only when a row is available.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "{",
        "explain": "Open the row-processing loop body.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "    Item item = new Item();",
        "explain": "Create one Item object to hold this row’s values.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "    item.Id = reader.GetInt32(0);",
        "explain": "Read the first selected SQL int column into the object’s Id property.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "    item.Name = reader.GetString(1);",
        "explain": "Read the second selected SQL text column into the object’s Name property.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "    items.Add(item);",
        "explain": "Add this populated object to the in-memory list.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      },
      {
        "code": "}",
        "explain": "End this iteration’s row-mapping block.",
        "source": "SqlDataReader",
        "url": "https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1"
      }
    ],
    "core": false
  },
  "practice": {
    "label": "Independent filter",
    "path": "Program.cs query replacement",
    "origin": "Classroom filter extension of the book’s ordered Inventory query, supported by EF Core querying documentation.",
    "lines": [
      {
        "code": "var query = db.Items",
        "explain": "Begin a query for Item entities through the configured context. No rows are fetched yet.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "    .Where(item => item.Name.StartsWith(\"Star\"))",
        "explain": "Keep only names starting with Star. This predicate describes a filter for SQL translation; it does not alter stored rows.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      },
      {
        "code": "    .OrderBy(item => item.Name);",
        "explain": "Order the filtered query by Name and finish the expression. ToListAsync in the existing code executes it.",
        "source": "EF Core querying",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/"
      }
    ],
    "core": false
  }
};
