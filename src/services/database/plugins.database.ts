import { v4 as uuidv4 } from 'uuid';

function idPrefixPlugin(options: { prefix: string }): string {
  return options.prefix + uuidv4();
}

export default idPrefixPlugin;
