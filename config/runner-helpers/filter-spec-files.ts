import meow from 'meow';

export const cli = meow(`
    Usage
      $ filter-spec-files <input>
    
    Options
      --grep, -g  Filter pattern
    
    Examples
      $ filter-spec-files --grep login
  `, {
    importMeta: import.meta,  // Add this line
    flags: {
      grep: {
        type: 'string',
        shortFlag: 'g'
      }
    }
  } as any);

  export function filterSpecs(specs: string[]) {
    return cli.flags.grep 
      ? specs.filter(spec => spec.includes(cli.flags.grep as string))
      : specs;
  }
  