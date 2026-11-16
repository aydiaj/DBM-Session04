/* Pure teaching model: not an EF Core provider, SQL engine or database connection. */
(function (scope) {
  'use strict';
  const snapshot = Object.freeze([
    Object.freeze({ Id: 1, Name: 'Top Gun' }),
    Object.freeze({ Id: 2, Name: 'Star Wars' }),
    Object.freeze({ Id: 3, Name: 'Star Trek' }),
    Object.freeze({ Id: 4, Name: 'The Godfather' }),
    Object.freeze({ Id: 5, Name: 'The Lord of the Rings: The Fellowship of the Ring' })
  ]);
  const modes = Object.freeze(['all', 'star', 'empty']);
  function validate(mode) { if (!modes.includes(mode)) throw new RangeError('Unknown trace mode'); }
  function rows(mode) {
    validate(mode);
    const prefix = mode === 'star' ? 'Star' : mode === 'empty' ? 'Z' : '';
    // These ASCII title comparisons illustrate this fixture's order, not SQL collation in general.
    return snapshot.filter(row => row.Name.startsWith(prefix))
      .map(row => ({ ...row }))
      .sort((a, b) => a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0);
  }
  function query(mode) {
    validate(mode);
    const filter = mode === 'all' ? '' : `\n    .Where(item => item.Name.StartsWith("${mode === 'star' ? 'Star' : 'Z'}"))`;
    return `var query = db.Items${filter}\n    .OrderBy(item => item.Name);`;
  }
  function sql(mode) {
    validate(mode);
    const filter = mode === 'all' ? '' : `\nWHERE [i].[Name] LIKE N'${mode === 'star' ? 'Star' : 'Z'}%'`;
    return `SELECT [i].[Id], [i].[Name]\nFROM [Items] AS [i]${filter}\nORDER BY [i].[Name]`;
  }
  function trace(mode, stage) {
    validate(mode);
    if (!Number.isInteger(stage) || stage < 0 || stage > 4) throw new RangeError('Stage must be 0-4');
    return {
      stage, mode, query: query(mode), sql: stage >= 1 ? sql(mode) : null,
      requestSent: stage >= 2,
      rows: stage >= 3 ? rows(mode) : [],
      objects: stage >= 4 ? rows(mode).map(row => ({ type: 'Item', values: { ...row } })) : []
    };
  }
  const api = Object.freeze({ snapshot, rows, query, sql, trace });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else scope.S4InventorySimulation = api;
})(typeof window !== 'undefined' ? window : globalThis);
