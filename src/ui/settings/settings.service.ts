import Store from 'electron-store';
import type { FromSchema } from 'json-schema-to-ts';

const settingsSchema = {
  type: 'object',
  properties: { 
    servers: {
      type: 'array', 
      items: { 
        type: 'object', 
        properties: { label: { type: 'string'}} 
      } 
    } 
  },
  additionalProperties: false,
} as const;

export type Settings = FromSchema<typeof settingsSchema>;

const SettingsService = new Store<Settings>({ schema: settingsSchema.properties });

export default SettingsService;