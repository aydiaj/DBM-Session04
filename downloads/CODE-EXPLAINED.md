# Session 04 code explained

The guide explains the completed reference code. Complete the numbered TODOs in your starter before comparing it with the complete files. The website provides the same explanations one selected line at a time.

The Inventory activity in the Practical book is Code First. Our supplied SQL prepares its two-column table before this reading exercise; mapping is written by hand. Both Code First and Database First use EF Core.

## Item.cs

Practical EF Core 10, Activity 03-02, Task 1: Item and DataAnnotations (printed pp. 101-103).

### Line 1

```
using System.ComponentModel.DataAnnotations;
```

Import the .NET namespace containing RequiredAttribute and StringLengthAttribute. This makes their short attribute names available in this file; it does not connect to a database.

Reference: [DataAnnotations namespace](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-10.0)

### Line 3

```
namespace EF10_InventoryModels;
```

Place this file’s types in the EF10_InventoryModels namespace. The semicolon makes this a file-scoped namespace; it is an organisation name, not a database connection.

Reference: [Create and reference a class library](https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library)

### Line 5

```
public class Item
```

Define the public Item class. Public lets the other projects use the type. A class definition is not an individual Item object.

Reference: [C# properties](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)

### Line 6

```
{
```

Open the class body. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 7

```
    public int Id { get; set; }
```

Define an integer property that other code can read and assign. EF Core recognises Id as the key by convention; it matches the existing SQL int identity primary-key column.

Reference: [EF Core key conventions](https://learn.microsoft.com/en-us/ef/core/modeling/keys)

### Line 9

```
    [Required]
```

Attach RequiredAttribute to the following Name property. EF Core treats it as required/non-nullable model metadata. It does not execute input validation whenever the property is assigned.

Reference: [RequiredAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.requiredattribute?view=net-10.0)

### Line 10

```
    [StringLength(100)]
```

Attach StringLengthAttribute to Name with a maximum of 100. EF Core uses this maximum in the model; the existing SQL column is nvarchar(100). It does not shorten a C# string automatically.

Reference: [StringLengthAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.stringlengthattribute?view=net-10.0)

### Line 11

```
    public string Name { get; set; } = "";
```

Define a text auto-property with read/write access. The empty-string initializer gives a new object a non-null starting value in our nullable-enabled project. It is a classroom addition, not a database default. EF fills Name from a returned row.

Reference: [Nullable reference types in EF Core](https://learn.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types)

### Line 12

```
}
```

Close the class body. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)


## InventoryDBContext.cs

Practical EF Core 10, Activity 03-02, InventoryDBContext.cs and Task 2; explicit options pattern from Activity 01-01.

### Line 1

```
using EF10_InventoryModels;
```

Use types from our EF10_InventoryModels namespace without repeating the full name. A project reference makes its assembly available; this using directive does not replace that reference.

Reference: [Create and reference a class library](https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library)

### Line 2

```
using Microsoft.EntityFrameworkCore;
```

Import EF Core types and extension methods, including DbContext, DbSet, UseSqlServer and ToListAsync where used. The package reference supplies the implementation.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 4

```
namespace EF10_InventoryDBLibrary;
```

Place this file’s types in the EF10_InventoryDBLibrary namespace. The semicolon makes this a file-scoped namespace; it is an organisation name, not a database connection.

Reference: [Create and reference a class library](https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library)

### Line 6

```
public class InventoryDbContext : DbContext
```

Define the public InventoryDbContext class, inheriting EF Core’s DbContext base class. The colon denotes inheritance.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 7

```
{
```

Open the class body. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 8

```
    // Supplied: pass configuration to EF Core's base class.
```

A comment for the learner. The compiler ignores it; it does not execute or change data.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 9

```
    public InventoryDbContext(DbContextOptions<InventoryDbContext> options)
```

Declare the constructor called when this context is created. DbContextOptions<InventoryDbContext> is configuration specifically for this context type; options is the parameter name.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 10

```
        : base(options)
```

Pass the received options to the DbContext base constructor before our constructor body runs. This lets EF Core use the provider and connection settings.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 11

```
    {
```

Open the constructor body. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 12

```
    }
```

Close the constructor body. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 14

```
    public DbSet<Item> Items { get; set; }
```

Expose an EF Core set for Item entities. <Item> is the generic type argument and Items is our property name. EF initialises this set; accessing the property does not load all rows. The Items set name supplies the table-name convention.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 15

```
}
```

Close the class body. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)


## Program.cs completed

Practical EF Core 10, Activity 01-01 Program.cs configuration and Activity 03-02 Application.GetAllItemsAsync. Startup guards, top-level layout and messages are documented classroom adaptations.

### Line 1

```
using EF10_InventoryDBLibrary;
```

Use types from our EF10_InventoryDBLibrary namespace without repeating the full name. A project reference makes its assembly available; this using directive does not replace that reference.

Reference: [Create and reference a class library](https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library)

### Line 2

```
using EF10_InventoryModels;
```

Use types from our EF10_InventoryModels namespace without repeating the full name. A project reference makes its assembly available; this using directive does not replace that reference.

Reference: [Create and reference a class library](https://learn.microsoft.com/en-us/dotnet/core/tutorials/create-class-library)

### Line 3

```
using Microsoft.EntityFrameworkCore;
```

Import EF Core types and extension methods, including DbContext, DbSet, UseSqlServer and ToListAsync where used. The package reference supplies the implementation.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 4

```
using Microsoft.Extensions.Configuration;
```

Make configuration types and extension methods available, including ConfigurationBuilder and GetConnectionString.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 5

```
using Microsoft.Data.SqlClient;
```

Make SqlException from the underlying SQL Server driver available for the catch block. This is not the EF Core SQL Server provider package.

Reference: [SQL Server EF Core provider](https://learn.microsoft.com/en-us/ef/core/providers/sql-server/)

### Line 7

```
// Adapted from the supplied Practical EF Core 10 activities 01-01 and 03-02.
```

A comment for the learner. The compiler ignores it; it does not execute or change data.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 8

```
// The book's host/DI wiring is replaced by a small, supplied configuration block.
```

A comment for the learner. The compiler ignores it; it does not execute or change data.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 9

```
Console.WriteLine("DB3 Session 04 - Your first EF Core Inventory query");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 11

```
try
```

Start the work whose matching exceptions are handled below. A try block is error-handling structure, not a database transaction.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 12

```
{
```

Open the try block. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 13

```
    // Supplied: read appsettings.json from the application's output folder.
```

A comment for the learner. The compiler ignores it; it does not execute or change data.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 14

```
    // Environment override keeps optional SQL credentials out of the source files.
```

A comment for the learner. The compiler ignores it; it does not execute or change data.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 15

```
    var configuration = new ConfigurationBuilder()
```

Create a builder for application settings. var means the compiler infers its type; no database operation occurs here.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 16

```
        .SetBasePath(AppContext.BaseDirectory)
```

Find the JSON file relative to the running application’s base directory. The project copies appsettings.json there during the build.

Reference: [AppContext.BaseDirectory](https://learn.microsoft.com/en-us/dotnet/api/system.appcontext.basedirectory?view=net-10.0)

### Line 17

```
        .AddJsonFile("appsettings.json", optional: false)
```

Add appsettings.json as a configuration source. optional: false means a missing file is an error, rather than silently using no settings.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 18

```
        .Build();
```

Build the configuration object from its configured sources. This finishes the chained builder expression and makes the JSON settings available.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 19

```
    string? connectionString = Environment.GetEnvironmentVariable("DBM_EF_CONNECTION")
```

Read an optional environment override called DBM_EF_CONNECTION. string? permits a null result when it is not set. This supplied adaptation allows credentials to stay outside the source file.

Reference: [Environment.GetEnvironmentVariable](https://learn.microsoft.com/en-us/dotnet/api/system.environment.getenvironmentvariable?view=net-10.0)

### Line 20

```
        ?? configuration.GetConnectionString("InventoryDbConnection");
```

If the environment lookup returned null, use the named connection string from the JSON ConnectionStrings section. ?? falls back for null, not for an empty string.

Reference: [Null-coalescing operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator)

### Line 21

```
    if (string.IsNullOrWhiteSpace(connectionString) || connectionString.Contains("YOUR_SERVER"))
```

Check for missing/blank settings or the unchanged YOUR_SERVER placeholder. || means either condition is sufficient to enter the guard. It avoids attempting a known-unprepared connection.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 22

```
    {
```

Open the configuration guard. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 23

```
        Console.WriteLine("Set the server in TODO 00 (appsettings.json), then complete TODOs 01-05. No database request was made.");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 24

```
        return;
```

Stop this top-level program before reaching the EF setup or query. No database request has been made on this guarded path.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 25

```
    }
```

Close the configuration guard. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 27

```
    var optionsBuilder = new DbContextOptionsBuilder<InventoryDbContext>();
```

Create an options builder for InventoryDbContext. <InventoryDbContext> identifies the context being configured; new constructs the builder object.

Reference: [DbContext configuration and lifetime](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/)

### Line 28

```
    optionsBuilder.UseSqlServer(connectionString);
```

Choose the EF Core SQL Server provider and give it the connection string. This configures access; it does not run a SELECT or fetch data.

Reference: [SQL Server EF Core provider](https://learn.microsoft.com/en-us/ef/core/providers/sql-server/)

### Line 29

```
    using var db = new InventoryDbContext(optionsBuilder.Options);
```

Construct the context using the built options. The using declaration disposes it when execution leaves this enclosing try scope, including by exception. It does not mean “import a namespace”.

Reference: [C# using and await using](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/using)

### Line 30

```
    Console.WriteLine("EF Core configured. No query has run yet.");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 32

```
    var query = db.Items.OrderBy(item => item.Name);
```

Describe a query of Item entities, ordered by each item’s Name. item is a lambda parameter; => connects it to the sort expression. The query has not fetched rows yet.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 34

```
    Console.WriteLine("SQL preview (debugging; no rows fetched):");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 35

```
    Console.WriteLine(query.ToQueryString());
```

Print a debugging representation of the generated SQL. ToQueryString does not fetch rows, and its output is not guaranteed to be directly executable SQL.

Reference: [ToQueryString](https://learn.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.entityframeworkqueryableextensions.toquerystring?view=efcore-10.0)

### Line 37

```
    List<Item> items = await query.ToListAsync();
```

Execute the query asynchronously and await its completion. The resulting List<Item> holds entity objects read from the database. This is the line that requests and collects the rows.

Reference: [EF Core asynchronous queries](https://learn.microsoft.com/en-us/ef/core/miscellaneous/async)

### Line 38

```
    Console.WriteLine("ID | Item");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 39

```
    foreach (Item item in items)
```

Visit each Item already in the loaded list. item is the current object. This loop itself does not execute another database query.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 40

```
    {
```

Open the foreach loop body. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 41

```
        Console.WriteLine($"{item.Id} | {item.Name}");
```

Print Id and Name from the current Item object. The $ string inserts the two property values into the output.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 42

```
    }
```

Close the foreach loop body. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 43

```
    Console.WriteLine($"Items shown: {items.Count}");
```

Print the number of objects in the loaded List<Item>. This is not a second database query.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 44

```
    if (items.Count == 0)
```

Check whether the loaded list is empty. Count here is a List property, so this check does not send a SQL COUNT query.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 45

```
        Console.WriteLine("No items matched. Compare the same query in SSMS.");
```

Display the no-match message only when the preceding if condition is true. Without braces, that if controls this single statement.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 46

```
}
```

Close the try block. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 47

```
catch (SqlException ex)
```

Handle a matching SQL Server driver exception and name the exception object ex. Its details help identify connection, permission, table or SQL failures.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 48

```
{
```

Open the catch block. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 49

```
    Console.WriteLine($"SQL Server error {ex.Number}: {ex.Message}");
```

Display the SQL exception’s number and message. $ enables string interpolation, and the expressions in braces supply their values.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 50

```
    Console.WriteLine("Check the same instance in SSMS, authentication, database setup and preflight. Do not reset the database.");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 51

```
}
```

Close the catch block. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 52

```
catch (InvalidOperationException ex)
```

Handle an invalid operation, including EF model/configuration errors. Fix the reported cause; this catch is not a substitute for correct mapping.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 53

```
{
```

Open the catch block. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 54

```
    Console.WriteLine($"EF Core configuration/model error: {ex.Message}");
```

Display the caught exception’s message for troubleshooting. This reports the error; the using scope handles resource disposal.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 55

```
    Console.WriteLine("Check TODOs 01-03: key, DbSet, provider and options.");
```

Print the quoted progress or instruction message to the Console. The message itself does not execute SQL; configuration messages are not proof of a successful connection.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 56

```
}
```

Close the catch block. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 57

```
catch (ArgumentException ex)
```

Handle an invalid argument such as malformed options or connection-string arguments.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 58

```
{
```

Open the catch block. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 59

```
    Console.WriteLine($"Connection/options error: {ex.Message}");
```

Display the caught exception’s message for troubleshooting. This reports the error; the using scope handles resource disposal.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 60

```
}
```

Close the catch block. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 61

```
catch (System.IO.IOException ex)
```

Handle file-system/configuration file errors. System.IO qualifies the namespace explicitly, so a separate using System.IO directive is not required.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 62

```
{
```

Open the catch block. Lines inside these braces belong to that scope.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 63

```
    Console.WriteLine($"Configuration file error: {ex.Message}");
```

Display the caught exception’s message for troubleshooting. This reports the error; the using scope handles resource disposal.

Reference: [C# exception handling](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/exception-handling-statements)

### Line 64

```
}
```

Close the catch block. A using declaration in a finished scope disposes its resource.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)


## Console project csproj

Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.

### Line 1

```
<Project Sdk="Microsoft.NET.Sdk">
```

Open this .NET SDK project. Its child elements specify its output role, references and files; it also inherits Directory.Build.props.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 2

```
  <PropertyGroup><OutputType>Exe</OutputType></PropertyGroup>
```

Make this project a runnable application. The two other projects use the library default. This selects the startup role; modern .NET can still produce a DLL plus an application host.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 3

```
  <ItemGroup>
```

Begin the project’s collection of dependency/file items.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 4

```
    <ProjectReference Include="../EF10_InventoryDBLibrary/EF10_InventoryDBLibrary.csproj" />
```

Reference our database library using a relative path to its csproj file. This establishes a build dependency; a using directive alone cannot do that.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 5

```
    <PackageReference Include="Microsoft.Extensions.Configuration.Json" Version="10.0.14" />
```

Restore the JSON configuration package that supplies AddJsonFile. The version is pinned for consistent classroom setup.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 6

```
    <None Update="appsettings.json" CopyToOutputDirectory="PreserveNewest" />
```

Keep appsettings.json as a content file and copy it to the output when newer. The running program reads it from AppContext.BaseDirectory.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 7

```
  </ItemGroup>
```

Close this XML ItemGroup element. XML end tags complete the build-file structure.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 8

```
</Project>
```

Close this XML Project element. XML end tags complete the build-file structure.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)


## Database library csproj

Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.

### Line 1

```
<Project Sdk="Microsoft.NET.Sdk">
```

Open this .NET SDK project. Its child elements specify its output role, references and files; it also inherits Directory.Build.props.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 2

```
  <ItemGroup>
```

Begin the project’s collection of dependency/file items.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 3

```
    <ProjectReference Include="../EF10_InventoryModels/EF10_InventoryModels.csproj" />
```

Reference our model library using a relative path to its csproj file. This establishes a build dependency; a using directive alone cannot do that.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 4

```
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.14" />
```

Restore the pinned EF Core SQL Server provider from NuGet. Its dependencies include EF Core and the underlying Microsoft.Data.SqlClient driver.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 5

```
    <PackageReference Include="System.Security.Cryptography.Pkcs" Version="10.0.13" />
```

Explicitly select patched System.Security.Cryptography.Pkcs 10.0.13 instead of the vulnerable transitive 9.0.11 dependency. This is a classroom dependency-maintenance addition. It flows to the Console through its project reference; no PKCS API calls are added to the lesson.

Reference: [NuGet vulnerability auditing and dependency remediation](https://learn.microsoft.com/en-us/nuget/concepts/auditing-packages)

### Line 6

```
  </ItemGroup>
```

Close this XML ItemGroup element. XML end tags complete the build-file structure.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 7

```
</Project>
```

Close this XML Project element. XML end tags complete the build-file structure.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)


## Model library csproj

Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.

### Line 1

```
<Project Sdk="Microsoft.NET.Sdk" />
```

Define a complete minimal class-library project using the .NET SDK. It inherits Directory.Build.props.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)


## Directory.Build.props

Practical EF Core 10, Activity 03-02 three-project structure. SDK-style files, inherited build settings and pinned package references are classroom preparation supported by Microsoft documentation.

### Line 1

```
<Project>
```

Open the MSBuild properties file inherited by the projects below this directory.

Reference: [Common MSBuild project properties](https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-properties)

### Line 2

```
  <PropertyGroup>
```

Begin a group of build property values. It does not define a C# class or SQL table.

Reference: [Common MSBuild project properties](https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-properties)

### Line 3

```
    <TargetFramework>net10.0</TargetFramework>
```

Target .NET 10 for all these projects. The local SDK must support this target.

Reference: [Common MSBuild project properties](https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-properties)

### Line 4

```
    <ImplicitUsings>enable</ImplicitUsings>
```

Let the SDK add common namespace imports such as System and System.Collections.Generic, so Console and List need no additional using line here.

Reference: [Top-level C# statements](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)

### Line 5

```
    <Nullable>enable</Nullable>
```

Enable nullable-reference analysis. This produces compile-time guidance; it is not runtime validation of every string assignment.

Reference: [Nullable reference types in EF Core](https://learn.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types)

### Line 6

```
  </PropertyGroup>
```

Close this XML PropertyGroup element. XML end tags complete the build-file structure.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)

### Line 7

```
</Project>
```

Close this XML Project element. XML end tags complete the build-file structure.

Reference: [Project and package references](https://learn.microsoft.com/en-us/dotnet/core/tools/dependencies)


## appsettings.json

Practical EF Core 10, Activity 01-01 Program.cs configuration and Activity 03-02 Application.GetAllItemsAsync. Startup guards, top-level layout and messages are documented classroom adaptations.

### Line 1

```
{
```

Open a JSON object: a collection of named settings.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 2

```
  "ConnectionStrings": {
```

Use the conventional ConnectionStrings section read by GetConnectionString.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 3

```
    "InventoryDbConnection": "Server=YOUR_SERVER;Database=InventoryManagerDB_0302;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;Connect Timeout=10;"
```

Name the connection string exactly as Program.cs expects. Replace YOUR_SERVER; keep the Inventory database name. Integrated Security uses Windows authentication; Encrypt enables encryption; local TrustServerCertificate accepts the classroom certificate; Connect Timeout limits connection attempts. A backslash must be written twice in JSON text.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 4

```
  }
```

Close this JSON object. The nested braces group the connection string settings.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)

### Line 5

```
}
```

Close this JSON object. The nested braces group the connection string settings.

Reference: [JSON configuration provider](https://learn.microsoft.com/en-us/dotnet/core/extensions/configuration-providers)


## setup-inventory.sql

Classroom SQL preparation, adapted from the Activity 03-02 Items migration and the five titles in Application.EnsureItemsExistAsync. This is not the book’s migration workflow.

### Line 1

```
-- Session 04 adaptation of the book's Activity 03-02 inventory schema and titles.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 2

```
-- Supplied setup, not a migrations exercise. Creates a separate book-scenario database.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 3

```
-- Preserves existing rows. No DROP, DELETE, TRUNCATE, identity reseed or replacement.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 4

```
USE master;
```

Select the database for the following batch: master. This changes context; it does not delete or reset that database.

Reference: [SQL Server USE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-ver17)

### Line 5

```
GO
```

SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.

Reference: [SSMS GO batch separator](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17)

### Line 6

```
IF DB_ID(N'InventoryManagerDB_0302') IS NULL
```

Test whether the named Inventory database is absent before trying to create it. An existing database is kept.

Reference: [SQL Server DB_ID](https://learn.microsoft.com/en-us/sql/t-sql/functions/db-id-transact-sql?view=sql-server-ver17)

### Line 7

```
    EXEC(N'CREATE DATABASE InventoryManagerDB_0302;');
```

Execute database creation only when the preceding absence check passed. It is a separate dynamic batch; an existing database is not recreated.

Reference: [SQL Server CREATE DATABASE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-database-transact-sql?view=sql-server-ver17)

### Line 8

```
GO
```

SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.

Reference: [SSMS GO batch separator](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17)

### Line 9

```
USE InventoryManagerDB_0302;
```

Select the database for the following batch: InventoryManagerDB_0302. This changes context; it does not delete or reset that database.

Reference: [SQL Server USE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-ver17)

### Line 10

```
GO
```

SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.

Reference: [SSMS GO batch separator](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17)

### Line 11

```
SET XACT_ABORT ON;
```

Ask SQL Server to abort the transaction for qualifying runtime errors, supporting the protected setup block.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 12

```
BEGIN TRY
```

Start the SQL setup work whose errors can be handled in the CATCH block.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 13

```
    BEGIN TRANSACTION;
```

Group table preparation and inserts as one transaction inside the selected database.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 14

```
    IF OBJECT_ID(N'dbo.Items') IS NOT NULL AND OBJECT_ID(N'dbo.Items',N'U') IS NULL
```

Check whether an object called dbo.Items already exists but is not a user table. Such a naming conflict stops setup.

Reference: [SQL Server OBJECT_ID](https://learn.microsoft.com/en-us/sql/t-sql/functions/object-id-transact-sql?view=sql-server-ver17)

### Line 15

```
        THROW 50400,'dbo.Items exists but is not a user table. Setup stopped.',1;
```

Raise a specific setup error and stop rather than silently using an incompatible schema. Inside the TRY, the transaction is handled by CATCH.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 16

```
    IF OBJECT_ID(N'dbo.Items',N'U') IS NULL
```

Check whether the user table dbo.Items is missing before creating it.

Reference: [SQL Server OBJECT_ID](https://learn.microsoft.com/en-us/sql/t-sql/functions/object-id-transact-sql?view=sql-server-ver17)

### Line 17

```
        EXEC(N'CREATE TABLE dbo.Items (
```

Begin a dynamically executed CREATE TABLE for the missing Items table. This supplied SQL corresponds to the book’s two-property entity.

Reference: [SQL Server CREATE TABLE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17)

### Line 18

```
            Id INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Items PRIMARY KEY,
```

Create the integer Id column as a non-null primary key with generated identity values starting at 1 and increasing by 1.

Reference: [SQL Server CREATE TABLE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17)

### Line 19

```
            Name NVARCHAR(100) NOT NULL
```

Create the non-null Unicode text column with length 100. This matches the model’s required Name and maximum length.

Reference: [SQL Server CREATE TABLE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17)

### Line 20

```
        );');
```

Close the CREATE TABLE definition and its quoted EXEC batch.

Reference: [SQL Server CREATE TABLE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17)

### Line 21

```
    IF (SELECT COUNT(*) FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items'))<>2
```

Require exactly the expected two columns in a pre-existing Items table before using or seeding it.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 22

```
       OR NOT EXISTS(SELECT 1 FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items') AND name=N'Id'
```

Continue the mismatch check: each required column must exist with the metadata tested on the next line.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 23

```
           AND TYPE_NAME(user_type_id)=N'int' AND is_identity=1 AND is_nullable=0 AND is_computed=0)
```

Require Id to be a non-null, non-computed SQL int identity column.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 24

```
       OR NOT EXISTS(SELECT 1 FROM sys.columns WHERE object_id=OBJECT_ID(N'dbo.Items') AND name=N'Name'
```

Continue the mismatch check: each required column must exist with the metadata tested on the next line.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 25

```
           AND TYPE_NAME(user_type_id)=N'nvarchar' AND max_length=200 AND is_nullable=0 AND is_computed=0)
```

Require Name to be non-null nvarchar(100), not computed. sys.columns reports this length as 200 bytes, corresponding to 100 UTF-16 code units.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 26

```
        THROW 50401,'Existing Items schema differs from the two-column book model. No data changed; inspect the mismatch.',1;
```

Raise a specific setup error and stop rather than silently using an incompatible schema. Inside the TRY, the transaction is handled by CATCH.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 27

```
    IF NOT EXISTS(SELECT 1 FROM sys.indexes i JOIN sys.index_columns k
```

Check that the existing table has the expected primary-key index; inspect its indexed columns.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 28

```
       ON i.object_id=k.object_id AND i.index_id=k.index_id
```

Match index-column records to their index by object ID and index ID.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 29

```
       JOIN sys.columns c ON c.object_id=k.object_id AND c.column_id=k.column_id
```

Join column metadata so the indexed key column can be checked by name.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 30

```
       WHERE i.object_id=OBJECT_ID(N'dbo.Items') AND i.is_primary_key=1 AND c.name=N'Id' AND k.key_ordinal=1
```

Restrict the metadata check to Items, a primary-key index, and Id as the first key column.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 31

```
       AND (SELECT COUNT(*) FROM sys.index_columns x WHERE x.object_id=i.object_id AND x.index_id=i.index_id AND x.key_ordinal>0)=1)
```

Require a single key column, avoiding acceptance of a different composite primary key.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 32

```
        THROW 50402,'Items requires a single-column primary key on Id. Setup stopped.',1;
```

Raise a specific setup error and stop rather than silently using an incompatible schema. Inside the TRY, the transaction is handled by CATCH.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 33

```
    -- Sequential inserts give the documented IDs only on a fresh, empty identity table.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 34

```
    EXEC sp_executesql N'
```

Start a parameter-capable SQL execution batch. This prepared batch inserts only the missing book titles; doubled quotes inside the outer string encode literal quotes.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 35

```
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Top Gun'') INSERT dbo.Items(Name) VALUES(N''Top Gun'');
```

Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 36

```
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Star Wars'') INSERT dbo.Items(Name) VALUES(N''Star Wars'');
```

Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 37

```
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''Star Trek'') INSERT dbo.Items(Name) VALUES(N''Star Trek'');
```

Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 38

```
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''The Godfather'') INSERT dbo.Items(Name) VALUES(N''The Godfather'');
```

Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 39

```
    IF NOT EXISTS(SELECT 1 FROM dbo.Items WHERE Name=N''The Lord of the Rings: The Fellowship of the Ring'')
```

Check for the named movie before inserting it. Existing rows are kept; only a missing example title is added. If this line continues, the following INSERT belongs to the same condition.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 40

```
        INSERT dbo.Items(Name) VALUES(N''The Lord of the Rings: The Fellowship of the Ring'');';
```

Insert the missing final book title, supplying only Name so SQL Server generates Id. The closing quote/semicolon also ends the outer execution batch.

Reference: [SQL Server sp_executesql](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-executesql-transact-sql?view=sql-server-ver17)

### Line 41

```
    COMMIT;
```

Commit the successful table/data setup so its changes become durable.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 42

```
    PRINT 'Inventory ready. Existing records preserved; missing example titles added.';
```

Print a completion message in SSMS after setup commits.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 43

```
END TRY
```

End the guarded SQL work.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 44

```
BEGIN CATCH
```

Begin SQL error handling for failures raised inside TRY.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 45

```
    IF XACT_STATE()<>0 ROLLBACK;
```

If a transaction is still present after the error, roll it back instead of leaving partial setup work.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 46

```
    THROW;
```

Rethrow the original SQL error so it remains visible to the person running setup.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 47

```
END CATCH;
```

Finish the SQL error handler.

Reference: [SQL Server TRY and CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17)

### Line 48

```
GO
```

SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.

Reference: [SSMS GO batch separator](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17)

### Line 49

```
SELECT Id,Name FROM dbo.Items ORDER BY Name;
```

Read the Id and Name values in alphabetical Name order for comparison with the EF query.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)


## verify-inventory.sql

Classroom SQL preparation, adapted from the Activity 03-02 Items migration and the five titles in Application.EnsureItemsExistAsync. This is not the book’s migration workflow.

### Line 1

```
-- Read-only comparison after the supplied setup. No schema or data changes.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 2

```
USE InventoryManagerDB_0302;
```

Select the database for the following batch: InventoryManagerDB_0302. This changes context; it does not delete or reset that database.

Reference: [SQL Server USE](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/use-transact-sql?view=sql-server-ver17)

### Line 3

```
GO
```

SSMS ends the current batch here. GO is a client batch separator rather than a C# statement or a SQL Server stored procedure.

Reference: [SSMS GO batch separator](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/sql-server-utilities-statements-go?view=sql-server-ver17)

### Line 4

```
SELECT @@SERVERNAME AS ConnectedServer, DB_NAME() AS ConnectedDatabase;
```

Display the actual server and current database so configuration can be compared with the Console app.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 5

```
SELECT c.name, TYPE_NAME(c.user_type_id) AS SqlType, c.max_length,c.is_nullable,c.is_identity
```

Select each column’s name, SQL type, byte length, nullability and identity flag for inspection.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 6

```
FROM sys.columns c WHERE c.object_id=OBJECT_ID(N'dbo.Items') ORDER BY c.column_id;
```

Read metadata only for dbo.Items and order it by column position. This does not change the schema.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 7

```
-- Main report: should match the first C# query.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 8

```
SELECT Id,Name FROM dbo.Items ORDER BY Name;
```

Read the Id and Name values in alphabetical Name order for comparison with the EF query.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 9

```
-- Independent practice: the two Star titles on the fresh setup.
```

A SQL comment describing the supplied classroom support. SSMS does not execute comment text.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)

### Line 10

```
SELECT Id,Name FROM dbo.Items WHERE Name LIKE N'Star%' ORDER BY Name;
```

Read only titles beginning with Star, ordered by Name. This is the SQL comparison for the independent LINQ filter.

Reference: [SQL Server column metadata](https://learn.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-columns-transact-sql?view=sql-server-ver17)


## ADO.NET comparison

Classroom ADO.NET comparison using the Inventory model and documented SqlClient APIs. It is not claimed as verbatim EF book code.

### Line 1

```
using var command = new SqlCommand(
```

Create a SQL command; its SQL text and open connection are passed on the following line.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 2

```
    "SELECT Id, Name FROM dbo.Items ORDER BY Name;", connection);
```

Ask SQL Server for Id and Name in alphabetical order. The existing connection object is used.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 3

```
using var reader = await command.ExecuteReaderAsync();
```

Execute the command to get a reader; using disposes it at scope exit.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 4

```
List<Item> items = new();
```

Create an empty C# list to hold the objects we map manually.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 5

```
while (await reader.ReadAsync())
```

Advance to the next row. The body runs only when a row is available.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 6

```
{
```

Open the row-processing loop body.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 7

```
    Item item = new Item();
```

Create one Item object to hold this row’s values.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 8

```
    item.Id = reader.GetInt32(0);
```

Read the first selected SQL int column into the object’s Id property.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 9

```
    item.Name = reader.GetString(1);
```

Read the second selected SQL text column into the object’s Name property.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 10

```
    items.Add(item);
```

Add this populated object to the in-memory list.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)

### Line 11

```
}
```

End this iteration’s row-mapping block.

Reference: [SqlDataReader](https://learn.microsoft.com/en-us/dotnet/api/microsoft.data.sqlclient.sqldatareader?view=sqlclient-dotnet-core-6.1)


## Independent filter

Classroom filter extension of the book’s ordered Inventory query, supported by EF Core querying documentation.

### Line 1

```
var query = db.Items
```

Begin a query for Item entities through the configured context. No rows are fetched yet.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 2

```
    .Where(item => item.Name.StartsWith("Star"))
```

Keep only names starting with Star. This predicate describes a filter for SQL translation; it does not alter stored rows.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

### Line 3

```
    .OrderBy(item => item.Name);
```

Order the filtered query by Name and finish the expression. ToListAsync in the existing code executes it.

Reference: [EF Core querying](https://learn.microsoft.com/en-us/ef/core/querying/)

